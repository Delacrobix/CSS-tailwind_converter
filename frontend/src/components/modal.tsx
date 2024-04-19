import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useGlobalActions, useGlobalState } from "../context/globalContext";
import { useNavigate } from "react-router-dom";
import CodeBox from "./codeBox";
import { getLanguage } from "../utils/functions";
import UseRequests from "../hooks/useRequests";
import { getToastError } from "../utils/toasts";
import { DataFromAPI } from "../utils/types";

const BACKEND_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export default function ModalLayout() {
  const { codeToConvert, selectedMode, isModalOpen } = useGlobalState();
  const { setIsSubmitted, setConvertedCode, setIsModalOpen } =
    useGlobalActions();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { loading, error, data, sendRequest } = UseRequests<string>();
  const navigate = useNavigate();

  const [code, setCode] = React.useState<string>("");

  React.useEffect(() => {
    if (!isModalOpen) return;
    onOpen();
  }, [isModalOpen]);

  React.useEffect(() => {
    if (!isOpen) {
      setIsModalOpen(false);
      setIsSubmitted(false);
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (!codeToConvert) return;
    setCode(codeToConvert);
  }, [codeToConvert]);

  React.useEffect(() => {
    if (error) {
      console.error("Error: ", error);
      getToastError();
      return;
    }

    if (data) {
      try {
        const formattedData: DataFromAPI = data;
        const jsonData = JSON.parse(formattedData.aiMessage);
        const code = jsonData.code;

        if (typeof code === "string") {
          setConvertedCode(code);
          handleCloseModal();
          navigate("/result");
        } else if (typeof code === "object") {
          const stringCode = JSON.stringify(code);
          setConvertedCode(stringCode);
          handleCloseModal();
          navigate("/result");
        } else {
          getToastError();
        }
      } catch (e) {
        console.error("Error converting to json: ", e);
        getToastError();
      }
    }
  }, [data, error]);

  function handleCloseModal() {
    console.log("Closing modal");
    setIsSubmitted(true);
    setIsModalOpen(false);
    onClose();
  }

  function handleClick() {
    const mode = selectedMode;
    const content = code;

    handleRequests(content, mode);
  }

  async function handleRequests(content: string, mode: string) {
    const endpoint = mode === "ctt" ? "css-to-tailwind" : "tailwind-to-css";

    try {
      await sendRequest({
        method: "post",
        url: `${BACKEND_URL}/openai-api/${endpoint}`,
        data: { message: content },
        headers: {
          "Content-Type": "application/json",
          "api-key": API_KEY,
        },
      });
    } catch (e) {
      console.error("Error sending request: ", e);
    }
  }

  return (
    <Modal
      size='2xl'
      className='h-3/4'
      isOpen={isOpen}
      onOpenChange={onOpenChange}>
      <ModalContent className=''>
        <>
          <ModalHeader className='flex flex-col gap-1 text-center'>
            Confirm your file content
          </ModalHeader>
          <ModalBody className='overflow-y-auto'>
            <CodeBox
              code={code}
              language={getLanguage("from", selectedMode[0])}
            />
          </ModalBody>
          <ModalFooter className='flex justify-center'>
            <Button
              color='primary'
              variant='ghost'
              isLoading={loading}
              onPress={handleClick}>
              Let's convert
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
}
