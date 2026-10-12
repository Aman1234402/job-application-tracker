"use client";

import { useEffect, useState } from "react";
import { updateJobApplication } from "@/lib/actions/job-applications";
import { Board, Column } from "../models/models.types";

export function useBoard(initialBoard?: Board | null) {
    const [board, setBoard] = useState<Board | null>(initialBoard || null);
    const [columns, setColumns] = useState<Column[]>(initialBoard?.columns || []);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (initialBoard) {
            setBoard(initialBoard);
            setColumns(initialBoard.columns || []);
        }
    }, [initialBoard]);

    async function moveJob(
        jobApplicationId: string,
        newColumnId: string,
        newOrder: number
    ) {
        const currentColumn = columns.find((column) =>
            column.jobApplications?.some((job) => job._id === jobApplicationId)
        );

        if (!currentColumn) {
            return;
        }

        const movedJob = currentColumn.jobApplications?.find((job) => job._id === jobApplicationId);

        if (!movedJob) {
            return;
        }

        const nextColumns = columns.map((column) => {
            const jobApplications = [...(column.jobApplications || [])];

            if (column._id === currentColumn._id) {
                const filtered = jobApplications.filter((job) => job._id !== jobApplicationId);
                return { ...column, jobApplications: filtered };
            }

            if (column._id === newColumnId) {
                const targetJobs = [...jobApplications];
                const existingIndex = targetJobs.findIndex((job) => job._id === jobApplicationId);
                const updatedJob = { ...movedJob, columnId: newColumnId, order: newOrder };

                if (existingIndex >= 0) {
                    targetJobs[existingIndex] = updatedJob;
                } else {
                    targetJobs.push(updatedJob);
                }

                return { ...column, jobApplications: targetJobs };
            }

            return column;
        });

        const normalizedColumns = nextColumns.map((column) => ({
            ...column,
            jobApplications: [...(column.jobApplications || [])].sort((a, b) => a.order - b.order).map((job, index) => ({
                ...job,
                order: index * 100,
            })),
        }));

        setColumns(normalizedColumns);
        setBoard((previousBoard) =>
            previousBoard
                ? { ...previousBoard, columns: normalizedColumns }
                : previousBoard
        );

        try {
            const result = await updateJobApplication(jobApplicationId, {
                columnId: newColumnId,
                order: newOrder,
            });

            if (result?.error) {
                setError(result.error);
            } else {
                setError(null);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to move job");
        }
    }

    return { board, columns, error, moveJob };
}
