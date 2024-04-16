import React from "react";
import { useGlobalState } from "../context/globalContext";
import CodeBox from "../components/codeBox";
import { Button } from "@nextui-org/react";
import { getLanguage } from "../utils/functions";
import { useNavigate } from "react-router-dom";

export default function Result() {
  const { selectedMode, codeToConvert, convertedCode, isSubmitted } =
    useGlobalState();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isSubmitted) navigate("/");
  }, [isSubmitted]);

  return (
    <div className='w-full flex flex-col items-center justify-center my-[5%]'>
      <div className='h-full w-full flex items-center justify-center gap-4'>
        <div className='max-w-[50]'>
          <p className='text-center font-bold'>FROM</p>
          <div className='overflow-y-auto'>
            <div className=' h-[500px]'>
              <CodeBox
                code={codeToConvert}
                language={getLanguage("from", selectedMode[0])}
              />
            </div>
          </div>
        </div>
        <div className='max-w-[50%] '>
          <p className='text-center font-bold'>TO</p>
          <div className='overflow-y-auto'>
            <div className='h-[500px]'>
              <CodeBox
                code={convertedCode}
                language={getLanguage("to", selectedMode[0])}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='my-6'>
        <Button size='lg' color='primary' variant='ghost'>
          Download code
        </Button>
      </div>
    </div>
  );
}
