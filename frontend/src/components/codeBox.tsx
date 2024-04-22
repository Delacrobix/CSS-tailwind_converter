import React from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import sass from "react-syntax-highlighter/dist/esm/languages/prism/sass";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import prettier from "prettier/standalone";
import * as htmlPlugin from "prettier/parser-html";
import * as cssPlugin from "prettier/plugins/postcss";

import { FaCopy } from "react-icons/fa";
import { getSuccessToast, getToastError } from "../utils/toasts";
import { useNavigate } from "react-router-dom";

SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("sass", sass);

interface CodeBoxProps {
  code?: string;
  language?: string;
}

export default function CodeBox({ code, language }: Readonly<CodeBoxProps>) {
  const [formattedCode, setFormattedCode] = React.useState<string>("");
  const navigate = useNavigate();

  React.useEffect(() => {
    async function formatCode() {
      try {
        const newCode = prettier.format(code ?? "", {
          parser: language === "xml" ? "html" : "css",
          proseWrap: "always",
          plugins: [htmlPlugin, cssPlugin],
          tabWidth: 2,
          useTabs: true,
          htmlWhitespaceSensitivity: "ignore",
          singleQuote: true,
        });

        setFormattedCode((await newCode) ?? "");
      } catch (error) {
        console.error(error);
        getToastError();
        navigate("/");
      }
    }

    formatCode();
  }, [code]);

  function copyToClipboard() {
    navigator.clipboard.writeText(formattedCode);
    getSuccessToast("Code copied to clipboard!");
  }

  return (
    <div style={{ position: "relative" }}>
      <SyntaxHighlighter
        wrapLines={true}
        wrapLongLines={true}
        startingLineNumber={1}
        language={`${language}`}
        style={oneDark}>
        {formattedCode}
      </SyntaxHighlighter>
      <button
        className='absolute top-2 right-2 p-2 cursor-pointer bg-none border-none outline-none text-white'
        onClick={copyToClipboard}>
        <FaCopy />
      </button>
    </div>
  );
}
