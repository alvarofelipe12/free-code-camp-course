"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
export default function Home() {
  const SESSION_TIME = 25;
  const BREAK_TIME = 5;
  const ZERO = 0;
  const [breakLength, setBreakLength] = useState(BREAK_TIME);
  const [minutesSessionLength, setMinutesSessionLength] = useState(SESSION_TIME);
  const [secondsSessionLength, setSecondsSessionLength] = useState(ZERO);
  const [actualTime, setActualTime] = useState('');
  useEffect(() => {
    reset();
  }, []);
  const reset = () => {
    setBreakLength(BREAK_TIME);
    setMinutesSessionLength(SESSION_TIME);
    setSecondsSessionLength(ZERO);
    const localOptions = { minimumIntegerDigits: 2, useGrouping: false };
    const minutesSessionLengthString = SESSION_TIME.toLocaleString('en-US', localOptions);
    const secondsSessionLengthString = ZERO.toLocaleString('en-US', localOptions);
    setActualTime(`${minutesSessionLengthString}:${secondsSessionLengthString}`);
  };
  const breakDecrement = () => {
    if (breakLength > 0) {
      setBreakLength(breakLength - 1);
    }
  };
  const breakIncrement = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };
  const sessionDecrement = () => {
    if (minutesSessionLength > 0) {
      setMinutesSessionLength(minutesSessionLength - 1);
    }
  };
  const sessionIncrement = () => {
    if (minutesSessionLength < 60) {
      setMinutesSessionLength(minutesSessionLength + 1);
    }
  };
  const chrono = () => {
    if (secondsSessionLength > 0 && minutesSessionLength >= 0) {
      // decrease seconds
      setSecondsSessionLength(secondsSessionLength - 1);
    } else if (secondsSessionLength === 0 && minutesSessionLength > 0) {
      // decrease minutes when seconds reach zero and start over
      setMinutesSessionLength(minutesSessionLength - 1);
      setSecondsSessionLength(59);
    } else {
      // finished
    }
  };
  return (
    <div className="grid">
      {/* here's a comment */}
      <div className="container">
        <h3 className="" id="break-label">Break Length</h3>
        <div className="sub-container">
          <button type="button" className="" id="break-decrement" onClick={breakDecrement}>⬇</button>
          <h3 className="" id="break-length">{breakLength}</h3>
          <button type="button" className="" id="break-increment" onClick={breakIncrement}>⬆</button>
        </div>
      </div>
      <div className="container">
        <h3 className="" id="session-label">Session Length</h3>
        <div className="sub-container">
          <button type="button" className="" id="session-decrement" onClick={sessionDecrement}>⬇</button>
          <h3 className="" id="session-length">{minutesSessionLength}</h3>
          <button type="button" className="" id="session-increment" onClick={sessionIncrement}>⬆</button>
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
        <button type="button" className="" id="reset" onClick={reset}>
          <i className={styles.icon}>🔄</i>
        </button>
      </div>
    </div>
  );
}
