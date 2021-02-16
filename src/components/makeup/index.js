import Engine from './components/engine';
import { useState } from 'react';
import { cssBackdrop, cssCard, cssControl, cssLoading } from './style';
const skins = [
  null,
  {
    name: "Color 1",
    type: "color",
    background: "rgba(229,194,152, 0.3)",
  },
  {
    name: "Color 2",
    type: "color",
    background: "rgba(204,132,67, 0.3)",
  },
  {
    name: "Gradient 1",
    type: "gradient",
    background:
      ["rgba(255,255,255, 1)", "rgba(204,132,67, 0.3)"],
  },
];
const lips = [
  null,
  {
    name: "Color 1",
    type: "color",
    background: "rgba(225,0,0, 0.8)",
  },
  {
    name: "Color 2",
    type: "color",
    background: "rgba(0,0,225, 0.8)",
  },
  {
    name: "Gradient 1",
    type: "gradient",
    background:
      ["rgba(255,255,255, 1)", "rgba(0,0,225, 0.8)"],
  },
];
const shadow = [
  null,
  {
    name: "Color 1",
    type: "color",
    background: "rgba(0,0,225, 0.7)",
  },
  {
    name: "Gradient 1",
    type: "gradient",
    background:
      ["rgba(255,255,255, 1)", "rgba(0,0,225, 0.7)"],
  },
];
const Makeup = ({ onClose }) => {
  const [ready, setReady] = useState(false);
  const [started, setStarted] = useState(false);
  const [activeSkin, setActiveSkin] = useState(0);
  const [activeLip, setActiveLip] = useState(0);
  const [activeEyeShadow, setActiveEyeShadow] = useState(0);
  const handleReady = () => {
    setReady(true);
  };
  const handleStart = () => {
    setStarted(true);
  };
  const handleClose = () => {
    ready && onClose();
  };
  return (
    <>
      <div className={cssBackdrop} onClick={handleClose} />
      <div className={cssCard}>
        <Engine
          skin={skins[activeSkin]}
          lip={lips[activeLip]}
          eyeShadow={shadow[activeEyeShadow]}
          onReady={handleReady}
        />
        <div className={cssControl}>
          {skins.map((each, index) =>  (
            <button
              type="button"
              key={index}
              onClick={() => setActiveSkin(index)}
            >
              {each?.name || "nomakeup"}
            </button>
          ))}
          <br />
          {shadow.map((each, index) => (
            <button
              type="button"
              key={index}
              onClick={() => setActiveEyeShadow(index)}
            >
              {each?.name || "noShadow"}
            </button>
          ))}
          <br />
          {lips.map((each, index) => (
            <button
              type="button"
              key={index}
              onClick={() => setActiveLip(index)}
            >
              {each?.name || "noLipstick"}
            </button>
          ))}
        </div>
        <div className={cssLoading(started)}>
          <h3>Virtual TryOn</h3>
          <p>
            You can try-on lipstick, eyeshadow, and foundation virtually.
            Please allow your webcam access permission to try this feature.
          </p>
          {!ready ? (
            "LOADING..."
          ) : (
            <button type="button" onClick={handleStart}>
              GETTING STARTED
            </button>
          )}
        </div>
      </div>
    </>
  );
};
export default Makeup;