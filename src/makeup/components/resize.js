import { useRef } from 'react'
import { cssResizeToggle, cssResizeWrapper } from '../style';

const Resize = ({children}) => {
  const currReduce = useRef(30);
  const targetRef = useRef(null);
  const toggleRef = useRef(null);

  const handleResize = e => {
    currReduce.current = currReduce.current - e.movementX;
    targetRef.current.style.clipPath = `inset(0% ${currReduce.current}px 0% 0%)`;
    toggleRef.current.style.right = `${currReduce.current}px`;
  }

  const handleStopDrag = () => {
    document.removeEventListener("mousemove", handleResize, false);
    document.removeEventListener("mouseup", handleStopDrag, false);
  }

  const handleStartDrag = e => {
    document.addEventListener('mousemove', handleResize, false);
    document.addEventListener('mouseup', handleStopDrag, false);
  }

  return (
    <>
      <div ref={targetRef} style={{clipPath: `inset(0% ${currReduce.current}px 0% 0%)`}} className={cssResizeWrapper}>
        {children}
      </div>
      <div ref={toggleRef} style={{right: currReduce.current}} className={cssResizeToggle} onMouseDown={handleStartDrag} />
    </>
  );
}

export default Resize;