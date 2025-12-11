import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import "./app.css";
import { nanoid } from "nanoid";
import { Die } from "./Die.jsx";

export default function App() {
  const [dice, setDice] = useState(() => generateAllNewDice()); // lazy initialization
  const mainButtonRef = useRef(null);

  const isGameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  useEffect(() => {
    if (isGameWon) {
      mainButtonRef.current.focus();
    }
  }, [isGameWon]);

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
    } else {
      setDice(generateAllNewDice());
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
      holdDie={() => handleHoldDie(dieObj.id)}
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
