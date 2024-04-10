import React, { Key } from "react";
import { Button, Textarea, Tab, Tabs } from "@nextui-org/react";
import { toast } from "sonner";
import UseRequests from "../hooks/useRequests";
import { useGlobalActions } from "../context/globalContext";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

//TODO: It's posible that the request hook is send two times the request

export default function InputForm() {
  const [content, setContent] = React.useState<string>("");
  const [convertMode, setConvertMode] = React.useState<string>("ctt");
  const {
    setCodeToConvert,
    setConvertedCode,
    setSelectedMode,
    setIsSubmitted,
  } = useGlobalActions();
  const { loading, error, data, sendRequest } = UseRequests<string>();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (error) {
      toast.error("Something went wrong! Please try again.", {
        duration: 5000,
        style: {
          color: "red",
          borderRadius: "0.5rem",
        },
      });

      console.error("Error: ", error);

      return;
    }

    if (data) {
      try {
        const codeJson = JSON.parse(data.aiMessage);
        const code = codeJson?.code;

        setConvertedCode(code);
        setIsSubmitted(true);

        navigate("/result");
      } catch (e) {
        console.error("Error converting to json: ", e);
        toast.error("Something went wrong! Please try again.", {
          duration: 5000,
          style: {
            color: "red",
            borderRadius: "0.5rem",
          },
        });
      }
    }
  }, [data, error]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setContent(event.target.value);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();

      setSelectedMode(convertMode);
      setCodeToConvert(content);

      const endpoint =
        convertMode === "ctt" ? "css-to-tailwind" : "tailwind-to-css";

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

  function handleSelect(value: string) {
    setConvertMode(value);
  }

  function handleButtonDisable() {
    return content.length === 0;
  }

  return (
    <form>
      <ListboxWrapper convertMode={convertMode} handleSelect={handleSelect} />
      <Textarea
        className='max-w-lg'
        label='Code'
        variant='bordered'
        placeholder='Write or paste your code here...'
        defaultValue={content}
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
        Submit
      </Button>
    </form>
  );
}

interface ListboxWrapperProps {
  convertMode: string;
  handleSelect: (value: string) => void;
}

function ListboxWrapper(props: Readonly<ListboxWrapperProps>) {
  const { convertMode, handleSelect } = props;

  return (
    <div className='flex flex-wrap gap-4'>
      <Tabs
        size='md'
        color='secondary'
        selectedKey={convertMode}
        onSelectionChange={handleSelect as (key: Key) => unknown}>
        <Tab key='ctt' title='CSS to tailwind' />
        <Tab key='ttc' title='Tailwind to CSS' />
      </Tabs>
    </div>
  );
}
