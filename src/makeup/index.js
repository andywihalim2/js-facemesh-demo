import Engine from './components/engine';
import { useState } from 'react';
import { cssCard } from './style';
import Controls from './components/controls';
import { skins, lips, shadow } from './components/controls';

const Makeup = ({onClose}) => {
  const [activeSkin, setActiveSkin] = useState(0);
  const [activeLip, setActiveLip] = useState(0);
  const [activeEyeShadow, setActiveEyeShadow] = useState(0);

  return (
    <div className={cssCard}>
      <Engine skin={skins[activeSkin]} lip={lips[activeLip]} eyeShadow={shadow[activeEyeShadow]} />
      <Controls {...{setActiveSkin, setActiveLip, setActiveEyeShadow}}/>
    </div>
  );
}

export default Makeup;
