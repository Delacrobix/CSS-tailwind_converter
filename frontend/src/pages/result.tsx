import React from "react";
import { useGlobalState } from "../context/globalContext";
import CodeBox from "../components/codeBox";
import { Button } from "@nextui-org/react";
import { getLanguage } from "../utils/functions";
import { useNavigate } from "react-router-dom";
import { getToastError } from "../utils/toasts";

export default function Result() {
  const { selectedMode, codeToConvert, convertedCode, isSubmitted } =
    useGlobalState();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isSubmitted) navigate("/");
  }, [isSubmitted]);

  function handleDownloadFile() {
    try {
      const blobFile = selectedMode.startsWith("c")
        ? new Blob([convertedCode], { type: "text/plain" })
        : new Blob([convertedCode], { type: "text/css" });

      const url = URL.createObjectURL(blobFile);
      const a = document.createElement("a");
      document.body.appendChild(a);

      a.href = url;
      a.download = selectedMode.startsWith("c")
        ? "convertedCode.html"
        : "convertedCode.css";
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error: ", error);
      getToastError();
    }
  }

  return (
    <div className='md:my-28 my-10 md:px-4 px-1 w-full flex flex-col items-center justify-center '>
      <div className='h-full w-full flex md:flex-row flex-col items-center justify-center gap-4'>
        <div className='lg:max-w-[40%] md:max-w-[50%] w-full'>
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
        <div className='lg:max-w-[40%] md:max-w-[50%] w-full '>
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
        <Button
          onClick={handleDownloadFile}
          size='lg'
          color='primary'
          variant='ghost'>
          Download code
        </Button>
      </div>
    </div>
  );
}
