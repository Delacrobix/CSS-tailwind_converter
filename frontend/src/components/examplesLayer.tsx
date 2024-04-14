import { Button } from "@nextui-org/react";
import { example_1, example_2, example_3 } from "../utils/examples";
import { useGlobalActions } from "../context/globalContext";

export default function ExamplesLayer() {
  const { setCodeToConvert } = useGlobalActions();

  function handleSelect(key: number) {
    let example = null;
    switch (key) {
      case 1:
        example = example_1;
        break;
      case 2:
        example = example_2;
        break;
      case 3:
        example = example_3;
        break;
    }

    setCodeToConvert(example as string);
  }

  return (
    <div className='flex gap-4'>
      <Button onClick={() => handleSelect(1)} color='secondary' variant='ghost'>
        Example 1
      </Button>
      <Button onClick={() => handleSelect(2)} color='secondary' variant='ghost'>
        Example 2
      </Button>
      <Button onClick={() => handleSelect(3)} color='secondary' variant='ghost'>
        Example 3
      </Button>
    </div>
  );
}
