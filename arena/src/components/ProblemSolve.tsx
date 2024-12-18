'use client';
import React, { FC, useState } from 'react';
import { CodeSnippets } from '@prisma/client';
import { ZoomIn } from 'lucide-react';
import { RiFullscreenFill } from 'react-icons/ri';
import ReactMarkdown from 'react-markdown';
import { FaRegCheckSquare } from 'react-icons/fa';
import { AiTwotoneCode } from 'react-icons/ai';
import { Button } from '@shadcn/button';
import Editor from '@monaco-editor/react';
import { ResultSection } from './ResultSection';
import { CodeEditor } from './CodeEditor';
import ProblemsHeader from './ProblemHeader';
import { ProblemDescription } from './ProblemDescription';

interface Props {
  description: string;
  editorial: string;
  solutions?: string;
  codeSnippets: Partial<CodeSnippets[]>;
  testcases: string[];
}

const ProblemSolve: FC<Props> = ({
  description,
  editorial,
  solutions,
  codeSnippets,
  testcases,
}) => {
  const [pending, setPending] = useState<boolean>(false);
  const [activeTestTab, setActiveTestTab] = useState<
    'testcase' | 'test-result'
  >('testcase');

  const runCode = async () => {
    setPending(true);
    setActiveTestTab('test-result');
  };

  return (
    <div className="flex h-screen flex-col gap-5">
      <ProblemsHeader pending={pending} runCode={runCode} />
      <div className="problem-solving-section flex flex-1 flex-row gap-2 px-4 py-2">
        <section className="problems-info-section w-1/2 rounded-lg border border-border bg-card p-4 hover:border-primary">
          <ProblemDescription
            description={description}
            editorial={editorial}
            solutions={solutions}
          />
        </section>
        <section className="coding-section flex w-1/2 flex-col gap-2">
          <CodeEditor codeSnippets={codeSnippets} />
          <ResultSection
            testcases={testcases}
            pending={pending}
            activeTestTab={activeTestTab}
            setActiveTestTab={setActiveTestTab}
          />
        </section>
      </div>
    </div>
  );
};

export { ProblemSolve };
