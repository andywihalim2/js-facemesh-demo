import { useState } from "react";
import Makeup from "./components/makeup"

const App = () => {
  const [ show, setShow ] = useState(false);

  return (
    <>
      <div style={{textAlign: "center"}}>
        <h1>VIRTUAL TRY-ON DEMO</h1>
        <button onClick={()=>{setShow(true)}}>Start TryOn</button>
      </div>
      {show && <Makeup onClose={()=>{setShow(false)}} />}
    </>
  );
}

export default App;
