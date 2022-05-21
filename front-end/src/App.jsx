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

import Racoon from "./components/raccoon";
import { config } from "./config";

function App() {
  const [raccoons, setRaccoons] = useState([]);
  const [raccoon, setRaccoon] = useState({ name: "", weight: 0 });

  useEffect(() => {
    fetchRaccoons();
  }, []);

  const fetchRaccoons = async () => {
    const response = await fetch(`${config.backEndApi}/raccoons`);
    const raccoons = await response.json();

    setRaccoons(raccoons);
  };

  const createRaccoon = async ({ name, weight }) => {
    await fetch(`${config.backEndApi}/raccoons`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        weight,
      }),
    });
  };

  const deleteRaccoons = async () => {
    await fetch(`${config.backEndApi}/raccoons`, {
      method: "DELETE",
    });
  };

  const onNameChange = (event) => {
    setRaccoon((state) => ({ ...state, name: event.target.value }));
  };

  const onWeightChange = (value) => {
    setRaccoon((state) => ({ ...state, weight: value }));
  };

  const onCreate = async () => {
    setRaccoon({ name: "", weight: 0 });

    await createRaccoon({ name: raccoon.name, weight: raccoon.weight });
    await fetchRaccoons();
  };

  const onClear = async () => {
    await deleteRaccoons();
    await fetchRaccoons();
  };

  return (
    <Center style={{ height: "80vh" }}>
      <Stack style={{ width: "270px" }}>
        <Title align={"center"} order={1}>
          Raccoons
        </Title>
        <TextInput
          label={"Name"}
          placeholder={"name"}
          value={raccoon.name}
          onChange={onNameChange}
        />
        <InputWrapper label={"Weight"}>
          <Slider value={raccoon.weight} onChange={onWeightChange} />
        </InputWrapper>
        <Button onClick={onCreate}>Create</Button>
        <Stack>
          {raccoons.map((raccoon) => (
            <Racoon
              key={raccoon._id}
              name={raccoon.name}
              weight={raccoon.weight}
            />
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
