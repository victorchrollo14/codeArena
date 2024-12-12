"use client";

import React, { useState, useCallback } from "react";
import { Play, RefreshCw, Copy, Check } from "lucide-react";
import { Button } from "@shadcn/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shadcn/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shadcn/card";

const initialCode = `function twoSum(nums: number[], target: number): number[] {
    const map = new Map<number, number>();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement)!, i];
        }
        map.set(nums[i], i);
    }
    return []; // No solution found
}`;

const testCases = [
  {
    id: 1,
    input: { nums: [2, 7, 11, 15], target: 9 },
    output: [0, 1],
    description: "Basic two-sum case",
  },
  {
    id: 2,
    input: { nums: [3, 2, 4], target: 6 },
    output: [1, 2],
    description: "Non-consecutive indices",
  },
  {
    id: 3,
    input: { nums: [3, 3], target: 6 },
    output: [0, 1],
    description: "Duplicate numbers",
  },
];

export default function CodeChallenge() {
  const [code, setCode] = useState(initialCode);
  const [activeCase, setActiveCase] = useState(testCases[0].id.toString());
  const [isCopied, setIsCopied] = useState(false);
  const [runResult, setRunResult] = useState<string | null>(null);

  const handleCopyCode = useCallback(() => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }, [code]);

  const handleRun = useCallback(() => {
    try {
      // Simulate code execution
      const currentCase = testCases.find(
        (tc) => tc.id.toString() === activeCase,
      );
      if (currentCase) {
        const result = `Result: ${JSON.stringify(currentCase.output)}`;
        setRunResult(result);
      }
    } catch (err) {
      console.error(err);
      setRunResult("Error executing code");
    }
  }, [activeCase]);

  const handleReset = useCallback(() => {
    setCode(initialCode);
    setRunResult(null);
  }, []);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-background to-secondary/20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Try a <span className="text-primary">Code Challenge</span>
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Solve the Two Sum problem and test your skills with our interactive
            code editor.
          </p>
        </div>
        <Card className="mt-8 border-none bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Two Sum</CardTitle>
            <CardDescription>
              Given an array of integers nums and an integer target, return
              indices of the two numbers such that they add up to target.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Code Editor Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Button
                      onClick={handleRun}
                      variant="default"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Play className="h-4 w-4" /> Run
                    </Button>
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <RefreshCw className="h-4 w-4" /> Reset
                    </Button>
                    <Button
                      onClick={handleCopyCode}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      {isCopied ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                      {isCopied ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                </div>
                <div className="relative rounded-md border">
                  <pre className="p-4 overflow-x-auto">
                    <code className="text-sm font-mono text-foreground">
                      {code}
                    </code>
                  </pre>
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-text resize-none"
                    spellCheck="false"
                  />
                </div>
                {runResult && (
                  <div className="p-3 rounded-md border bg-muted text-foreground">
                    {runResult}
                  </div>
                )}
              </div>

              {/* Test Cases Section */}
              <div>
                <Tabs
                  value={activeCase}
                  onValueChange={setActiveCase}
                  className="w-full"
                >
                  <TabsList className="w-full bg-muted">
                    {testCases.map((testCase) => (
                      <TabsTrigger
                        key={testCase.id}
                        value={testCase.id.toString()}
                        className="flex-1"
                      >
                        Case {testCase.id}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {testCases.map((testCase) => (
                    <TabsContent
                      key={testCase.id}
                      value={testCase.id.toString()}
                      className="mt-4 space-y-4"
                    >
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            {testCase.description}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div>
                            <span className="text-sm font-medium">Input:</span>
                            <pre className="mt-1 p-2 rounded-md bg-muted">
                              <code className="text-sm">
                                nums = {JSON.stringify(testCase.input.nums)}
                                {"\n"}target = {testCase.input.target}
                              </code>
                            </pre>
                          </div>
                          <div>
                            <span className="text-sm font-medium">
                              Expected Output:
                            </span>
                            <pre className="mt-1 p-2 rounded-md bg-muted">
                              <code className="text-sm">
                                {JSON.stringify(testCase.output)}
                              </code>
                            </pre>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
