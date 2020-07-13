import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import { Board } from "../components/board/Board";

const useStyles = makeStyles({});

export const MainPage = () => {
  return (
    <Box>
      <Board />
    </Box>
  );
};
