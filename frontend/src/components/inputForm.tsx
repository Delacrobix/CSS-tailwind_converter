import React, { Key } from "react";
import { Button, Textarea, Tab, Tabs, code } from "@nextui-org/react";
import UseRequests from "../hooks/useRequests";
import { useGlobalActions, useGlobalState } from "../context/globalContext";
import { useNavigate } from "react-router-dom";
import { DataFromAPI } from "../utils/types";
import { getToastError } from "../utils/toasts";

const BACKEND_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

//FIXME: It's posible that the request hook is send two times the request
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
      <ListboxWrapper />
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

// #region ListboxWrapper
function ListboxWrapper() {
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
        selectedKey={selectedMode}
        onSelectionChange={handleSelect as (key: Key) => unknown}>
        <Tab key='ctt' title='CSS to tailwind' />
        <Tab key='ttc' title='Tailwind to CSS' />
      </Tabs>
    </div>
  );
}
