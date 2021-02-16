import Engine from "./components/engine";
import { useState } from "react";
import { cssBackdrop, cssCard, cssControl, cssLoading } from "./style";

const image = [
  null,
  "https://samarthgulati.com/ar-face-filters/assets/cherial-mask.jpg",
  "https://samarthgulati.com/ar-face-filters/assets/cherial-woman-mask.jpg",
];

const Makeup = ({ onClose }) => {
  const [ready, setReady] = useState(false);
  const [started, setStarted] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

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
        <Engine image={image[activeImage]} onReady={handleReady} />
        <div className={cssControl}>
          {image.map((each, index) => {
            return (
              <button
                type="button"
                key={index}
                onClick={() => {
                  setActiveImage(index);
                }}
              >
                {each ? `image-${index}` : "nomakeup"}
              </button>
            );
          })}
        </div>
        <div className={cssLoading(started)}>
          <div>
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
      </div>
    </>
  );
};

export default Makeup;
