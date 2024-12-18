"use client";
import { Button } from "@shadcn/button";
import { Code2 } from "lucide-react";
import React, { FC } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { FaPlay } from "react-icons/fa6";
import { MdViewList } from "react-icons/md";
import { BiSolidCloudUpload } from "react-icons/bi";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { useSession } from "next-auth/react";
import Link from "next/link";

const ProblemsHeader: FC = () => {
  const session = useSession();

  return (
    <header className="flex flex-row justify-between px-4 py-2 ">
      <div className="problem-list-section flex flex-row items-center gap-4">
        <div className="flex flex-row gap-2 items-center">
          <Link href={"/"}>
            <Code2 className="h-6 w-6 text-primary" />
          </Link>
          {/* <h1 className="text-2xl font-bold"> */}
          {/*   <span className="text-foreground">code</span> */}
          {/*   <span className="text-primary">Arena</span> */}
          {/* </h1> */}
        </div>
        <div className="flex flex-row items-center gap-1 ">
          <div className="rounded-sm flex flex-row px-2 gap-2 bg-secondary cursor-pointer">
            <MdViewList className="h-6 w-6  " />
            <p className="text-foreground">Problem List</p>
          </div>
          <div className="bg-secondary p-1 rounded-sm cursor-pointer">
            <FaChevronLeft className="  " />
          </div>
          <div className="bg-secondary p-1 rounded-sm cursor-pointer">
            <FaChevronRight />
          </div>
        </div>
      </div>
      <div className="code-run-section">
        <div className="flex flex-row gap-1">
          <Button className="flex flex-row items-center ">
            <FaPlay className="h-3 w-3" />
            <span>Run</span>
          </Button>
          <Button variant={"outline"} className="text-primary border-primary">
            <BiSolidCloudUpload className="h-4 w-4" />
            <span>Submit</span>
          </Button>
        </div>
      </div>
      <div className="profile-section">
        {session.status === "authenticated" && (
          <Avatar className="h-7 w-7 ">
            <AvatarImage
              src="/shinobi.jpg"
              alt="@shadcn"
              className="rounded-full"
            />
            <AvatarFallback>
              {session?.data?.user?.email?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        )}
        {session.status === "unauthenticated" && (
          <div className="flex flex-row gap-1 ">
            <Button variant="ghost" asChild>
              <Link href="/auth/login">Sign in</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/register">Sign up</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default ProblemsHeader;