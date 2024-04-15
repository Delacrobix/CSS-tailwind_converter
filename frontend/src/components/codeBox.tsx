import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import prettier from "prettier/standalone";
import * as htmlPlugin from "prettier/parser-html";
import * as cssPlugin from "prettier/plugins/postcss";
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
  const [formattedCode, setFormattedCode] = React.useState<string>("");

  React.useEffect(() => {
    async function formatCode() {
      const newCode = prettier.format(code ?? "", {
        parser: language === "xml" ? "html" : "css",
        plugins: [htmlPlugin, cssPlugin],
        tabWidth: 2,
        htmlWhitespaceSensitivity: "ignore",
      });

      setFormattedCode((await newCode) ?? "");
    }

    formatCode();
  }, [code]);

  return (
    <SyntaxHighlighter
      showLineNumbers={true}
      language={`${language}`}
      style={docco}
      customStyles={style}>
      {formattedCode}
    </SyntaxHighlighter>
  );
}
