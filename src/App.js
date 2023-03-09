import React from "react";
import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import UserDetails from "./components/UserDetails";


function App() {
  const webcamRef = useRef(null);
  const [url, setUrl] = useState(null); 

  const capturePhoto = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUrl(imageSrc);
  }, [webcamRef]);

  const [faceScanned, setFaceScanned] = useState(false);

  const onCaptureClick = () => {
    // Functionality to scan user face.
    capturePhoto()
    setFaceScanned(true)
  };


  return (
    <div className="lg:h-screen lg:w-screen lg:flex bg-slate-100">
      <div className="lg:w-1/2">
        <p className="text-5xl text-slate-800 font-medium mt-60 ml-12">
          Keep all your <br /> medical records safe <br /> for emergency
          purpose.
        </p>
      </div>

      {/* Face Scanner */}
      {faceScanned === false ? <div className="mt-16">
        <Webcam ref={webcamRef} audio={true} screenshotFormat="image/jpeg" />
        <div className="w-32 h-10 bg-blue-700 rounded mt-5 mr-auto ml-auto flex justify-center items-center cursor-pointer" onClick={onCaptureClick}>
          <p className="text-slate-100">
            Capture
          </p>
        </div>
      </div> : <UserDetails />}
    </div>
  );
}

export default App;
