import { cssControl } from '../style';


export const skins = [
  null,
  'rgba(229,194,152, 0.3)',
  'rgba(204,132,67, 0.3)',
]

export const lips = [
  null,
  'rgba(225,0,0, 0.8)',
  'rgba(0,0,225, 0.8)',
]

export const shadow = [
  null,
  'rgba(0,0,225, 0.7)',
]


const Controls = ({setActiveSkin, setActiveEyeShadow, setActiveLip}) => (
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
)

export default Controls;