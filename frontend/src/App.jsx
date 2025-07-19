import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';


function App() {
  const [count, setCount] = useState(0)
  const {user, isSignedIn, isLoaded} = useUser()

  if(!isSignedIn && isLoaded){
    return <Navigate to={"auth/sign-in/"}/>
  }

  return (
    <> 
      <Navbar/>
      <Outlet/>  
      <ToastContainer/>
    </>
  )
}

export default App
