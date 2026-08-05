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
      <button
        onClick={() => setmodal(!modal)}
        data-modal-target="default-modal"
        data-modal-toggle="default-modal"
        type="button"
        className="group bg-[#1d283f] h-[280px] w-full flex flex-col items-center justify-center gap-3
                   border border-dashed border-[#EAF0FB]/[0.16] cursor-pointer
                   transition-all duration-300 hover:border-[#5A8DEE]/50 hover:bg-[#101A30]"
      >
        <span
          className="text-3xl text-[#7C89A6] transition-colors duration-300 group-hover:text-[#5A8DEE]"
          style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
        >
          +
        </span>
        <span
          className="text-[10px] uppercase tracking-[0.16em] text-[#7C89A6] transition-colors duration-300 group-hover:text-[#5A8DEE]"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          New Resume
        </span>
      </button>

      <div
        id="default-modal"
        tabIndex="-1"
        aria-hidden="true"
        className={`${modal ? "" : "hidden"} fixed inset-0 z-50 flex justify-center items-center bg-black/70 backdrop-blur-sm`}
      >
        <div className="relative w-full max-w-md mx-4">
          <div className="relative bg-[#101A30] border border-[#EAF0FB]/[0.1]">

            <div className="flex items-center justify-between px-6 py-5 border-b border-[#EAF0FB]/[0.08]">
              <h3
                className="text-xl text-[#EAF0FB]"
                style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
              >
                New resume
              </h3>
              <button
                type="button"
                onClick={() => setmodal(!modal)}
                data-modal-hide="default-modal"
                className="text-[#7C89A6] hover:text-[#5A8DEE] transition-colors"
              >
                <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="px-6 py-6 space-y-3">
              <label
                className="block text-[11px] uppercase tracking-[0.14em] text-[#7C89A6]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Title
              </label>
              <input
                onChange={(e) => { settitle(e.target.value) }}
                type='text'
                placeholder='Full Stack Developer'
                autoFocus
                className="w-full bg-[#00091d] border border-[#EAF0FB]/[0.12] px-3 py-2.5 text-[#EAF0FB]
                           placeholder:text-[#4A5674] outline-none focus:border-[#5A8DEE] transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              />
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-5 border-t border-[#EAF0FB]/[0.08]">
              <button
                onClick={() => setmodal(!modal)}
                data-modal-hide="default-modal"
                type="button"
                className="px-4 py-2 text-sm text-[#7C89A6] hover:text-[#EAF0FB] transition-colors cursor-pointer"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateRes}
                disabled={!title}
                className={`px-5 py-2 text-sm border transition-colors cursor-pointer
                  ${!title
                    ? "text-[#4A5674] border-[#EAF0FB]/[0.08] cursor-not-allowed"
                    : "text-[#00091d] bg-[#5A8DEE] border-[#5A8DEE] hover:bg-[#4879DA]"}`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddResume