import React from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { useGlobalActions } from "../context/globalContext";
import { useNavigate } from "react-router-dom";

// TODO: Maybe show one page with the mode selected and file before convert
export default function DropFile() {
  const { setCodeToConvert, setIsSubmitted, setSelectedMode } =
    useGlobalActions();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (acceptedFiles.length === 0) return;

    if (acceptedFiles.length > 1) {
      toast.warning("Please select only one file!", {
        duration: 5000,
        style: {
          color: "orange",
          borderRadius: "0.5rem",
        },
      });
      return;
    }

    const file = acceptedFiles[0];

    if (!isValidSize(file)) return;
    if (!isValidType(file)) return;

    (async () => {
      try {
        const fileContent = await readFileContent(file);

        setCodeToConvert(fileContent as string);
        setIsSubmitted(true);

        navigate("/result");
      } catch (e) {
        console.error("Error reading file content: ", e);
        toast.error("Something went wrong! Please try again.", {
          duration: 5000,
          style: {
            color: "red",
            borderRadius: "0.5rem",
          },
        });
      }
    })();
  }, [acceptedFiles]);

  function isValidSize(file: File) {
    if (file.size > 1000000) {
      toast.warning(
        "The file is too big! Please select a file less than 1MB.",
        {
          duration: 5000,
          style: {
            color: "orange",
            borderRadius: "0.5rem",
          },
        }
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
      toast.warning(
        "The file type is not supported! Please select a CSS, HTML, TSX or JSX file.",
        {
          duration: 5000,
          style: {
            color: "orange",
            borderRadius: "0.5rem",
          },
        }
      );

      return false;
    }

    handleSelectMode(file);

    return true;
  }

  //TODO: Add more modes in the future
  function handleSelectMode(file: File) {
    if (file.type === "text/css") {
      setSelectedMode("ctt");
    }
  }

  return (
    <>
      <div
        {...getRootProps()}
        className='border border-dashed border-gray-400 p-4 rounded-lg text-center cursor-pointer '>
        <input {...getInputProps()} />
        <p className='text-gray-600'>
          Drag 'n' drop some files here, or click to select files
        </p>
      </div>
      <aside>
        <ul>
          <li className=' text-sm'>
            Files must be less than 1MB and of type CSS, HTML, TSX or JSX.
          </li>
        </ul>
      </aside>
    </>
  );
}
