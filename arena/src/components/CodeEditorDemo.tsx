"use client";
import React, { useState, useCallback } from "react";
import { Play, RefreshCw, Copy, Check } from "lucide-react";
import { Button } from "@shadcn/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shadcn/tabs";

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

function CodeChallenge() {
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
      console.log(err);
      setRunResult("Error executing code");
    }
  }, [activeCase]);

  const handleReset = useCallback(() => {
    setCode(initialCode);
    setRunResult(null);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-6 md:p-10">
          {/* Code Editor Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Two Sum</h2>
              <div className="flex space-x-2">
                <Button
                  onClick={handleRun}
                  variant="default"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Play size={16} /> Run
                </Button>
                <Button
                  onClick={handleReset}
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <RefreshCw size={16} /> Reset
                </Button>
                <Button
                  onClick={handleCopyCode}
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  {isCopied ? (
                    <Check size={16} className="text-green-500" />
                  ) : (
                    <Copy size={16} />
                  )}
                </Button>
              </div>
            </div>
            <div className="relative">
              <pre className="p-4 bg-black/50 rounded-md border border-gray-700">
                <code className="text-sm font-mono text-white block overflow-x-auto">
                  {code}
                </code>
              </pre>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="absolute inset-0 w-full h-full bg-transparent text-transparent caret-white font-mono text-sm p-4 resize-none"
                spellCheck="false"
              />
            </div>
            {runResult && (
              <div className="bg-black/30 p-3 rounded-md border border-gray-700 text-white">
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
              <TabsList className="w-full bg-gray-900 p-1 rounded-xl">
                {testCases.map((testCase) => (
                  <TabsTrigger
                    key={testCase.id}
                    value={testCase.id.toString()}
                    className="flex-1 rounded-lg data-[state=active]:bg-gray-700 transition-colors"
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
                  <div className="bg-black/30 p-4 rounded-xl border border-gray-700">
                    <h3 className="text-sm font-semibold text-gray-400 mb-2">
                      {testCase.description}
                    </h3>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm text-gray-500">Input:</span>
                        <pre className="p-2 bg-black/50 rounded-md mt-1">
                          <code className="text-sm font-mono text-white block">
                            nums = {JSON.stringify(testCase.input.nums)} target
                            = {testCase.input.target}
                          </code>
                        </pre>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Output:</span>
                        <pre className="p-2 bg-black/50 rounded-md mt-1">
                          <code className="text-sm font-mono text-white block">
                            {JSON.stringify(testCase.output)}
                          </code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeChallenge;
