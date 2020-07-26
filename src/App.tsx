import React from "react";
import "./App.css";
import { Chess } from "./screen/Chess";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { SelectScreen } from "./screen/SelectScreen";

function App() {
  const gameType = useSelector((state: RootState) => state.game.gameType);
  return (
    <div className="App">
      {gameType && <Chess />}
      {!gameType && <SelectScreen />}
    </div>
  );
}

export default App;
