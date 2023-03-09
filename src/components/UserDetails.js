import React from "react";
import { useState } from "react";
import { getStorage } from "firebase/storage";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

export default function UserDetails() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [file, setFile] = useState("");

  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }

  function handleFileUpload(){
    const storage = getStorage()
    if(!file) return alert('Please select a file.')
    const storageRef = ref(storage, `files/${Date.now()}`)
    const uploadTask = uploadBytesResumable(storageRef, file)
    
    uploadTask.on('state_changed', (snapshot) => {
      const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      console.log(percent)
    }, (err) => console.log(err), () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        console.log(url)
      })
    })
  }

  return (
    <>
      <div className="mt-48">
        <p className="text-2xl text-slate-700 mb-12">Enter Your Details</p>
        <input
          className="focus:outline-0 bg-slate-50 border-2 rounded-md w-80 p-2"
          placeholder="Legal Name"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        ></input>

        <input
          className="focus:outline-0 bg-slate-50 border-2 rounded-md w-80 p-2 ml-2"
          placeholder="Phone Number"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        ></input>

        <div className="flex">
          <input type="file" onChange={handleFileChange} className="mt-8" />

          <div className="flex m-auto bg-blue-800 rounded-md w-24 h-9 cursor-pointer mt-6 justify-center items-center" onClick={handleFileUpload}>
            <p className = 'text-sm text-slate-100'>Upload Data</p>
          </div>
        </div>
      </div>
    </>
  );
}
