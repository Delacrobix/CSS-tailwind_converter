import React from "react";
import InputForm from "../components/inputForm";
import { Button } from "@nextui-org/react";
import DropFile from "../components/dropFile";
import ExamplesLayer from "../components/examplesLayer";

export default function Principal() {
  return (
    <section className='flex flex-col justify-center items-center h-[100vh] w-full'>
      <div className='flex justify-center items-center'>
        <InputForm />
        <p className='m-4'>OR</p>
        <div className=''>
          <DropFile />
        </div>
      </div>
      <ExamplesLayer />
    </section>
  );
}
