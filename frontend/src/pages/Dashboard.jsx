import React from 'react'
import Navbar from '../components/Navbar'
import AddResume from '../components/AddResume'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from "firebase/auth";


const ResumeCard = ({ index, resume, onClick }) => {

  return (
    <div
      onClick={onClick}
      className="group relative h-[280px] flex flex-col justify-between cursor-pointer
                 bg-[#101A30] border border-[#EAF0FB]/[0.08] px-5 py-6 transition-all duration-300
                 hover:-translate-y-1 hover:border-[#EAF0FB]/[0.16]
                 hover:shadow-[0_18px_30px_-18px_rgba(0,0,0,0.6)]"
    >
      <span
        className="text-[10px] uppercase tracking-[0.16em] text-[#5A8DEE]"
        style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
      >
        Resume file
      </span>

      <div
        className="flex items-center justify-center text-xl md:text-2xl leading-[1.15] text-[#EAF0FB]"
        style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
      >
        {resume.title}
      </div>

      <div className="relative flex items-end justify-between pt-3">
        <span className="absolute -top-0 left-0 right-0 h-px bg-[#EAF0FB]/[0.08]" />
        <span className="absolute -top-0 left-0 h-px bg-[#5A8DEE] w-0 transition-all duration-500 ease-out group-hover:w-full" />
        <span
          className="text-sm text-[#7C89A6] group-hover:text-[#5A8DEE] transition-colors duration-300"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
    </div>
  )
}

const Dashboard = () => {

  const navigate = useNavigate()
  const [primaryemail, setprimaryemail] = useState(null)
  const [resumelist, setResumelist] = useState([])

  const getResumes = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/resumes/getResumes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ primaryemail }),
      });

      const data = await res.json();
      return data;

    } catch (error) {
      console.log("error fetching resumes:", error);
      return [];
    }
  }

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user){
        setprimaryemail(user.email)
      }
    });
    return () => unsubscribe();
  }, []); 
  
  
  useEffect(() => {
    if (primaryemail) {
      getResumes().then((data) => {
        setResumelist(data);
      });
    }
  }, [primaryemail]);

  
  return (
    <>
    <div className="absolute top-0 z-[-2] min-h-screen min-w-screen bg-[#00091d] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
      <div className='ml-8 mr-8 md:mx-20 pt-25 pb-16 overflow-auto'>

        <div className="flex items-end justify-between mb-2">
          <div
            className='text-2xl md:text-3xl text-[#EAF0FB]'
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
          >
            My Resumes
          </div>
          <span
            className="text-xs md:text-sm text-[#7C89A6] uppercase tracking-[0.14em] pb-1"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {String(resumelist.length).padStart(2, '0')} Documents
          </span>
        </div>
        <div className="h-px bg-[#EAF0FB]/[0.08] mb-10" />

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-10'>
          <AddResume />
          {resumelist.map((resume, index) => (
            <ResumeCard
              key={resume._id}
              index={index}
              resume={resume}
              onClick={() => navigate(`edit/${resume._id}`)}
            />
          ))}
        </div>
      </div>
    </div>
    </>
  )
}

export default Dashboard