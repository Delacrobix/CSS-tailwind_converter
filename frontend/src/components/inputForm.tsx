import React from "react";
import { Button, Textarea } from "@nextui-org/react";
import { toast } from "sonner";
import UseRequests from "../hooks/useRequests";

const BACKEND_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export default function InputForm() {
  const [content, setContent] = React.useState<string>("");
  const { loading, error, data, sendRequest } = UseRequests<string>();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setContent(event.target.value);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      await sendRequest({
        method: "post",
        url: `${BACKEND_URL}/openai-api/css-to-tailwind`,
        data: { message: content },
        headers: {
          "Content-Type": "application/json",
          "api-key": API_KEY,
        },
      });

      console.log("Data: ", data);
    } catch (error) {
      console.error("Error on submit: ", error);
      toast.error("Something went wrong! Please try again.", {
        duration: 5000,
      });
    }
  }

  function handleButtonDisable() {
    return content.length === 0;
  }

  return (
    <form>
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
