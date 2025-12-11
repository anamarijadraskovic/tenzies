import {useState} from "react";
import {Die} from "./Die.jsx";
import "./app.css"
import {nanoid} from "nanoid";

export default function App() {
    const [dice, setDice] = useState(generateAllNewDices())

    function generateAllNewDices() {
        return new Array(10)
            .fill(0) // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            .map(() => ({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid()
            }))
    }

    function handleRollDice() {
        setDice(oldDice => oldDice.map(die =>
            die.isHeld ?
                die :
                { ...die, value: Math.ceil(Math.random() * 6) }
        ))
    }

    function handleHoldDie(id) {
        setDice(oldDice => oldDice.map(die => die.id === id ? {...die, isHeld: !die.isHeld} : die))
    }

    const diceElements = dice.map(dieObj => (
        <Die
            key={dieObj.id}
            value={dieObj.value}
            isHeld={dieObj.isHeld}
            holdDie={() => handleHoldDie(dieObj.id)}
        />)
    )
    return (
        <main>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="roll-dice" onClick={handleRollDice}>Roll</button>
        </main>
    )
}
