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
                isHeld: true,
                id: nanoid()
            }))
    }

    const diceElements = dice.map(dieObj => (
        <Die
            key={dieObj.id}
            value={dieObj.value}
            isHeld={dieObj.isHeld}
        />)
    )
    return (
        <main>
            <div className="dice-container">
                {diceElements}
            </div>
        </main>
    )
}
