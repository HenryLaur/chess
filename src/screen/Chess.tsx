import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import { Game } from "../components/game/Game";

const useStyles = makeStyles({
  root: {
    background: "#cccccc",
  },
});

export const Chess = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Game />
    </Box>
  );
};
