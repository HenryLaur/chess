import React, { useEffect, useState } from "react";
import Chessboard from "chessboardjsx";
// @ts-ignore
import * as Chess from "chess.js";
import { sendWebsocketMessage } from "../../websocket/Websocket";
// @ts-ignore
import * as AI from "js-chess-engine";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
export const BoardContent = (children: any) => {};

export const Board = () => {
  const [chess, setChess] = useState<any>(null);
  const [highlightSquareStyle, setHighlightSquareStyle] = useState<any>({});
  const [fen, setFen] = useState<string>(
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  );
  const playerColor = useSelector((state: RootState) => state.game.playerColor);
  const [history, setHistory] = useState([]);
  useEffect(() => {
    // @ts-ignore
    setChess(new Chess());
  }, [setChess]);

  useEffect(() => {
    // @ts-ignore

    const interval = setInterval(() => {
      if (chess) {
        startGame();
        clearInterval(interval);
      }
    }, 100);
  }, [chess]);

  const aiMove = () => {
    setTimeout(() => {
      const move = AI.aiMove(chess.fen(), 1);
      const sourceSquare = Object.keys(move)[0].toLocaleLowerCase();
      const targetSquare = (Object.values(
        move
      )[0] as string).toLocaleLowerCase();
      const chessMove = chess.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });
      if (!chessMove) return;
      setFen(chess.fen());
    }, 100);
  };

  const handleOnDrop = (
    sourceSquare: Chess.Square,
    targetSquare: Chess.Square
  ) => {
    const move = chess.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });
    console.log(sourceSquare);
    if (!move) return;
    sendWebsocketMessage({
      move: chess.fen(),
    });
    setFen(chess.fen());
    aiMove();
    setHistory(chess.history({ verbose: true }));
  };

  const highlightSquare = (
    sourceSquare: Chess.Square,
    squaresToHighlight: Chess.Square[]
  ) => {
    console.log({
      sourceSquare,
      squaresToHighlight,
    });
    const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce(
      (a, c) => {
        console.log({ a, c });
        return {
          ...a,
          ...{
            [c]: {
              background: "radial-gradient(40px, #989898 36%, transparent 0%)",
              borderRadius: "50%",
            },
          },
          ...squareStyling({
            history: [],
            pieceSquare: sourceSquare,
          }),
        };
      },
      {}
    );

    setHighlightSquareStyle({ ...highlightSquareStyle, ...highlightStyles });
  };

  const onMouseOverSquare = (square: Chess.Square) => {
    // get list of possible moves for this square
    let moves = chess.moves({
      square: square,
      verbose: true,
    });

    // exit if there are no moves available for this square
    if (moves.length === 0) return;

    let squaresToHighlight = [];
    for (var i = 0; i < moves.length; i++) {
      squaresToHighlight.push(moves[i].to);
    }

    highlightSquare(square, squaresToHighlight);
  };
  const onMouseOutSquare = (square: Chess.Square) => {
    setHighlightSquareStyle({});
  };

  const startGame = () => {
    if (playerColor === "black" && chess.turn() === "w") {
      aiMove();
    }
  };
  console.log("RENDER");
  return (
    <div>
      <Chessboard
        orientation={playerColor}
        onMouseOutSquare={onMouseOutSquare}
        squareStyles={highlightSquareStyle}
        onMouseOverSquare={onMouseOverSquare}
        onDrop={({ sourceSquare, targetSquare }) =>
          handleOnDrop(sourceSquare, targetSquare)
        }
        transitionDuration={300}
        position={fen}
      />
    </div>
  );
};

const squareStyling = ({
  pieceSquare,
  history,
}: {
  pieceSquare: any;
  history: any;
}) => {
  const sourceSquare = history.length && history[history.length - 1].from;
  const targetSquare = history.length && history[history.length - 1].to;

  return {
    [pieceSquare]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
    ...(history.length && {
      [sourceSquare]: {
        backgroundColor: "rgba(255, 255, 0, 0.4)",
      },
    }),
    ...(history.length && {
      [targetSquare]: {
        backgroundColor: "rgba(255, 255, 0, 0.4)",
      },
    }),
  };
};
