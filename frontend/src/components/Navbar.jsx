import React from 'react'
import { Link, Navigate, useLocation} from 'react-router-dom'
import { useUser } from '../context/UserContext'
import {auth} from '../firebase.js'

const Navbar = () => {
    const {user} = useUser()
    const location = useLocation()
    const isEditPage = location.pathname.includes("/edit/");

  return (
    <div className='flex justify-between items-center px-5 md:px-10 py-3'>
      <Link href={"/"}>
        <p className={`${isEditPage ? "text-black" : "text-white"} text-xl md:text-2xl font-semibold`}>ResumeWiz </p>
      </Link>

      {user ?
        <div className='flex gap-5 items-center justify-center'>
            <Link to={"/dashboard"}>
                <button className={`${isEditPage? "bg-[#00133b] text-white" : "bg-blue-300 text-[#00133b]"} font-semibold rounded-md px-3 py-2 cursor-pointer`}>Dashboard</button>
            </Link>  
            <button
            onClick={() => auth.signOut()}
            className="bg-red-500 text-white px-3 py-2"
            >
            Sign Out
            </button>
        </div>:
        <Link to={"auth/sign-in/"}>
            <button className='bg-blue-300 text-[#00133b] font-semibold rounded-md px-3 py-2 cursor-pointer'>Get Started</button>
        </Link>
      }
        
    </div>
    
  )
}

export default Navbar
