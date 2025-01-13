"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
export default function Home() {
  const SESSION_TIME = 25;
  const BREAK_TIME = 5;
  const ZERO = 0;

  const isSessionTime = useRef(true);
  const idInterval = useRef(undefined);
  const minutesRef = useRef(SESSION_TIME); // Ref for minutes
  const secondsRef = useRef(ZERO); // Ref for seconds

  const [timeRunning, setTimeRunning] = useState(false);
  const [breakLength, setBreakLength] = useState(BREAK_TIME);
  const [minutesSessionLength, setMinutesSessionLength] = useState(SESSION_TIME);
  const [secondsSessionLength, setSecondsSessionLength] = useState(ZERO);
  const [actualTime, setActualTime] = useState("");

  useEffect(() => {
    reset();
    const localOptions = { minimumIntegerDigits: 2, useGrouping: false };
    setActualTime(
      `${SESSION_TIME.toLocaleString(
        "en-US",
        localOptions
      )}:${ZERO.toLocaleString("en-US", localOptions)}`
    );
  }, []);

  useEffect(() => {
    const localOptions = { minimumIntegerDigits: 2, useGrouping: false };
    setActualTime(
      `${minutesRef.current.toLocaleString(
        "en-US",
        localOptions
      )}:${secondsRef.current.toLocaleString("en-US", localOptions)}`
    );
  }, [minutesRef.current, secondsRef.current]);

  const reset = () => {
    stopTimer();
    setBreakLength(BREAK_TIME);
    minutesRef.current = SESSION_TIME;
    secondsRef.current = ZERO;
    setMinutesSessionLength(minutesRef.current);
    setSecondsSessionLength(secondsRef.current);
    isSessionTime.current = true;
    const beep = document.getElementById("beep");
    beep.pause();
    beep.currentTime = 0; // Rewind the audio
    setActualTime(
      `${SESSION_TIME.toLocaleString(
        "en-US",
        { minimumIntegerDigits: 2, useGrouping: false }
      )}:${ZERO.toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false })}`
    );
  };

  const breakDecrement = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  const breakIncrement = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const sessionDecrement = () => {
    if (minutesRef.current > 1) {
      minutesRef.current -= 1;
      setMinutesSessionLength(minutesRef.current);
      setActualTime(
        `${minutesRef.current.toLocaleString(
          "en-US",
          { minimumIntegerDigits: 2, useGrouping: false }
        )}:${secondsRef.current.toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false })}`
      );
    }
  };

  const sessionIncrement = () => {
    if (minutesRef.current < 60) {
      minutesRef.current += 1;
      setMinutesSessionLength(minutesRef.current);
      setActualTime(
        `${minutesRef.current.toLocaleString(
          "en-US",
          { minimumIntegerDigits: 2, useGrouping: false }
        )}:${secondsRef.current.toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false })}`
      );
    }
  };

  const stopTimer = () => {
    clearInterval(idInterval.current); // Stop the timer
    idInterval.current = undefined;
    setTimeRunning(false);
  };

  const chrono = () => {
    if (timeRunning) {
      stopTimer();
    } else {
      setTimeRunning(true); // Start the timer
      idInterval.current = setInterval(() => {
        if (minutesRef.current === 0 && secondsRef.current === 0) {
          document.getElementById("beep").play(); // Play the beep sound
          // Timer finished
          if (isSessionTime.current) {
            isSessionTime.current = false;
            minutesRef.current = breakLength;
          } else {
            isSessionTime.current = true;
            minutesRef.current = minutesSessionLength;
          }
        } else if (secondsRef.current === 0) {
          // Decrement minutes and reset seconds
          minutesRef.current -= 1;
          secondsRef.current = 59;
        } else {
          // Decrement seconds
          secondsRef.current -= 1;
        }

        // Update display after every tick
        setActualTime(
          `${minutesRef.current.toLocaleString(
            "en-US",
            { minimumIntegerDigits: 2, useGrouping: false }
          )}:${secondsRef.current.toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false })}`
        );
      }, 1000);
    }
  };

  return (
    <div className="grid">
      <div className="container">
        <div>
          <h3 className="" id="break-label">
            Break Length
          </h3>
          <div className="sub-container">
            <button
              type="button"
              className=""
              id="break-decrement"
              onClick={breakDecrement}
            >
              ⬇
            </button>
            <h3 className="" id="break-length">
              {breakLength}
            </h3>
            <button
              type="button"
              className=""
              id="break-increment"
              onClick={breakIncrement}
            >
              ⬆
            </button>
          </div>
        </div>
        <div>
          <h3 className="" id="session-label">
            Session Length
          </h3>
          <div className="sub-container">
            <button
              type="button"
              className=""
              id="session-decrement"
              onClick={sessionDecrement}
            >
              ⬇
            </button>
            <h3 className="" id="session-length">
              {minutesSessionLength}
            </h3>
            <button
              type="button"
              className=""
              id="session-increment"
              onClick={sessionIncrement}
            >
              ⬆
            </button>
          </div>
        </div>
      </div>
      <div className="timer">
        <div className="timer-wrap">
          <h3 className="" id="timer-label">
            {isSessionTime.current ? "Session" : "Break"}
          </h3>
          <h2 className="" id="time-left">
            {actualTime}
          </h2>
          <audio preload="auto" id="beep" src="https://cdn.uppbeat.io/audio-files/57ef60eab5fd4218838423222dc07d99/858c4041b256fedec3d492133d5d181f/05d4496a5bf290d2c550895c54469249/STREAMING-timer-countdown-3-2-1-fascinatedsound-1-00-03.mp3"></audio>
        </div>
      </div>
      <div className="timer-controls">
        <button type="button" className="" id="start_stop" onClick={chrono}>
          <i className={"icon"}>⏯️</i>
        </button>
        <button type="button" className="" id="reset" onClick={reset}>
          <i className={"icon"}>🔄</i>
        </button>
      </div>
    </div>
  );
};