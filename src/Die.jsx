import "./app.css"

export function Die ({ value, isHeld }) {
    const styles = {
        backgroundColor: isHeld ? "#59E391" : "white"
    }

    return (
        <button className="die" style={styles}>{value}</button>
    )
}