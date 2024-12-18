import ProblemsHeader from '@components/ProblemHeader';
import { ProblemSolve } from '@components/ProblemSolve';
import { fetchProblem } from 'lib/problemController';
import { notFound } from 'next/navigation';
import React, { FC } from 'react';

interface Props {
  params: Promise<{
    problemId: string;
  }>;
}

const ProblemSolvepage: FC<Props> = async ({ params }) => {
  const { problemId } = await params;
  console.log(problemId);
  const data = await fetchProblem(Number(problemId));
  console.log(data);

  if (!data) return notFound();

  return (
    <ProblemSolve
      description={data?.description}
      editorial={data.editorial}
      testcases={data.testCases}
      codeSnippets={data.codeSnippets}
      problemId={problemId}
    />
  );
};

export default ProblemSolvepage;
