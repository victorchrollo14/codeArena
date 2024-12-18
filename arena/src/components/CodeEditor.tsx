'use client';
import { toast } from '@hooks/use-toast';
import { Editor } from '@monaco-editor/react';
import React, { FC, MutableRefObject } from 'react';
import { RiFullscreenFill } from 'react-icons/ri';

interface Props {
  codeRef: MutableRefObject<string | undefined>;
  problemId: string;
}

const CodeEditor: FC<Props> = ({ codeRef, problemId }) => {
  const handleKeys = (event: any) => {
    // save
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
      event.preventDefault();
      toast({ title: 'saved to local storage' });
      return false;
    }
    console.log(event.code);
  };

  const handleEditorChange = (value: any, e: any) => {
    console.log(value);
    localStorage.setItem(`python_${problemId}`, value);
    codeRef.current = value;
  };

  return (
    <div className="code-writing-section flex h-1/2 flex-col rounded-lg border border-border bg-[#1e1e1e] p-4 hover:border-primary">
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
      <div onKeyDown={(e) => handleKeys(e)} className="flex-1">
        <Editor
          height={'100%'}
          width={'100%'}
          language="python"
          theme="vs-dark"
          className="h-full w-fit bg-background"
          value={codeRef.current as string}
          onChange={handleEditorChange}
        />
      </div>
    </div>
  );
};

export { CodeEditor };
