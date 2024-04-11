import React from "react";
import { useGlobalState } from "../context/globalContext";
import CodeBox from "../components/codeBox";
import { Button } from "@nextui-org/react";

export default function Result() {
  // const { selectedMode, codeToConvert, convertedCode } = useGlobalState();

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

const selectedMode = "ctt";
const convertedCode = `<div class='container max-w-1200 mx-auto'></div><h1 class='title text-24 font-bold text-gray-700'></h1><button class='button p-2 px-4 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-700'></button>`;
const codeToConvert =
  ".container { max-width: 1200px; margin: 0 auto; } .title { font-size: 24px; font-weight: bold; color: #333; } .button { padding: 10px 20px; background-color: #007bff; color: #fff; border: none; border-radius: 4px; cursor: pointer; } .button:hover { background-color: #0056b3; }";
