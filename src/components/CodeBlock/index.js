import { CodeBlock as Block } from "react-code-blocks";

import React from "react";

const CodeBlock = ({ code, language }) => {
  return <Block text={code} language={language} showLineNumbers />;
};

export default CodeBlock;
