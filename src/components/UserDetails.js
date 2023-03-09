import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getStorage } from "firebase/storage";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { collection, addDoc, getFirestore } from 'firebase/firestore'

export default function UserDetails() {
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [file, setFile] = useState('')
  const [fileURL, setFileURL] = useState('')

  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }

  async function handleFileUpload(){
    const storage = getStorage()
    if(!file) return alert('Please select a file.')
    const storageRef = ref(storage, `files/${Date.now()}`)
    const uploadTask = uploadBytesResumable(storageRef, file)
    
    uploadTask.on('state_changed', (snapshot) => {
      const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      console.log(percent)
    }, (err) => console.log(err), () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        setFileURL(url)
      })
    })

    // Sending data to Cloud Firestore
    const db = getFirestore()
    const userDetails = {
      name: name,
      phoneNumber: phoneNumber,
      imageLink: fileURL
    }
    try {
      await addDoc(collection(db, 'users'), userDetails)
      toast.success('Data uploaded successfully.')
    } catch (err){
      console.log(err)
      toast.error('There is some error from our side.')
    }
  }

  return (
    <>
      <div className="mt-48">
        <p className="text-2xl text-slate-700 mb-12">Enter Your Details</p>
        <input
          className="focus:outline-0 bg-slate-50 border-2 rounded-md w-80 p-2"
          placeholder="Legal Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        ></input>

        <input
          className="focus:outline-0 bg-slate-50 border-2 rounded-md w-80 p-2 ml-2"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
        ></input>

        <div className="flex">
          <input type="file" onChange={handleFileChange} className="mt-8" />

          <div className="flex m-auto bg-blue-800 rounded-md w-24 h-9 cursor-pointer mt-6 justify-center items-center" onClick={handleFileUpload}>
            <p className = 'text-sm text-slate-100'>Upload Data</p>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
}
