import React from "react";
import { useGlobalState } from "../context/globalContext";
import CodeBox from "../components/codeBox";
import { Button } from "@nextui-org/react";

export default function Result() {
  const { selectedMode, codeToConvert, convertedCode } = useGlobalState();

  function getLanguage(key: string) {
    const firstLetter = selectedMode[0];

    switch (key) {
      case "from":
        if (firstLetter === "c") return "css";
        else return "xml";
      case "to":
        if (firstLetter === "c") return "xml";
        else return "css";
    }
  }

  return (
    <div className='h-[100vh]  flex flex-col items-center justify-center'>
      <div className='flex  justify-center gap-4 m-4'>
        <CodeBox code={codeToConvert} language={getLanguage("from")} />
        <CodeBox code={convertedCode} language={getLanguage("to")} />
      </div>
      <div className=''>
        <Button color='primary' variant='ghost'>
          Download code
        </Button>
      </div>
    </div>
  );
}
