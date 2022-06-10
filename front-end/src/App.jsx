import { useEffect, useState } from "react";
import {
  Center,
  Slider,
  Stack,
  TextInput,
  Title,
  InputWrapper,
  Button,
} from "@mantine/core";

import Stuff from "./components/stuff";
import { config } from "./config";

function App() {
  const [stuffs, setStuffs] = useState([]);
  const [stuff, setStuff] = useState({ name: "", weight: 0 });

  useEffect(() => {
    fetchStuffs();
  }, []);

  const fetchStuffs = async () => {
    const response = await fetch(`${config.backEndApi}/stuffs`);
    const stuffs = await response.json();

    setStuffs(stuffs);
  };

  const createStuff = async ({ name, weight }) => {
    await fetch(`${config.backEndApi}/stuffs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        weight,
      }),
    });
  };

  const deleteStuffs = async () => {
    await fetch(`${config.backEndApi}/stuffs`, {
      method: "DELETE",
    });
  };

  const onNameChange = (event) => {
    setStuff((state) => ({ ...state, name: event.target.value }));
  };

  const onWeightChange = (value) => {
    setStuff((state) => ({ ...state, weight: value }));
  };

  const onCreate = async () => {
    setStuff({ name: "", weight: 0 });

    await createStuff({ name: stuff.name, weight: stuff.weight });
    await fetchStuffs();
  };

  const onClear = async () => {
    await deleteStuffs();
    await fetchStuffs();
  };

  return (
    <Center style={{ height: "80vh" }}>
      <Stack style={{ width: "270px" }}>
        <Title align={"center"} order={1}>
          Stuffs
        </Title>
        <TextInput
          label={"Name"}
          placeholder={"name"}
          value={stuff.name}
          onChange={onNameChange}
        />
        <InputWrapper label={"Weight"}>
          <Slider value={stuff.weight} onChange={onWeightChange} />
        </InputWrapper>
        <Button onClick={onCreate}>Create</Button>
        <Stack>
          {stuffs.map((stuff) => (
            <Stuff key={stuff._id} name={stuff.name} weight={stuff.weight} />
          ))}
        </Stack>
        <Button onClick={onClear} color={"red"}>
          Clear
        </Button>
      </Stack>
    </Center>
  );
}

export default App;
