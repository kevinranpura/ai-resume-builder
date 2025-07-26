import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'


const AddResume = () => {
  const navigate = useNavigate()
  const { user } = useUser()
  const primaryemail = user?.email
  const username = user?.displayName
  const [modal, setmodal] = useState(false)
  const [title, settitle] = useState("")

  const handleCreateRes = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/resumes/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          primaryemail,
          username,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        const resumeid = data.resumeid;
        navigate(`edit/${resumeid}`)
        console.log("Resume created:", data.resume);
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Error creating resume:", err);
      alert("Failed to create resume");
    }
  };


  return (
    <div>
      <button onClick={() => setmodal(!modal)} data-modal-target="default-modal" data-modal-toggle="default-modal" className="flex items-center justify-center w-40 md:w-48 lg:w-55 border-2 border-gray-400 border-dashed cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-md py-18 md:py-21 lg:py-25" type="button">
        <span className='text-3xl text-gray-600'>+</span>
      </button>


      <div id="default-modal" tabIndex="-1" aria-hidden="true" className={` ${modal ? "" : "hidden"} fixed inset-0 z-50 flex justify-center items-center md:items-start bg-black/70`}>
        <div className="relative p-10 md:p-5 w-full max-w-2xl max-h-full">

          <div className="relative bg-white rounded-lg">

            <div className="flex items-center justify-between p-1.5 md:p-5 border-b rounded-t  border-gray-500">
              <h3 className="text-md md:text-xl font-semibold text-black ">
                Create New Resume
              </h3>
              <button type="button" onClick={() => setmodal(!modal)} className="text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-hide="default-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="px-4 py-2 md:p-5 space-y-4">
              <p className="text-sm md:text-lg text-black">
                Enter Title For New Resume
              </p>
              <input onChange={(e) => { settitle(e.target.value) }} type='text' placeholder='Full Stack Developer' className="w-full bg-gray-200 rounded-md py-1 px-3 text-md text-black border border-gray-400 outline-none">
              </input>
            </div>

            <div className="flex items-center p-4 md:p-5 justify-end">
              <button onClick={() => setmodal(!modal)} data-modal-hide="default-modal" type="button" className="py-2 md:py-2.5 px-3 md:px-5 text-sm font-medium text-gray-900  bg-gray-200 rounded-lg border border-gray-200 hover:bg-gray-100 cursor-pointer">Cancel</button>
              <button onClick={handleCreateRes} disabled={!title} className={`${(!title) ? "bg-blue-300 text-white font-medium rounded-lg text-sm px-3 md:px-5 py-2 md:py-2.5 text-center ms-5 cursor-pointer" : "bg-blue-600 text-white font-medium rounded-lg text-sm px-3 md:px-5 py-2 md:py-2.5 text-center ms-5 cursor-pointer"}`}>Create</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddResume
