import { Box, Text } from "@mantine/core";
import React from "react";
import PropTypes from "prop-types";

import "./style.css";

const Stuff = ({ name, weight }) => (
  <Box className="box">
    <Text size={"md"}>
      Stuff{" "}
      <Text weight={700} component={"span"}>
        {name}
      </Text>{" "}
      weights{" "}
      <Text weight={700} component={"span"}>
        {weight}
      </Text>
      kg
    </Text>
  </Box>
);

Stuff.propTypes = {
  name: PropTypes.string,
  weight: PropTypes.number,
};

export default Stuff;
