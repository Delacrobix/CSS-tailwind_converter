import React from "react";
import { Textarea } from "@nextui-org/react";

export default function TextBox() {
  const [content, setContent] = React.useState<string>("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setContent(event.target.value);
  }

  return (
    <Textarea
      className='max-w-lg'
      label='Code'
      variant='bordered'
      placeholder='Write or paste your code here...'
      defaultValue={content}
      onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>}
    />
  );
}
