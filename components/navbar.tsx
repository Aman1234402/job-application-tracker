"use client";

import {Briefcase} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import SignOutButton from "./sign-out-btn";
import { useSession } from "@/lib/auth/auth-client";
export default function Navbar(){
    const {data:session, isPending} = useSession();
    const userName = session?.user?.name?.trim() || session?.user?.email?.split("@")[0] || "User";
    const userEmail = session?.user?.email || "No email";
    const userInitial = userName.charAt(0)?.toUpperCase() || "U";
    const isAuthenticated = !!session?.user?.email && !isPending;

    if (isPending) {
      return (
        <nav className="border-b border-gray-200 bg-white">
          <div className="container mx-auto flex h-16 items-center px-4 justify-between">
            <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-primary">
              <Briefcase className="text-[#f76382]"/>
              <span className="text-[#f76382]">Job Tracker</span>
            </Link>
          </div>
        </nav>
      );
    }

    return (
    <nav className="border-b border-gray-200 bg-white">
         <div className="container mx-auto flex h-16 items-center px-4 justify-between">
            <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-primary">
                <Briefcase className="text-[#f76382]"/>
                <span className="text-[#f76382]">Job Tracker</span>
            </Link>
            <div className="flex items-center gap-4">
                {isAuthenticated ? (
                  <>
                      <Link href="/dashboard">
                          <Button
                             variant = "ghost"
                             className = "text-gray-700 hover:text-black"
                          >
                            Dashboard
                          </Button>
                      </Link>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost">
                                  <Avatar>
                                    <AvatarFallback className="bg-primary text-white">
                                      {userInitial}
                                    </AvatarFallback>
                                  </Avatar>
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent>
                          <DropdownMenuLabel>
                            <div>
                              <p>{userName}</p>
                              <p>{userEmail}</p>
                            </div>
                          </DropdownMenuLabel>
                            <SignOutButton/>
                        </DropdownMenuContent>
                      </DropdownMenu>
                  </>
                ) : 
                ( 
                <>
                  <Link href="/sign-in">
                  <Button variant="ghost" className="text-gray-700 hover:text-black">Log in</Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button className="bg-primary hover:bg-primary/90">Start for free</Button>
                  </Link>
                </>
                )}
            </div>
         </div>
    </nav>);
}