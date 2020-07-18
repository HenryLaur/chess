import React, { useEffect, useState } from "react";
import Chessboard from "chessboardjsx";
// @ts-ignore
import * as Chess from "chess.js";
import { sendWebsocketMessage, getSocket } from "../../websocket/Websocket";
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
  const gameType = useSelector((state: RootState) => state.game.gameType);
  const playerUuid = useSelector((state: RootState) => state.game.playerUuid);

  useEffect(() => {
    console.log(gameType)
    if (gameType === "HUMAN_VS_HUMAN") {
      const socket = getSocket(playerUuid);
      if (socket) {
        socket.onmessage = (event) => {
          const move = JSON.parse(event.data);
          if (move && move.fen && move.playerUuid) {
            if (move.playerUuid !== playerUuid) {
              setFen(move.fen);
              chess.load(move.fen)
            }
          }
        };
      }
    }

  }, [playerUuid, gameType, chess]);

  useEffect(() => {
    // @ts-ignore
    setChess(new Chess());
  }, []);

  useEffect(() => {
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
      const { sourceSquare, targetSquare } = getSquare(move);
      const chessMove = chess.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });
      if (!chessMove) return;
      setFen(chess.fen());
      AIVSAIGame();
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
    if (!move) return;
    setFen(chess.fen());
    handleNextMove();
  };

  const highlightSquare = (
    sourceSquare: Chess.Square,
    squaresToHighlight: Chess.Square[]
  ) => {

    const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce(
      (a, c) => {
        return {
          ...a,
          ...{
            [c]: {
              background: "radial-gradient(40px, #989898 36%, transparent 0%)",
              borderRadius: "50%",
            },
          },
        };
      },
      {}
    );

    setHighlightSquareStyle({ ...highlightSquareStyle, ...highlightStyles });
  };

  const onMouseOverSquare = (square: Chess.Square) => {
    let moves = chess.moves({
      square: square,
      verbose: true,
    });
    if (moves.length === 0) return;
    const squaresToHighlight = [];
    for (var i = 0; i < moves.length; i++) {
      squaresToHighlight.push(moves[i].to);
    }

    highlightSquare(square, squaresToHighlight);
  };
  const onMouseOutSquare = (square: Chess.Square) => {
    setHighlightSquareStyle({});
  };

  const startGame = () => {
    if ((playerColor === "black" && chess.turn() === "w" && gameType !== "HUMAN_VS_HUMAN") || gameType === "AI_VS_AI") {
      aiMove();
    }
  };

  const handleNextMove = () => {
    if (gameType === "HUMAN_VS_HUMAN") {
      sendWebsocketMessage({
        fen: chess.fen(),
        playerUuid
      });
    } else {
      aiMove()
    }
  }

  const AIVSAIGame = () => {
    if (gameType === "AI_VS_AI") {
      setTimeout(() => aiMove(), 1000)
    }
  }
  return (
    <div>
      <Chessboard
        allowDrag={() => playerColor?.charAt(0).toLocaleLowerCase() === chess?.turn()}
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
const getSquare = (move: any) => {
  const sourceSquare = Object.keys(move)[0].toLocaleLowerCase();
  const targetSquare = (Object.values(
    move
  )[0] as string).toLocaleLowerCase();
  return { sourceSquare, targetSquare };
}

