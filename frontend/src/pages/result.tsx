import React from "react";
import { useGlobalState } from "../context/globalContext";
import CodeBox from "../components/codeBox";
import { Button } from "@nextui-org/react";
import { getLanguage } from "../utils/functions";

export default function Result() {
  const { selectedMode, codeToConvert, convertedCode } = useGlobalState();

  return (
    <div className='h-[100vh]  flex flex-col items-center justify-center'>
      <div className='flex  justify-center gap-4 m-4'>
        <div className=' w-[40%] overflow-y-auto whitespace-pre-wrap'>
          <CodeBox
            code={codeToConvert}
            language={getLanguage("from", selectedMode[0])}
          />
        </div>
        <div className=' w-[40%] overflow-y-auto whitespace-pre-wrap'>
          <CodeBox
            code={convertedCode}
            language={getLanguage("to", selectedMode[0])}
          />
        </div>
      </div>
      <div className=''>
        <Button color='primary' variant='ghost'>
          Download code
        </Button>
      </div>
    </div>
  );
}
