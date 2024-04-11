import React from "react";
import InputForm from "../components/inputForm";

export default function Principal() {
  return (
    <div className='flex flex-col justify-center items-center h-[100vh] w-full '>
      <h1 className='text-4xl font-bold'>Tailwind CSS Converter</h1>
      <InputForm />
    </div>
  );
}
