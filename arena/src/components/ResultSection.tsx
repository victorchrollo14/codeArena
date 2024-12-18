'use client';
import { Button } from '@shadcn/button';
import { cn } from 'lib/utils';
import React, { FC, useState } from 'react';
import { AiTwotoneCode } from 'react-icons/ai';
import { FaRegCheckSquare } from 'react-icons/fa';
import { RiFullscreenFill } from 'react-icons/ri';

interface Props {
  testcases: string[];
}

const ResultSection: FC<Props> = ({ testcases }) => {
  const [activeTestTab, setActiveTestTab] = useState<
    'testcase' | 'test-result'
  >('testcase');
  const [results, setResults] = useState<null | string>(null);
  const [selectTestCase, setSelectTestCase] = useState<number>(0);

  const testCaseTabs = [
    { label: 'testcase', icon: <FaRegCheckSquare /> },
    { label: 'test-result', icon: <AiTwotoneCode /> },
  ];

  return (
    <div className="results-section h-1/2 rounded-lg border border-border bg-card p-4 hover:border-primary">
      <div className="results-section-header mb-4 flex items-center justify-between gap-1 border-b border-border pb-2">
        <div className="flex flex-row gap-2">
          {testCaseTabs.map((tab) => (
            <Button
              key={tab.label}
              variant={'outline'}
              className={`flex flex-row items-center gap-1 rounded-md px-3 py-1 transition-colors duration-200 ${
                activeTestTab === tab.label
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              } `}
              onClick={() => setActiveTestTab(tab.label as any)}
            >
              {tab.icon}
              {tab.label}
            </Button>
          ))}
        </div>

        <button
          className="text-muted-foreground transition-colors duration-200 hover:text-primary"
          aria-label="Zoom In"
        >
          <RiFullscreenFill size={20} />
        </button>
      </div>
      <div className="results-content flex h-5/6 flex-col gap-3">
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
                  {`Arg ${index} = `}
                  <span className="rounded-lg bg-gray-700 px-4 py-2">
                    {testcase}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
        {activeTestTab === 'test-result' &&
          (results === null ? (
            <div className="flex h-full items-center justify-center">
              <span className="text-accent">you must run the code first </span>
            </div>
          ) : (
            <div>{results}</div>
          ))}
      </div>
    </div>
  );
};

export { ResultSection };
