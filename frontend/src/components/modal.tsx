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

export default function ModalLayout() {
  const { codeToConvert, selectedMode, isSubmitted } = useGlobalState();
  const { setIsSubmitted } = useGlobalActions();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();

  const [code, setCode] = React.useState<string>("");

  React.useEffect(() => {
    console.log("isSubmitted", isSubmitted);
    if (!isSubmitted) return;
    onOpen();
    setIsSubmitted(false);
  }, [isSubmitted]);

  React.useEffect(() => {
    if (!codeToConvert) return;
    setCode(codeToConvert);
  }, [codeToConvert]);

  function handleClick(onClose: () => void) {
    onClose();
    navigate("/result");
  }

  return (
    <Modal className='h-3/4' isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className=''>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              Confirm your file content
            </ModalHeader>
            <ModalBody className='overflow-y-auto'>
              <CodeBox
                code={code}
                language={getLanguage("from", selectedMode[0])}
                style=''
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color='secondary'
                variant='light'
                onPress={() => handleClick(onClose)}>
                Let's convert
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
