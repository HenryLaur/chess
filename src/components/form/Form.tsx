import React, { useState } from "react";
import {
  MenuItem,
  makeStyles,
  InputLabel,
  FormControl,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";
import { Select } from "./Select";
import { useDispatch } from "react-redux";
import { setGameType, setPlayerColor } from "../game/GameSlice";

const useStyles = makeStyles({
  select: {
    width: "150px",
  },
});
export const Form = () => {
  const [black, setBlack] = useState<any>("");
  const [white, setWhite] = useState<any>("");
  const classes = useStyles();
  const dispatch = useDispatch();

  const getGameType = () => {
    if (white === "" || black === "") return undefined;
    if (
      (white === "HUMAN" && black === "AI") ||
      (white === "AI" && black === "HUMAN")
    ) {
      return "AI_VS_HUMAN";
    } else {
      return "HUMAN_VS_HUMAN";
    }
  };

  const getPlayerColor = () => {
    if (getGameType() === "AI_VS_HUMAN") {
      return white === "HUMAN" ? "white" : "black";
    } else if (getGameType() === "HUMAN_VS_HUMAN") {
      return "white";
    } else {
      return undefined;
    }
  };

  const handleSubmit = () => {
    dispatch(setPlayerColor(getPlayerColor()));
    dispatch(setGameType(getGameType()));
  };
  return (
    <Grid container>
      <Grid item xs={12} sm={2}>
        <Select label="White" value={white} onChange={setWhite} />
      </Grid>
      <Grid item xs={12} sm={1}>
        <Typography variant="body2" component="span">
          VS
        </Typography>
      </Grid>
      <Grid item xs={12} sm={2}>
        <Select label="Black" value={black} onChange={setBlack} />
      </Grid>
      <Grid item xs={12} sm={7} />
      <Grid item xs={12} sm={5}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Start
        </Button>
      </Grid>
    </Grid>
  );
};
