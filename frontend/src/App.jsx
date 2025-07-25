import { useState, useEffect } from 'react'
import './App.css'
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { ToastContainer } from 'react-toastify';


function App() {
  const [user, setuser] = useState(null)
  const [ loading, setloading ] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setuser(firebaseUser);
      setloading(false);
    });
    return () => unsub();
  }, []);


  if (!user && !loading) {
    return <Navigate to={"auth/sign-in/"} />
  }

  return (
    <>
      <Navbar user={user} />
      <Outlet />
      <ToastContainer />
    </>
  )
}

export default App
