import React from "react";

import InputForm from "../components/inputForm";
import DropFile from "../components/dropFile";
import ExamplesLayer from "../components/examplesLayer";
import ModalLayout from "../components/modal";

export default function Principal() {
  return (
    <section className='flex flex-col justify-center items-center h-[100vh] w-full'>
      <div className='flex justify-center items-center'>
        <div className='w-[45%]'>
          <InputForm />
        </div>
        <p className='m-4'>OR</p>
        <div className='w-[45%]'>
          <DropFile />
        </div>
      </div>
      <ExamplesLayer />
      <ModalLayout />
    </section>
  );
}
