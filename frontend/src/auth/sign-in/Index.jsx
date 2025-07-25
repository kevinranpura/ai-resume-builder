import React, {useState} from 'react'
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, githubProvider } from '../../firebase';
import { useNavigate } from 'react-router-dom';


const Index = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/")
      alert("Signed in with Google");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGitHubSignIn = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
      navigate("/")
      alert("Signed in with GitHub");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className='flex h-[90vh] justify-center items-center '>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
      <button onClick={handleGitHubSignIn}>Sign in with GitHub</button>
    </div>
  )
}

export default Index