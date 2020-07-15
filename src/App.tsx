import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Chess } from "./screen/Chess";
import { useSelector, Provider } from "react-redux";
import store, { RootState } from "./store/store";
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
