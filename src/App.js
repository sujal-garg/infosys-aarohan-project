import React from "react";
import { useRef, useState, useCallback } from 'react'
import Webcam from "react-webcam";

let webcamRef

const Camera = () => {
  webcamRef = useRef(null);
  const [url, setUrl] = useState(null);

  const capturePhoto = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUrl(imageSrc);
  }, [webcamRef]);
}

const onCaptureClick = () => {

}

function App() {
  return (
    <div className="h-screen w-screen flex bg-slate-100">
      <div className="w-1/2">
        <p className="text-5xl text-slate-800 font-medium mt-60 ml-12">
          Keep all your <br /> medical records safe <br /> for emergency
          purpose.
        </p>
      </div>

      {/* Face Scanner */}
      <div className="mt-16">
        <Webcam
          ref={webcamRef}
          audio={true}
          screenshotFormat="image/jpeg"
        />  
      <div className = 'w-32 h-10 bg-blue-700 rounded mt-5 mr-auto ml-auto flex justify-center items-center'>
      <p className = 'text-slate-100' onClick = { onCaptureClick }>Capture</p>
      </div>
      </div>
    </div>
  );
}

export default App;
