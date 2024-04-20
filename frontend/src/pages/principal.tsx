import React from "react";

import InputForm from "../components/inputForm";
import DropFile from "../components/dropFile";
import ExamplesLayer from "../components/examplesButtons";
import ModalLayout from "../components/modal";
import { useGlobalState } from "../context/globalContext";

import cssExamples from "../utils/cssExamples";
import tailwindExamples from "../utils/tailwindExamples";

import { ExamplesType } from "../utils/types";

export default function Principal() {
  const { selectedMode } = useGlobalState();

  const [examples, setExamples] = React.useState({} as ExamplesType);

  React.useEffect(() => {
    setExamples(selectedMode === "ctt" ? cssExamples : tailwindExamples);
  }, [selectedMode]);

  return (
    <section className='flex flex-col justify-center items-center h-full w-full'>
      <div className='w-full flex justify-center items-center'>
        <div className='flex justify-end items-center w-[45%]'>
          <div className='w-[60%]'>
            <InputForm />
          </div>
        </div>
        <div className='w-[7%] flex justify-center items-center'>
          <p className=''>OR</p>
        </div>
        <div className='flex justify-start items-center w-[45%] mt-6'>
          <div className='w-[70%]'>
            <DropFile />
          </div>
        </div>
      </div>
      <div className='py-10'>
        <ExamplesLayer examples={examples} />
      </div>
      <ModalLayout />
    </section>
  );
}
