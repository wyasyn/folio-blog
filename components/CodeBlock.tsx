"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "plaintext",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <span className="relative pt-9 block code-block">
      {/* Language Label */}
      <span className="absolute top-2 left-0 bg-secondary text-muted-foreground text-xs px-2 py-1 rounded">
        {language}
      </span>

      {/* Copy Button */}
      <button
        className="absolute top-2 right-0 p-1 text-xs rounded hover:bg-secondary text-muted-foreground transition"
        onClick={handleCopy}
        aria-label="Copy code"
        aria-describedby="copied-message"
        title="Copy code"
      >
        {copied ? (
          <Check className="w-4 h-4 text-emerald-500" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>

      {/* Code Syntax Highlighter */}
      <SyntaxHighlighter language={language} style={nightOwl} showLineNumbers>
        {code}
      </SyntaxHighlighter>
    </span>
  );
};

export default CodeBlock;
