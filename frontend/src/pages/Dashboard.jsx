import React from 'react'
import Navbar from '../components/Navbar'
import AddResume from '../components/AddResume'
import { useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'



const Dashboard = () => {

  const navigate = useNavigate()
  const { user } = useUser()
  const primaryemail = user?.primaryEmailAddress?.emailAddress
  const [resumelist, setResumelist] = useState([])

  const getResumes = async () => {
    try {
      // console.log(email);

      const res = await fetch("http://localhost:3000/api/resumes/getResumes", {
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
    if (primaryemail) {
      getResumes().then((data) => {
        setResumelist(data)
      });
    }
  }, [primaryemail])


  return (
    <>
    <div className="absolute top-0 z-[-2] min-h-screen min-w-screen bg-[#00091d] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
      <div className='ml-8 mr-0 md:mx-20 pt-25 overflow-auto'>
        <h3 className='text-lg md:text-2xl text-white'>My Resumes</h3>
        <div className='mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 h-full gap-y-10 justify-center overflow-y-auto mx-auto'>
          <AddResume />
          {resumelist.map((resume) => (
            <div key={resume._id} onClick={() => { navigate(`edit/${resume._id}`) }} className="flex flex-col gap-2 md:gap-4 lg:gap-6 items-center justify-center w-40 md:w-48 lg:w-55 h-45 md:h-52 lg:h-60 border-2 border-gray-700 cursor-pointer bg-gray-800 hover:bg-gray-700 rounded-md py-18 md:py-21 lg:py-25 overflow-hidden last:mb-10 ">
              <img  src="/resume.png" width={150} alt="" />
              <span className='text-center pb-3 text-md md:text-2xl lg:text-3xl text-white'>{resume.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}

export default Dashboard
