import React from "react";
import InputForm from "../components/inputForm";
import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons";
import DropFile from "../components/dropFile";

export default function Principal() {
  return (
    <div className='flex justify-center items-center h-[100vh] w-full'>
      <InputForm />
      <p className='m-4'>OR</p>
      <div className=''>
        <DropFile />
      </div>
    </div>
  );
}
