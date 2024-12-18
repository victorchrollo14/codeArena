'use client';
import React, { FC, useRef, useState } from 'react';
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
import { Toaster } from '@shadcn/toaster';
import axios from 'axios';
import { toast } from '@hooks/use-toast';

interface Props {
  problemId: string;
  description: string;
  editorial: string;
  solutions?: string;
  codeSnippets: Partial<CodeSnippets[]>;
  testcases: string[];
}

const ProblemSolve: FC<Props> = ({
  problemId,
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

  const codeRef = useRef(
    localStorage.getItem(`python_${problemId}`) || codeSnippets[0]?.code,
  );

  const runCode = async () => {
    setPending(true);
    setActiveTestTab('test-result');

    try {
      console.log({
        lang: 'python',
        code: codeRef.current,
        problemId: Number(problemId),
      });
      const res = await axios.post('/api/code/run', {
        lang: 'python',
        code: codeRef.current,
        problemId: Number(problemId),
      });
      console.log(res.data);

      const submissionId = res.data.submissionId;

      while (1) {
        const response = await axios.post('/api/code/getResults', {
          submissionId: submissionId,
        });
        const results = response.data.results;
        if (results) {
          console.log(results);
          setPending(false);
          break;
        }
      }
    } catch (error) {
      setPending(false);
      console.log(error);
      toast({ title: 'some error occured, try again', variant: 'destructive' });
    }
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
          <CodeEditor codeRef={codeRef} problemId={problemId} />
          <ResultSection
            testcases={testcases}
            pending={pending}
            activeTestTab={activeTestTab}
            setActiveTestTab={setActiveTestTab}
          />
        </section>
      </div>
      <Toaster />
    </div>
  );
};

export { ProblemSolve };
