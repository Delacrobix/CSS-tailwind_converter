import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface CodeBoxProps {
  code?: string;
  language?: string;
  style?: string;
}

export default function CodeBox({
  code,
  language,
  style,
}: Readonly<CodeBoxProps>) {
  const [codeState, setCodeState] = React.useState<string>("");

  React.useEffect(() => {
    setCodeState(code ?? "");
  }, [code]);

  return (
    <SyntaxHighlighter language={`${language}`} style={docco}>
      {codeState}
    </SyntaxHighlighter>
  );
}
