import React, { useState } from 'react'
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
		<div className="h-screen w-screen bg-gray-200">

			<div
				className="fixed grid place-items-center backdrop-blur-sm top-0 right-0 left-0 z-50 w-[full] inset-0 h-modal h-[600px] mt-20 md:mt-10 md:my-auto mx-auto justify-center items-center">
				<div className="mx-auto relative container px-6 w-[450px] md:w-[600px] h-[full] ">
					<div className="m-auto md:w-7/12 lg:w-full h-full">
						<div className="rounded-xl bg-white shadow-2xl h-full items-center justify-center mx-auto">
							<div className="p-8 mx-auto">
								<div className="space-y-4 mb-20">
									<div className='flex gap-5 items-center text-4xl text-cyan-900 font-bold mb-10'>
										<img src="/stars.png" loading="lazy" className="w-10"/>
										<div>ResumeWiz</div>
									</div>
									<h2 className="mb-0 text-[28px] text-wrap text-cyan-900  font-bold">Log in to create, customize, and share <br/> stunning resumes that stand out.
									</h2>
								</div>
								<div className="mt-10 grid space-y-8 items-center">
									<button
										onClick={handleGoogleSignIn}
										className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
										<div className="relative flex items-center space-x-4 justify-center">
											<img src="https://www.svgrepo.com/show/475656/google-color.svg"
												className="absolute left-0 w-5" alt="google logo"/>
												<span
													className="block w-max font-semibold tracking-wide text-gray-700 text-md transition duration-300 group-hover:text-blue-600 sm:text-base">Continue
													with Google
												</span>
										</div>
									</button>
									<button
										onClick={handleGitHubSignIn}
										className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
										<div className="relative flex items-center space-x-4 justify-center">
											<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
												className="absolute left-0 w-5 text-gray-700" viewBox="0 0 16 16">
												<path
													d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z">
												</path>
											</svg>
											<span
												className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition  duration-300 group-hover:text-blue-600 sm:text-base">Continue
												with Github
											</span>
										</div>
									</button>
								</div>
								<div className="mt-40 space-y-4 py-3 text-gray-600 text-center text-wrap text-md md:w-full">
									<p>By proceeding, you agree to our
										<a href="/privacy-policy/" className="underline">Terms of Use </a>and confirm you have read our
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
{/* // {<button onClick={handleGoogleSignIn}>Sign in with Google</button> */}
{/* // <button onClick={handleGitHubSignIn}>Sign in with GitHub</button> } */}