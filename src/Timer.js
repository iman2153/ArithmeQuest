import React, { useEffect, useState } from "react";

function Timer({ max, onComplete }) {
  const [counter, setCounter] = useState(max);

  useEffect(() => {
    if (counter > 0) {
      const timerId = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      onComplete(); // Call the onComplete function when the timer reaches 0
    }
  }, [counter, onComplete]);

  return <span>{counter}</span>;
}

export default Timer;
