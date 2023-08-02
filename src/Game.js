import React, { useState } from "react";
import  solve  from "./Solve"; // Import the solve function from Solve.js

export default function Game() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [target, setTarget] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);

  const generateQuestion = () => {
    setNum1(Math.ceil(Math.random() * 10));
    setNum2(Math.ceil(Math.random() * 10));
    setTarget(Math.ceil(Math.random() * 10));
    setAnswer("");
  };

  const submit = (e) => {
    e.preventDefault();
    // Regular expression to check for a valid input format (e.g., "0+0" or "0-0")
    const validInputRegex = /^\d+\s*[-+]\s*\d+$/;
    
    // Check if the answer matches the valid input format
    const formValid = validInputRegex.test(answer);
    
    if (!formValid) {
      return;
    }
  
    // Extracting the numbers and operator from the input string
    const [n1, operator, n2] = answer.split(/\s*([-+])\s*/);
  
    // Check if the answer is correct by calling the solve function and checking if the user's input is in the set of solutions
    if (solve(+n1, +n2, +target).has(answer)) {
      setScore((score) => score + 1);
    }
    
    generateQuestion();
  };
  
  

  return (
    <div>
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
    </div>
  );
}
