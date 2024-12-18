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
  const [activeTab, setActiveTab] = useState<
    'description' | 'editorial' | 'submissions' | 'solutions'
  >('description');

  const tabs = [
    { label: 'Description', key: 'description' },
    { label: 'Editorial', key: 'editorial' },
    { label: 'Submissions', key: 'submissions' },
    { label: 'Solutions', key: 'solutions' },
  ];

  function normalizeMarkdown(content: string): string {
    // Remove any extra quotes or escape sequences
    return content
      .replace(/^"|"$/g, '') // Remove surrounding quotes
      .replace(/\\n/g, '\n') // Replace escaped newlines
      .replace(/\\"/g, '"') // Replace escaped quotes
      .trim();
  }
  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div id="markdown-content" className="prose prose-invert max-w-full">
            <ReactMarkdown>{description}</ReactMarkdown>
          </div>
        );
      case 'editorial':
        const content = normalizeMarkdown(editorial);
        return (
          <div id="markdown-content" className="prose prose-invert max-w-full">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        );
      case 'submissions':
        return (
          <div className="text-muted-foreground">
            Submissions will be displayed here
          </div>
        );
      case 'solutions':
        return (
          <div className="prose prose-invert max-w-full">
            {solutions ? (
              <div dangerouslySetInnerHTML={{ __html: solutions }} />
            ) : (
              <p className="text-muted-foreground">No solutions available</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="problem-solving-section flex min-h-[90vh] flex-row gap-2 px-4">
      <section className="problems-info-section max-h-[90vh] min-h-full w-1/2 rounded-lg border border-border bg-card p-4 hover:border-primary">
        {/* Header with Tabs and Zoom Icon */}
        <div className="mb-4 flex items-center justify-between border-b border-border pb-2">
          <div className="flex space-x-4">
            {tabs.map((tab) => (
              <Button
                key={tab.key}
                variant={'outline'}
                className={`rounded-md px-3 py-1 transition-colors duration-200 ${
                  activeTab === tab.key
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                } `}
                onClick={() => setActiveTab(tab.key as any)}
              >
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

        {/* Tab Content */}
        <div className="tab-content h-[calc(100%-50px)] overflow-y-scroll">
          {renderTabContent()}
        </div>
      </section>
      <section className="coding-section flex max-h-full min-h-full w-1/2 flex-col gap-2">
        <CodeEditor codeSnippets={codeSnippets} />
        <ResultSection testcases={testcases} />
      </section>
    </div>
  );
};

export { ProblemSolve };
