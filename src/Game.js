import React, { useState } from "react";
import solve from "./Solve"; // Import the solve function from Solve.js
import Timer from "./Timer";

export default function Game() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [target, setTarget] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [startGame, setStartGame] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const generateQuestion = () => {
    setNum1(Math.ceil(Math.random() * 10));
    setNum2(Math.ceil(Math.random() * 10));
    setTarget(Math.ceil(Math.random() * 10));
    setAnswer("");
    setStartGame(false);
    setGameOver(false);
  };

  const submit = (e) => {
    e.preventDefault();
    // Regular expression to check for a valid input format (e.g., "0+0" or "0-0")
    const validInputRegex = /^\d+\s*[-+]\s*\d+/;

    // Check if the answer matches the valid input format
    const formValid = validInputRegex.test(answer);

    if (!formValid) {
      return;
    }

    // Extracting the numbers and operator from the input string
    const [n1, operator, n2] = answer.split(/\s*([-+])\s*/);
    const solutions = solve(+n1, +n2, +target);

    // Check if the answer is correct by calling the solve function and checking if the user's input is in the set of solutions
    if (solutions.has(answer)) {
      setScore((score) => score + 1);
    }

    generateQuestion();
  };

  // Function to start the game and timer
  const startGameHandler = () => {
    generateQuestion();
    setStartGame(true);
  };

  // Function to handle timer completion
  const handleTimerComplete = () => {
    setGameOver(true);
  };

  return (
    <div>
      {startGame && !gameOver && (
        <>
          <Timer max={60} onComplete={handleTimerComplete} />
          <form onSubmit={submit}>
            <div>
              <label>
                {num1} , {num2}, {target}
              </label>
              <input
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                type="text"
              />
            </div>
            <button type="submit">check</button>
          </form>
          <button type="button" onClick={generateQuestion}>
            SKIP
          </button>
          <p>score: {score}</p>
        </>
      )}
      {!startGame && (
        <button type="button" onClick={startGameHandler}>
          START GAME
        </button>
      )}
      {gameOver && <p>Game Over! Final score: {score}</p>}
    </div>
  );
}
