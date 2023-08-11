import React, { useEffect, useState } from "react";

function Timer({ max, score }) {
  const [counter, setCounter] = useState(max);

  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    }
  }, [counter]);

  useEffect(() => {
    if (counter === 0) {
      console.log("Game Over! Final score:", score);
      // You can add more actions here when the timer reaches 0
    }
  }, [counter, score]);

  return (
    <span>
      {counter}
      {counter === 0 && <p>Game Over! Final score: {score}</p>}
    </span>
  );
  
}

export default Timer;
