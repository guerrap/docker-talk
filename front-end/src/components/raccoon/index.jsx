import { Box, Text } from "@mantine/core";
import React from "react";
import PropTypes from "prop-types";

import "./style.css";

const Racoon = ({ name, weight }) => (
  <Box className="box">
    <Text size={"md"}>
      Raccoon {name} weights {weight} kg
    </Text>
  </Box>
);

Racoon.propTypes = {
  name: PropTypes.string,
  weight: PropTypes.number,
};

export default Racoon;
