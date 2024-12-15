"use client";

import * as React from "react";
import { BsFillFileEarmarkCheckFill } from "react-icons/bs";
import { Check, FileCode2, Lock, Search, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@shadcn/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@shadcn/table";
import { Button } from "@shadcn/button";
import { Input } from "@shadcn/input";
import { Level } from "@prisma/client";
import Link from "next/link";
import { Badge } from "@shadcn/badge";

export interface Question {
  id: number;
  title: string;
  status: "completed" | "in-progress" | "locked" | "not-started";
  level: Level;
  hasSolution: boolean;
  tags?: string[];
}

interface QuestionListProps {
  questions: Question[];
}

export function QuestionList({
  questions: initialQuestions,
}: QuestionListProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [difficultyFilter, setDifficultyFilter] = React.useState<string>("all");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [questions, setQuestions] =
    React.useState<Question[]>(initialQuestions);

  const filteredQuestions = React.useMemo(() => {
    return questions.filter((question) => {
      const matchesSearch = question.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesDifficulty =
        difficultyFilter === "all" ||
        question.level.toLowerCase() === difficultyFilter;
      const matchesStatus =
        statusFilter === "all" || question.status === statusFilter;

      return matchesSearch && matchesDifficulty && matchesStatus;
    });
  }, [questions, searchQuery, difficultyFilter, statusFilter]);

  const getStatusIcon = (status: Question["status"]) => {
    switch (status) {
      case "completed":
        return <Check className="h-4 w-4 text-green-500" />;
      case "in-progress":
        return (
          <div className="h-4 w-4 rounded-full border-2 border-yellow-500" />
        );
      case "locked":
        return <Lock className="h-4 w-4 text-gray-500" />;
      default:
        return (
          <div className="h-4 w-4 rounded-full border-2 border-gray-500" />
        );
    }
  };

  const getDifficultyColor = (difficulty: Level) => {
    switch (difficulty) {
      case "easy":
        return "text-green-500";
      case "medium":
        return "text-yellow-500";
      case "hard":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="w-full max-w-[80vw] space-y-4">
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Lists</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>All Problems</DropdownMenuItem>
            <DropdownMenuItem>Favorites</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Difficulty</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setDifficultyFilter("all")}>
              All
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDifficultyFilter("easy")}>
              Easy
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDifficultyFilter("medium")}>
              Medium
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDifficultyFilter("hard")}>
              Hard
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Status</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setStatusFilter("all")}>
              All
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("completed")}>
              Completed
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("in-progress")}>
              In Progress
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("not-started")}>
              Not Started
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search questions"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>

        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>

        <Button variant={"default"}>Pick One</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="w-[100px]">Tags</TableHead>
              <TableHead className="w-[100px]">Solution</TableHead>
              <TableHead className="w-[100px]">Difficulty</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredQuestions.map((question, index) => (
              <TableRow key={question.id}>
                <TableCell>{getStatusIcon(question.status)}</TableCell>
                <TableCell className="font-medium">
                  <Link href={`/problems/${question.id}`}>
                    {index + 1}. {question.title}
                  </Link>
                </TableCell>
                <TableCell className="flex flex-row gap-2 w-96">
                  {question.tags
                    ?.slice(0, 2)
                    .map((tag) => <Badge key={tag}>{tag}</Badge>)}
                </TableCell>
                <TableCell>
                  {question.hasSolution && (
                    <BsFillFileEarmarkCheckFill className="h-4 w-4 text-primary" />
                  )}
                </TableCell>
                <TableCell>
                  <span className={getDifficultyColor(question.level)}>
                    {question.level}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
