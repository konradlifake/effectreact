import { useEffect, useRef, useState } from "react";

function App() {
  const [time, setTime] = useState(new Date());
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <h1>{time.toLocaleTimeString()}</h1>
  );
}

export default App;