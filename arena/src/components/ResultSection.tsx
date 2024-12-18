'use client';
import { Button } from '@shadcn/button';
import { cn } from 'lib/utils';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { AiTwotoneCode } from 'react-icons/ai';
import { FaRegCheckSquare } from 'react-icons/fa';
import { RiFullscreenFill, RiLoader4Fill, RiLoader5Fill } from 'react-icons/ri';
import { VscLoading } from 'react-icons/vsc';
import ProblemSkeleton from './Skeletons';

interface Props {
  testcases: string[];
  pending: boolean;
  activeTestTab: 'testcase' | 'test-result';
  setActiveTestTab: Dispatch<SetStateAction<'testcase' | 'test-result'>>;
}

const ResultSection: FC<Props> = ({
  testcases,
  pending,
  activeTestTab,
  setActiveTestTab,
}) => {
  const [results, setResults] = useState<null | string>(null);
  const [selectTestCase, setSelectTestCase] = useState<number>(0);

  return (
    <div className="results-section flex h-1/2 flex-col gap-3 overflow-auto rounded-lg border border-border bg-card p-4 hover:border-primary">
      <div className="results-section-header flex items-center justify-between gap-1 border-b border-border pb-2">
        <div className="flex flex-row gap-2">
          <Button
            variant={'outline'}
            className={cn(
              'flex flex-row items-center gap-1 rounded-md px-3 py-1 transition-colors duration-200',
              activeTestTab === 'testcase'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
            )}
            onClick={() => setActiveTestTab('testcase')}
          >
            <FaRegCheckSquare />
            testcase
          </Button>
          <Button
            variant={'outline'}
            className={cn(
              'flex flex-row items-center gap-1 rounded-md px-3 py-1 transition-colors duration-200',
              activeTestTab === 'test-result'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
            )}
            onClick={() => setActiveTestTab('test-result')}
          >
            {pending ? (
              <VscLoading className="animate-spin" />
            ) : (
              <AiTwotoneCode />
            )}
            test-result
          </Button>
        </div>

        <button
          className="text-muted-foreground transition-colors duration-200 hover:text-primary"
          aria-label="Zoom In"
        >
          <RiFullscreenFill size={20} />
        </button>
      </div>
      <div className="results-content flex max-h-[250px] flex-1 flex-col gap-3 overflow-scroll">
        {activeTestTab === 'testcase' && (
          <>
            <div className="flex flex-row gap-3">
              {testcases.map((testcase, index) => (
                <div
                  key={crypto.randomUUID()}
                  className={cn(
                    'cursor-pointer rounded-lg px-4 py-1 hover:bg-gray-600',
                    selectTestCase === index && 'bg-gray-700',
                  )}
                  onClick={() => setSelectTestCase(index)}
                >{`case ${index + 1}`}</div>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {testcases[selectTestCase].split('\n').map((testcase, index) => (
                <div key={crypto.randomUUID()} className="flex flex-col gap-3">
                  {`Arg ${index + 1} = `}
                  <span className="rounded-lg bg-gray-700 px-4 py-2">
                    {testcase}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
        {activeTestTab === 'test-result' &&
          results === null &&
          pending === false && (
            <div className="flex h-full items-center justify-center">
              <span className="text-accent">you must run the code first </span>
            </div>
          )}
        {activeTestTab === 'test-result' && pending && <ProblemSkeleton />}
      </div>
    </div>
  );
};

export { ResultSection };
