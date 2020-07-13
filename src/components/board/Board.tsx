import React, { useEffect, useState } from "react";
import Chessboard from "chessboardjsx";
// @ts-ignore
import * as Chess from "chess.js";
export const Board = () => {
  const [chess, setChess] = useState<any>(null);
  const [fen, setFen] = useState<string>(
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  );

  useEffect(() => {
    // @ts-ignore
    setChess(new Chess());
  }, [setChess]);

  const handleOnDrop = (
    sourceSquare: Chess.Square,
    targetSquare: Chess.Square
  ) => {
    const move = chess.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });
    console.log(chess.fen());
    if (move === null) return;
    setFen(chess.fen());
  };
  return (
    <div>
      <Chessboard
        onDrop={({ sourceSquare, targetSquare }) =>
          handleOnDrop(sourceSquare, targetSquare)
        }
        position={fen}
      />
    </div>
  );
};
