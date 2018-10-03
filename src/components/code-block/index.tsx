import React, { StatelessComponent } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/styles/hljs';

export interface CodeBlockProps {
  value: string;
  language?: string;
}

const CodeBlock: StatelessComponent<CodeBlockProps> = ({ value, language }) => {
  return (
    <SyntaxHighlighter language={language} style={github}>
      {value}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
