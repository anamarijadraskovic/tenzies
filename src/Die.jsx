import "./app.css";

const dotPatterns = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};

export function Die({ value, isHeld, holdDie }) {
  const styles = {
    backgroundColor: isHeld ? "#59E391" : "white",
  };

  return (
    <button
      type="button"
      className="die"
      style={styles}
      onClick={holdDie}
      aria-label={value}
    >
      <div className="dots">
        {Array.from({ length: 9 }, (_, idx) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: The list is static (9 fixed dots), never reordered, and idx is stable and unique within this map.
            key={idx}
            className={`dot ${dotPatterns[value].includes(idx) ? "filled" : ""}`}
          />
        ))}
      </div>
    </button>
  );
}
