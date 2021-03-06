import React, { useState } from "react";
import { makeStyles, Typography, Grid, Button, Box } from "@material-ui/core";
import { Select } from "./Select";
import { useDispatch, useSelector } from "react-redux";
import { setGameType, setPlayerColor } from "../game/GameSlice";
import { getSocket } from "../../websocket/Websocket";
import { RootState } from "../../store/store";

const useStyles = makeStyles({
  vertical: {
    paddingTop: "15%",
    margin: "10px",
  },
  center: {
    justifyContent: "center",
  },
  vs: {
    paddingTop: "24px",
  },
  start: {
    paddingTop: "24px",
  },
});
export const Form = () => {
  const [black, setBlack] = useState<any>("");
  const [buttonName, setButtonName] = useState<any>("Start");

  const [white, setWhite] = useState<any>("");
  const playerUuid = useSelector((state: RootState) => state.game.playerUuid);

  const classes = useStyles();
  const dispatch = useDispatch();

  const getGameType = () => {
    if (white === "" || black === "") return undefined;
    if (
      (white === "HUMAN" && black === "AI") ||
      (white === "AI" && black === "HUMAN")
    ) {
      return "AI_VS_HUMAN";
    } else if (white === "AI" && black === "AI") {
      return "AI_VS_AI";
    } else {
      return "HUMAN_VS_HUMAN";
    }
  };
  // not called for human v human
  const getPlayerColor = () => {
    if (getGameType() === "AI_VS_HUMAN") {
      return white === "HUMAN" ? "white" : "black";
    } else {
      return undefined;
    }
  };

  const handleSubmit = () => {
    if (getGameType() !== "HUMAN_VS_HUMAN") {
      dispatch(setPlayerColor(getPlayerColor()));
      dispatch(setGameType(getGameType()));
    } else {
      const socket = getSocket(playerUuid);
      if (socket) {
        socket.onmessage = (event) => {
          const game = JSON.parse(event.data);
          console.log(game);
          if (game.player1 && game.player2) {
            if (game.player1.uuid === playerUuid) {
              dispatch(setPlayerColor(game.player1.color));
              dispatch(setGameType(getGameType()));
            } else {
              dispatch(setPlayerColor(game.player2.color));
              dispatch(setGameType(getGameType()));
            }
          }
        };
      }
    }
    setButtonName("Waiting...");
  };
  return (
    <Box className={classes.vertical}>
      <Typography variant="h1" component="span">
        CHESS
      </Typography>
      <Grid className={classes.center} container>
        <Grid item xs={12} sm={2}>
          <Select label="White" value={white} onChange={setWhite} />
        </Grid>
        <Grid item xs={12} sm={1} className={classes.vs}>
          <Typography variant="body2" component="span">
            VS
          </Typography>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Select label="Black" value={black} onChange={setBlack} />
        </Grid>
      </Grid>
      <Grid className={classes.center} container>
        <Grid item xs={12} sm={3} className={classes.start}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSubmit}
            fullWidth
          >
            {buttonName}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
