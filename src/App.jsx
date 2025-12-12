import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import "./app.css";
import { nanoid } from "nanoid";
import { Die } from "./Die.jsx";

export default function App() {
  const [dice, setDice] = useState(() => generateAllNewDice()); // lazy initialization
  const [rolls, setRolls] = useState(0);
  const [time, setTime] = useState(0);
  const [bestTime, setBestTime] = useState(
    () => parseInt(localStorage.getItem("bestTime"), 10) || 0, // lazy initialization
  );

  const mainButtonRef = useRef(null);

  const isGameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  const timerActive = !isGameWon && rolls >= 0;

  useEffect(() => {
    if (!isGameWon) return;

    mainButtonRef.current.focus();

    if (bestTime === 0 || time < bestTime) {
      setBestTime(time);
      localStorage.setItem("bestTime", time.toString());
    }
  }, [isGameWon, time, bestTime]);

  useEffect(() => {
    if (!timerActive) return;

    const interval = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [timerActive]);

  function generateAllNewDice() {
    return new Array(10)
      .fill(0) // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      .map(() => ({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      }));
  }

  function handleRollDice() {
    if (!isGameWon) {
      setDice((oldDice) =>
        oldDice.map((die) =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) },
        ),
      );
      setRolls((prev) => prev + 1);
    } else {
      setDice(generateAllNewDice());
      setRolls(0);
      setTime(0);
    }
  }

  function handleHoldDie(id) {
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die,
      ),
    );
  }

  const diceElements = dice.map((dieObj) => (
    <Die
      key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      holdDie={() => handleHoldDie(dieObj.id)} // closure
    />
  ));

  return (
    <main>
      {isGameWon && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <div aria-live="polite" className="sr-only">
        {isGameWon && (
          <p>Congratulations! You won! Press "New Game" to start again.</p>
        )}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <section className="stats">
        <span>Rolls: {rolls}</span>
        <span>Time: {time}s</span>
        <span>Best Time: {bestTime ? `${bestTime}s` : "-"}</span>
      </section>
      <div className="dice-container">{diceElements}</div>
      <button
        type="button"
        ref={mainButtonRef}
        className="roll-dice"
        onClick={handleRollDice}
      >
        {isGameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
