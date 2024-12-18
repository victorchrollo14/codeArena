'use client';
import { Editor } from '@monaco-editor/react';
import { CodeSnippets } from '@prisma/client';
import React, { FC, useState } from 'react';
import { RiFullscreenFill } from 'react-icons/ri';

interface Props {
  codeSnippets: Partial<CodeSnippets[]>;
}

const CodeEditor: FC<Props> = ({ codeSnippets }) => {
  const [code, setCode] = useState(codeSnippets[0]?.code);

  return (
    <div className="code-writing-section h-1/2 rounded-lg border border-border bg-[#1e1e1e] p-4 hover:border-primary">
      <div className="mb-4 flex items-center justify-between border-b border-border pb-2">
        <div>
          <span>Code </span>
        </div>
        <button
          className="text-muted-foreground transition-colors duration-200 hover:text-primary"
          aria-label="Zoom In"
        >
          <RiFullscreenFill size={20} />
        </button>
      </div>
      <div>
        <Editor
          height={250}
          width={720}
          language="python"
          theme="vs-dark"
          className="h-full w-fit bg-background"
          value={code}
        />
      </div>
    </div>
  );
};

export { CodeEditor };
