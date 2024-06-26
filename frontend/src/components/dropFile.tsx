import React from "react";
import { useDropzone } from "react-dropzone";
import { useGlobalActions } from "../context/globalContext";
import { getToastError, getToastWarning } from "../utils/toasts";
import { codeValidator } from "../utils/functions";

export default function DropFile() {
  const { setCodeToConvert, setSelectedMode, setIsModalOpen } =
    useGlobalActions();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  React.useEffect(() => {
    if (acceptedFiles.length === 0) return;

    if (acceptedFiles.length > 1) {
      getToastWarning("Please select only one file!");
      return;
    }

    const file = acceptedFiles[0];

    if (!isValidSize(file)) return;
    if (!isValidType(file)) return;

    (async () => {
      try {
        const fileContent = await readFileContent(file);

        if (file.type === "text/css") {
          const codeValidation = await codeValidator(
            fileContent as string,
            "css"
          );

          if (!codeValidation.isValid) {
            getToastError("The CSS code is not valid!");
            return;
          }
        }

        setCodeToConvert(fileContent as string);
        setIsModalOpen(true);
      } catch (e) {
        console.error("Error reading file content: ", e);
        getToastError();
      }
    })();
  }, [acceptedFiles]);

  function isValidSize(file: File) {
    if (file.size > 1000000) {
      getToastWarning(
        "The file is too big! Please select a file less than 1MB."
      );

      return false;
    }

    return true;
  }

  function readFileContent(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = handleFileLoad;
      reader.onerror = handleError;
      reader.readAsText(file);

      function handleFileLoad(event: ProgressEvent<FileReader>) {
        const contents = event?.target?.result;
        resolve(contents);
      }

      function handleError(error: ProgressEvent<FileReader>) {
        reject(error);
      }
    });
  }

  function isValidType(file: File) {
    const validTypes = [
      "text/css",
      "text/html",
      "application/x-tiled-tsx",
      "text/javascript",
      "application/javascript",
      "application/jsx",
      "text/jsx",
    ];

    if (!validTypes.includes(file.type)) {
      getToastWarning(
        "The file type is not supported! Please select a CSS or HTML file."
      );

      return false;
    }

    handleSelectMode(file);

    return true;
  }

  function handleSelectMode(file: File) {
    switch (file.type) {
      case "text/css":
        setSelectedMode("ctt");
        break;
      case "text/html":
        setSelectedMode("ttc");
        break;
    }
  }

  return (
    <>
      <div
        {...getRootProps()}
        className='border border-dashed border-gray-400 p-4 rounded-lg text-center cursor-pointer '>
        <input {...getInputProps()} />
        <p className='text-gray-600'>
          Drag 'n' drop some file here, or click to select files
        </p>
      </div>
      <aside>
        <ul>
          <li className='pl-1 text-gray-500 text-[13px]'>
            Files must be less than 1MB and of type CSS or HTML.
          </li>
        </ul>
      </aside>
    </>
  );
}
