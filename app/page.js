export default function Home() {
  let breakLength = 5;
  let sessionLength = 25;
  return (
    <div className="grid">
      {/* here's a comment */}
      <div className="container">
        <h3 className="" id="break-label">Break Length</h3>
        <div className="sub-container">
          <button type="button" className="" id="break-decrement">⬇</button>
          <h3 className="">{breakLength}</h3>
          <button type="button" className="" id="break-increment">⬆</button>
        </div>
      </div>
      <div className="container">
        <h3 className="" id="session-label">Session Length</h3>
        <div className="sub-container">
          <button type="button" className="" id="session-decrement">⬇</button>
          <h3 className="">{sessionLength}</h3>
          <button type="button" className="" id="session-increment">⬆</button>
        </div>
      </div>
    </div>
  );
}
