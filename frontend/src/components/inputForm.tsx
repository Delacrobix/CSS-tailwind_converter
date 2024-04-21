import React from "react";
import { Button, Textarea, Tab, Tabs } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

import { DataFromAPI } from "../utils/types";
import { getToastError } from "../utils/toasts";
import { codeValidator } from "../utils/functions";
import { useGlobalActions, useGlobalState } from "../context/globalContext";
import UseRequests from "../hooks/useRequests";

const BACKEND_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export default function InputForm() {
  const navigate = useNavigate();
  const { selectedMode } = useGlobalState();
  const { loading, error, data, sendRequest } = UseRequests<string>();
  const { setCodeToConvert, setConvertedCode, setIsSubmitted } =
    useGlobalActions();
  const { codeToConvert } = useGlobalState();

  const [content, setContent] = React.useState<string>("");

  React.useEffect(() => {
    if (error) {
      getToastError();

      console.error("Error: ", error);
      return;
    }

    if (data) {
      try {
        const formattedData: DataFromAPI = data;
        const jsonData = JSON.parse(formattedData.aiMessage);
        const code = jsonData.code;

        setConvertedCode(code);
        setIsSubmitted(true);

        navigate("/result");
      } catch (e) {
        console.error("Error converting to json: ", e);
        getToastError();
      }
    }
  }, [data, error]);

  React.useEffect(() => {
    if (!codeToConvert) return;

    setContent(deleteLastLine(codeToConvert));
  }, [codeToConvert]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setContent(event.target.value);
  }

  function deleteLastLine(text: string) {
    const lines = text.split("\n");
    lines.pop();
    return lines.join("\n");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      setCodeToConvert(content);

      const codeLanguage = selectedMode === "ctt" ? "css" : "xml";
      const validationResult = await codeValidator(content, codeLanguage);

      if (!validationResult.isValid) {
        console.error("Invalid code: ", validationResult.errors);

        getToastError(`Invalid code! Please check your code and try again.`);

        return;
      }

      const endpoint =
        selectedMode === "ctt" ? "css-to-tailwind" : "tailwind-to-css";

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
      console.error("Error on submit: ", e);
    }
  }

  function handleButtonDisable() {
    return content.length === 0;
  }

  function handleClearButton(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setContent("");
  }

  return (
    <form>
      <div className='w-full py-2'>
        <ListboxWrapper isLoading={loading} />
      </div>
      <div className='relative'>
        <Textarea
          maxRows={16}
          className='max-w-full'
          label='Code'
          variant='bordered'
          placeholder='Write or paste your code here...'
          defaultValue={content}
          value={content}
          onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>}
        />
        <button
          className='absolute top-1 right-1 p-1 text-[12px] text-gray-500 hover:text-gray-700 transition-all duration-150'
          onClick={handleClearButton}>
          Clear
        </button>
      </div>
      <div className='flex justify-center my-2'>
        <Button
          className='w-[40%]'
          type='submit'
          variant='ghost'
          color='primary'
          isLoading={loading}
          isDisabled={handleButtonDisable()}
          onClick={
            handleSubmit as React.MouseEventHandler<
              HTMLButtonElement | HTMLFormElement
            >
          }>
          Convert
        </Button>
      </div>
    </form>
  );
}

interface ListboxWrapperProps {
  isLoading: boolean;
}

// #region ListboxWrapper
function ListboxWrapper({ isLoading }: Readonly<ListboxWrapperProps>) {
  const { setSelectedMode } = useGlobalActions();
  const { selectedMode } = useGlobalState();

  function handleSelect(value: string) {
    setSelectedMode(value);
  }

  return (
    <Tabs
      className='w-full flex items-center justify-center'
      size='md'
      color='secondary'
      isDisabled={isLoading}
      selectedKey={selectedMode}
      onSelectionChange={handleSelect as (key: React.Key) => unknown}>
      <Tab className='w-[100%]' key='ctt' title='CSS to tailwind' />
      <Tab className='w-[100%]' key='ttc' title='Tailwind to CSS' />
    </Tabs>
  );
}
