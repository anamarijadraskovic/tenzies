import "./app.css";

export function Die({ value, isHeld, holdDie }) {
  const styles = {
    backgroundColor: isHeld ? "#59E391" : "white",
  };

  return (
    <button type="button" className="die" style={styles} onClick={holdDie}>
      {value}
    </button>
  );
}
