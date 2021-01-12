import { useEffect, useRef } from 'react';
import Resize from './resize';
import { cssCam, cssCanvasBase, cssCanvasDraw, cssWrapper } from '../style';

const Engine = ({skin, lip, eyeShadow}) => {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const canvasCamRef = useRef(null);
  const webcamRef = useRef(null);
  // const VIDEO_WIDTH = 405;
  // const VIDEO_HEIGHT = 720;

  useEffect(()=>{
    /* prediction and painting method */
    const predictAndPaint = async () => {
      /* TODO: get prediction/estimate values from current video frame  */

      /* TODO: Draw current video frame to video canvas */

      /* TODO: clear painting canvas before next painting */
      
      /* TODO: get color from props & do painting */
      
      /* recall this function for next frame */
    }
    
    /* init method - will be call when component did mount */
    const init = async () => {
      /* TODO: define backend graphic engine */

      /* TODO: setup webcam to our video DOM *

      /* TODO: sync our video size to canvas */

      /* TODO: initiate painting canvas and video canvas context */

      /* TODO: load facemesh model */

      /* call prediction and paint method */
      await predictAndPaint();
    }

    init();
    return(()=>{});
  },[]);

  return (
    <div ref={wrapperRef} className={cssWrapper}>
      <video ref={webcamRef} playsInline className={cssCam} />
      <canvas ref={canvasCamRef} className={cssCanvasBase} />
      <Resize>
        <canvas ref={canvasRef} className={cssCanvasDraw} />
      </Resize>
    </div>
  );
}

export default Engine;
