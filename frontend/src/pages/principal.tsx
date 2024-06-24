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
    <section className='md:my-unit-6xl my-unit-3xl flex flex-col justify-center items-center h-full w-full'>
      <div className='w-[90%] md:w-full flex flex-col md:flex-row justify-center items-center'>
        <div className='w-full flex justify-end items-center md:w-[45%]'>
          <div className='w-full md:w-[60%] '>
            <InputForm />
          </div>
        </div>
        <div className='md:w-[7%] flex justify-center items-center'>
          <p className=''>OR</p>
        </div>
        <div className='w-[90%] flex justify-start items-center md:w-[45%] mt-6'>
          <div className='w-full md:w-[70%]'>
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
