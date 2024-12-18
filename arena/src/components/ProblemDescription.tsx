import { CodeSnippets } from '@prisma/client';
import { Button } from '@shadcn/button';
import React, { FC, useState } from 'react';
import { RiFullscreenFill } from 'react-icons/ri';
import ReactMarkdown from 'react-markdown';

interface Props {
  description: string;
  editorial: string;
  solutions?: string;
}

const ProblemDescription: FC<Props> = ({
  description,
  editorial,
  solutions,
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
    <>
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

      <div className="tab-content max-h-[550px] overflow-y-scroll">
        {renderTabContent()}
      </div>
    </>
  );
};

export { ProblemDescription };
