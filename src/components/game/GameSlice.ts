import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const initialState: initialState = {
  gameType: undefined,
  playerColor: undefined,
  playerUuid: uuid(),
};
type GameType = undefined | "HUMAN_VS_HUMAN" | "AI_VS_HUMAN" | "AI_VS_AI";
type PlayerColor = undefined | "black" | "white";

export interface initialState {
  gameType: GameType;
  playerColor: PlayerColor;
  playerUuid: string;
}

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameType(state, action: PayloadAction<GameType>) {
      state.gameType = action.payload;
    },
    setPlayerColor(state, action: PayloadAction<PlayerColor>) {
      state.playerColor = action.payload;
    },
  },
});

export const { setGameType, setPlayerColor } = gameSlice.actions;

export default gameSlice.reducer;
