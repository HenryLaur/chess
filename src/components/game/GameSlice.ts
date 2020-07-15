import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: initialState = {
  gameType: undefined,
  playerColor: undefined,
};
type GameType = undefined | "HUMAN_VS_HUMAN" | "AI_VS_HUMAN";
type PlayerColor = undefined | "black" | "white";

export interface initialState {
  gameType: GameType;
  playerColor: PlayerColor;
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
