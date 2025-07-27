import React, { useState } from 'react'
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, githubProvider } from '../../firebase';
import { useNavigate, Link } from 'react-router-dom';


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
		<div className="h-screen w-screen bg-gray-200">

			<div
				className="fixed grid place-items-center backdrop-blur-sm top-0 right-0 left-0 z-50 w-[full] inset-0 h-modal h-[600px] mt-0 md:mt-10 my-auto mx-auto justify-center items-center">
				<div className="mx-auto relative container w-[full] md:w-[600px] h-[full] ">
					<div className="m-auto md:w-7/12 lg:w-full h-full">
						<div className="rounded-xl bg-white shadow-2xl h-full items-center justify-center mx-auto">
							<div className="p-8 mx-auto">
								<div className="space-y-4 mb-20">
									
										<div onClick={() => navigate("/")} className='flex gap-5 items-center text-4xl text-cyan-800 font-bold mb-10 cursor-pointer'>
											<img src="/stars.png" loading="lazy" className="w-10" />
											<div>ResumeWiz</div>
										</div>
									
									<h2 className="mb-0 text-[28px] text-wrap text-cyan-800  font-bold">Log in to create, customize, and share <br /> stunning resumes that stand out.
									</h2>
								</div>
								<div className="mt-10 grid space-y-8 items-center">
									<button
										onClick={handleGoogleSignIn}
										className="group h-15 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
										<div className="relative flex items-center space-x-4 justify-center">
											<img src="https://www.svgrepo.com/show/475656/google-color.svg"
												className="absolute left-0 w-5" alt="google logo" />
											<span
												className="block w-max font-semibold tracking-wide text-gray-700 text-[16px] md:text-[18px] transition duration-300 group-hover:text-blue-600 sm:text-base">Continue
												with Google
											</span>
										</div>
									</button>
									
								</div>
								<div className="mt-40 space-y-4 py-3 text-gray-600 text-center text-wrap text-md md:w-full">
									<p>By proceeding, you agree to our
										<a href="/privacy-policy/" className="underline"> Terms of Use </a>and confirm you have read our
										<a href="/privacy-policy/" className="underline"> Privacy and Cookie Statement</a>.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>
	)
}

export default Index
{/* // {<button onClick={handleGoogleSignIn}>Sign in with Google</button> */ }
{/* // <button onClick={handleGitHubSignIn}>Sign in with GitHub</button> } */ }