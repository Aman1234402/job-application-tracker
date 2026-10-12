# Job Application Tracker

A full-stack application for tracking job applications through a Kanban-style workflow. Users can add jobs, move them across stages, update details, and stay organized throughout the job search process.

## Features

- User authentication with Better Auth
- Personalized dashboard for each user
- Kanban board with drag-and-drop interactions
- Add, edit, and delete job applications
- Track company, position, location, salary, notes, URL, and tags
- MongoDB persistence with Mongoose
- Responsive UI built with Next.js and Tailwind CSS

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- @dnd-kit for drag-and-drop interactions
- MongoDB + Mongoose
- Better Auth

## Project Structure

```bash
my-app/
├── app/
│   ├── api/
│   ├── dashboard/
│   ├── sign-in/
│   └── sign-up/
├── components/
│   ├── ui/
│   ├── kanban-board.tsx
│   ├── job-application-card.tsx
│   ├── create-job-dialog.tsx
│   └── navbar.tsx
├── lib/
│   ├── actions/
│   ├── auth/
│   ├── hooks/
│   ├── models/
│   ├── db.ts
│   └── utils.ts
├── public/
├── scripts/
├── .env
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

## Prerequisites

Before running the project, make sure you have:

- Node.js 18+
- MongoDB installed locally or access to a MongoDB connection string
- A `.env` file with the required environment variables

## Environment Variables

Create a `.env` file in the project root:

```env
MONGODB_URI=mongodb://localhost:27017/job-app-tracker
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

If using MongoDB Atlas or another hosted database, replace the URI with your connection string.

## Installation

```bash
npm install
```

## Run the App

```bash
npm run dev
```

Then open:

```bash
http://localhost:3000
```

## Database Setup

This project uses MongoDB and Mongoose. The application connects to the database and initializes the default board for each user during authentication.

## Usage

1. Sign up or log in.
2. Open the dashboard.
3. Add a new job application.
4. Drag jobs between stages on the Kanban board.
5. Edit or delete job cards as needed.

## Notes

This project is a strong portfolio application because it combines:

- full-stack development
- authentication and user-specific data
- modern dashboard UI
- drag-and-drop interactions
- database-backed persistence

## License

This project is intended for educational and portfolio use.
