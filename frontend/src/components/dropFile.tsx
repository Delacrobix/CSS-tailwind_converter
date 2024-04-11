import React from "react";
import { useDropzone } from "react-dropzone";

// TODO: Validate the file type
// TODO: Validate the file size
// TODO: Maybe show one page with the mode selected and file before convert
export default function DropFile() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <>
      <div
        {...getRootProps()}
        className='border border-dashed border-gray-400 p-4 rounded-lg text-center cursor-pointer'>
        <input {...getInputProps()} />
        <p className='text-gray-600'>
          Drag 'n' drop some files here, or click to select files
        </p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </>
  );
}
