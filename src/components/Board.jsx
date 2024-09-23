import React, { useState, useEffect } from 'react';
import Square from "./Square.jsx";
import styled from "styled-components";
import { RefreshCcw } from 'lucide-react';

const Button = styled.button`
    font-size: 5vh;
    height: 12vh;
    width: 12vh;
    padding-top: 1vh;
    margin: 2vh;
    background: #282c34;
    color: #61dafb;
    border-color: #61dafb;
    cursor: pointer;
    box-sizing: border-box;
`

const Board = () => {

    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isNextX, setisNextX] = useState(true);
    const [isWinner, setIsWinner] = useState(false);
    const [winner, setWinner] = useState(null);

    const checkWinner = (newSquares) => {
        const winnerCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let combination of winnerCombinations) {
            let [a, b, c] = combination;
            if (newSquares[a] && newSquares[a] === newSquares[b] && newSquares[b] === newSquares[c]) {
                return newSquares[a];
            }
        }
        return null;
    };

    const minimax = (newSquares, depth, isMaximizing) => {
        let winnerCheck = checkWinner(newSquares);
        if (winnerCheck === 'X') return -10 + depth;  // Игрок выигрывает
        if (winnerCheck === 'O') return 10 - depth;   // Компьютер выигрывает
        if (!newSquares.includes(null)) return 0;     // Ничья

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (newSquares[i] === null) {
                    newSquares[i] = 'O';  // Ход компьютера
                    let score = minimax(newSquares, depth + 1, false);
                    newSquares[i] = null;
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < 9; i++) {
                if (newSquares[i] === null) {
                    newSquares[i] = 'X';  // Ход игрока
                    let score = minimax(newSquares, depth + 1, true);
                    newSquares[i] = null;
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    };

    const bestMove = (newSquares) => {
        let bestScore = -Infinity;
        let move;
        for (let i = 0; i < 9; i++) {
            if (newSquares[i] === null) {
                newSquares[i] = 'O';  // Ход компьютера
                let score = minimax(newSquares, 0, false);
                newSquares[i] = null;
                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                }
            }
        }
        return move;
    };

    const handleClick = (i) => {
        if (squares[i] || isWinner) return;

        let newSquares = squares.slice();
        newSquares[i] = 'X';
        setSquares(newSquares);

        let winnerCheck = checkWinner(newSquares);
        if (winnerCheck) {
            setWinner(winnerCheck);
            setIsWinner(true);
        } else if (!newSquares.includes(null)) {
            setWinner('Draw');
            setIsWinner(true);
        } else {
            // Ход компьютера
            let move = bestMove(newSquares);
            if (move !== undefined) {
                newSquares[move] = 'O';
                setSquares(newSquares);
                winnerCheck = checkWinner(newSquares);
                if (winnerCheck) {
                    setWinner(winnerCheck);
                    setIsWinner(true);
                } else if (!newSquares.includes(null)) {
                    setWinner('Draw');
                    setIsWinner(true);
                }
            }
        }
    };

    const setReload = () => {
        window.location.reload();
    };

    // Корректный вывод победителя
    let info = "Next - " + (isNextX ? "X player" : "O player");
    if (isWinner) {
        info = winner === 'Draw' ? "It's a Draw!" : `Winner - ${winner}`;
    }

    return (
        <>
            <h1>{info}</h1>
            <div>
                {squares.map((square, index) => {
                    return (
                        <span key={index}>
                            <Square value={square} setSquaresValue={() => handleClick(index)} />
                            {(index === 2 || index === 5) ? <br /> : null}
                        </span>
                    );
                })}
            </div>

            <Button onClick={setReload}>
                <RefreshCcw size={55} />
            </Button>
        </>
    );
};

export default Board;
