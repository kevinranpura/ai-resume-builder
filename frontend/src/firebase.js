import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDZuf9Bo_6a2N-ZPwvyNrL2dDW8Sty_GGA",
  authDomain: "ai-resume-builder-fc2af.firebaseapp.com",
  projectId: "ai-resume-builder-fc2af",
  storageBucket: "ai-resume-builder-fc2af.firebasestorage.app",
  messagingSenderId: "262796647044",
  appId: "1:262796647044:web:c5a242a4fe6fa985b1c0d1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export { auth, googleProvider, githubProvider };
