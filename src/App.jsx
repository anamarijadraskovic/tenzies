import {useState} from "react";
import {Die} from "./Die.jsx";
import "./app.css"

export default function App() {
    const [dice, setDice] = useState(generateAllNewDices())

    function generateAllNewDices() {
        return new Array(10)
            .fill(0) // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            .map(() => Math.ceil(Math.random() * 6))
    }

    const diceElements = dice.map(num => <Die value={num} />)

    return (
        <main>
            <div className="dice-container">
                {diceElements}
            </div>
        </main>
    )
}
