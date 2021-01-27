import Engine from './components/engine';
import { useState } from 'react';
import { cssBackdrop, cssCard, cssControl, cssLoading } from './style';

const skins = [
  null,
  'rgba(229,194,152, 0.3)',
  'rgba(204,132,67, 0.3)',
]

const lips = [
  null,
  'rgba(225,0,0, 0.8)',
  'rgba(0,0,225, 0.8)',
]

const shadow = [
  null,
  'rgba(0,0,225, 0.7)',
]


const Makeup = ({onClose}) => {
  const [ ready, setReady ] = useState(false);
  const [ started, setStarted ] = useState(false);
  const [activeSkin, setActiveSkin] = useState(0);
  const [activeLip, setActiveLip] = useState(0);
  const [activeEyeShadow, setActiveEyeShadow] = useState(0);

  const handleReady = () => {
    setReady(true);
  }

  const handleStart = () => {
    setStarted(true);
  }

  const handleClose = () => {
    ready && onClose();
  }

  return (
    <>
      <div className={cssBackdrop} onClick={handleClose}/>
      <div className={cssCard}>
        <Engine skin={skins[activeSkin]} lip={lips[activeLip]} eyeShadow={shadow[activeEyeShadow]} onReady={handleReady} />
        <div className={cssControl}>
          {skins.map((each, index) => {
            return <button type="button" key={index} onClick={()=>{setActiveSkin(index)}}>{each ? `color-${index}` : 'nomakeup'}</button>
          })}
          <br/>
          {shadow.map((each, index) => {
            return <button type="button" key={index} onClick={()=>{setActiveEyeShadow(index)}}>{each ? `color-${index}` : 'noShadow'}</button>
          })}
          <br/>
          {lips.map((each, index) => {
            return <button type="button" key={index} onClick={()=>{setActiveLip(index)}}>{each ? `color-${index}` : 'noLipstick'}</button>
          })}
        </div>
        <div className={cssLoading(started)}>
          <div>
            <h3>Virtual TryOn</h3>
            <p>You can try-on lipstick, eyeshadow, and foundation virtually. Please allow your webcam access permission to try this feature.</p>
            {!ready ? 'LOADING...' : <button type="button" onClick={handleStart}>GETTING STARTED</button>}
          </div>
        </div>
      </div>
    </>
  );
}

export default Makeup;
