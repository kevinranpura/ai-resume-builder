import { React, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { getAuth, signOut } from "firebase/auth";

const Navbar = () => {
	const navigate = useNavigate()
	const [showsignout, setshowsignout] = useState(false)
	const { user } = useUser()
	const auth = getAuth()
	const username = user?.displayName
	const email = user?.email
	const location = useLocation()
	const isEditPage = location.pathname.includes("/edit/");

	const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

	return (
		<div className='relative flex justify-between items-center px-5 md:px-10 py-3'>
			<Link href={"/"}>
				<p className={`${isEditPage ? "text-black" : "text-white"} text-xl md:text-2xl font-semibold`}>ResumeWiz</p>
			</Link>

			{user ?
				<div className='flex gap-5 items-center justify-center'>
					<Link to={"/dashboard"}>
						<button className={`${isEditPage ? "bg-[#00133b] text-white" : "bg-blue-300 text-[#00133b]"} font-semibold rounded-md px-3 py-2 cursor-pointer`}>Dashboard</button>
					</Link>

					<button onClick={() => setshowsignout(!showsignout)} id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className={`${isEditPage ? "bg-[#00133b] text-white" : "bg-blue-300 text-[#00133b]"} w-10 h-10 rounded-full font-semibold cursor-pointer`}>{username.charAt(0)}
					</button>

					<div id="userDropdown" className={`${showsignout ? "" : "hidden"} absolute top-15 z-10 bg-white divide-y divide-gray-400 rounded-lg shadow-sm font-semibold w-50 text-[#00133b]`}>
						<div className="px-2 py-3 text-sm text--900 ">
							<div>{username}</div>
							<div className="font-semibold truncate">{email}</div>
						</div>
						<div className="py-1">
							<div onClick={() => handleSignOut()} className="px-2 py-2 text-sm text-red-700 hover:bg-gray-100 flex gap-2 cursor-pointer">
								<img src="/signout.svg" alt="" />
								Sign out
							</div>
						</div>
					</div>
				</div> :
				<Link to={"auth/sign-in/"}>
					<button className='bg-blue-300 text-[#00133b] font-semibold rounded-md px-3 py-2 cursor-pointer'>Get Started</button>
				</Link>
			}

		</div>

	)
}

export default Navbar
