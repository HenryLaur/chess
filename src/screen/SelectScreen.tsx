import React, { useState, useEffect } from "react";
import { Box, makeStyles } from "@material-ui/core";
import { Board } from "../components/game/Game";
import { getSocket } from "../websocket/Websocket";
import { v4 as uuid } from "uuid";
import { Form } from "../components/form/Form";

const useStyles = makeStyles({});

export const SelectScreen = () => {
  return (
    <Box>
      <Form />
    </Box>
  );
};
