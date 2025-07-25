import React from 'react'
import Navbar from '../components/Navbar'
import { Navigate } from 'react-router-dom'




const Home = () => {

  return (

    <div className=" z-[-2] min-h-screen max-w-screen bg-[#00091d] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] md:overflow-hidden">
      <Navbar />

      <div className='flex text-white mb-5'>
        <div className='w-[90%] md:w-[35%] justify-center items-center mt-10 py-20 mx-auto md:ml-30'>
          <div className='text-5xl font-semibold text-nowrap'>
            Build Resumes
          </div>
          <div className='pt-3 pb-5 font-semibold text-5xl text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 animate-gradient'>
            Effortlessly!
          </div>
          <div className='text-[17px]'>
            Craft your perfect resume in minutes ! Stylish templates, smart suggestions, and one powerful resume—built by AI.
          </div>
        </div>
      </div>

      <div className='px-5 my-'>
        <div className='flex items-center justify-center text-white text-lg md:text-2xl font-semibold'>
          Smart Features That Help You Stand Out
        </div>
        <div className='flex flex-col md:flex-row gap-5 items-center justify-center w-full mt-10 rounded-lg'>
          <div className='bg-[#00091d] text-white border border-gray-800 w-80 h-30 rounded-lg px-3'>
            <h2 className='font-bold text-[17px] pt-3'>Easy Editing</h2>
            <p className='text-[15px] pt-3'>Effortlessly update your resume sections with live previews and instant formatting.</p>
          </div>
          <div className='bg-[#00091d] text-white border border-gray-800 w-80 h-30 rounded-lg px-3'>
            <h2 className='font-bold text-[17px] pt-3'>Beautiful Templates</h2>
            <p className='text-[15px] pt-3'>Choose from sleek, modern templates that are fully customizable to match your style.</p>
          </div>
          <div className='bg-[#00091d] text-white border border-gray-800 w-80 h-30 rounded-lg px-3 mb-10 md:mb-0'>
            <h2 className='font-bold text-[17px] pt-3'>One-Click Export</h2>
            <p className='text-[15px] pt-3'>Instantly download your resume as a high-quality PDF with just one click.</p>
          </div>
        </div>
      </div>
    </div>




  )
}

export default Home
