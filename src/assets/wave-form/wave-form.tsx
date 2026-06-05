import "./wave-form.css"
function Waveform() {
  const bars = [3, 5, 7, 5, 3];

  return (
    <div className="waveform">
      {bars.map((h, i) => (
        <div
          key={i}
          className="waveform-bar"
          style={{ height: `${h}px` }}
        />
      ))}
    </div>
  );
}

export default Waveform;