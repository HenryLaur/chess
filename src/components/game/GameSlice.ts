import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const initialState: initialState = {
  gameType: undefined,
  playerColor: undefined,
  playerUuid: uuid(),
  loading: false,
};
type GameType = undefined | "HUMAN_VS_HUMAN" | "AI_VS_HUMAN" |"AI_VS_AI";
type PlayerColor = undefined | "black" | "white";

export interface initialState {
  gameType: GameType;
  playerColor: PlayerColor;
  playerUuid: string;
  loading: boolean;
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
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setGameType, setPlayerColor, setLoading } = gameSlice.actions;

export default gameSlice.reducer;
