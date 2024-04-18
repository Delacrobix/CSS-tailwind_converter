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
    setContent(codeToConvert);
  }, [codeToConvert]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setContent(event.target.value);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      setCodeToConvert(content);

      const codeLanguage = selectedMode === "ctt" ? "css" : "xml";
      const validationResult = await codeValidator(content, codeLanguage);

      if (!validationResult.isValid) {
        console.error("Invalid code: ", validationResult.errors);

        getToastError(
          `Invalid ${codeLanguage} code! Please check your code and try again.`
        );

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

  return (
    <form>
      <ListboxWrapper isLoading={loading} />
      <Textarea
        className='max-w-lg'
        label='Code'
        variant='bordered'
        placeholder='Write or paste your code here...'
        defaultValue={content}
        value={content}
        onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>}
      />
      <Button
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
    <div className='flex flex-wrap gap-4'>
      <Tabs
        size='md'
        color='secondary'
        isDisabled={isLoading}
        selectedKey={selectedMode}
        onSelectionChange={handleSelect as (key: React.Key) => unknown}>
        <Tab key='ctt' title='CSS to tailwind' />
        <Tab key='ttc' title='Tailwind to CSS' />
      </Tabs>
    </div>
  );
}
