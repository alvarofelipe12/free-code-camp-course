import styles from "./page.module.css";
export default function Home() {
  let breakLength = 5;
  let sessionLength = 25;
  let actualTime = Number(sessionLength);
  let chrono = () => {
    if (actualTime >=0) {
      actualTime-= 1
    }
  };
  return (
    <div className="grid">
      {/* here's a comment */}
      <div className="container">
        <h3 className="" id="break-label">Break Length</h3>
        <div className="sub-container">
          <button type="button" className="" id="break-decrement">⬇</button>
          <h3 className="" id="break-length">{breakLength}</h3>
          <button type="button" className="" id="break-increment">⬆</button>
        </div>
      </div>
      <div className="container">
        <h3 className="" id="session-label">Session Length</h3>
        <div className="sub-container">
          <button type="button" className="" id="session-decrement">⬇</button>
          <h3 className="" id="session-length">{sessionLength}</h3>
          <button type="button" className="" id="session-increment">⬆</button>
        </div>
      </div>
      <div className="timer">
        <div className="timer-wrap">
          <h3 className="" id="timer-label">Session</h3>
          <h2 className="" id="time-left">{actualTime}</h2>
        </div>
      </div>
      <div className="timer-controls">
        <button type="button" className="" id="start_stop">
          <i className={styles.icon}>⏯️</i>
        </button>
        <button type="button" className="" id="reset">
          <i className={styles.icon}>🔄</i>
        </button>
      </div>
    </div>
  );
}
