import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../assets/Logo.svg';
import { Toaster, toast } from 'react-hot-toast';
function Navbar(props) {
  const isLoggedIn = props.isLoggedIn;
  const setIsLoggedIn = props.setIsLoggedIn
  return (
    <div className='flex items-center justify-between py-3 w-11/12 max-w-[1160px] mx-auto' >
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div>
        <Link to="/">
          <img src={logo} alt="Logo" height={32} width={160} loading="lazy" />
        </Link>
      </div>
      <div>

        <ul className='flex gap-6  text-richblack-25 '>
          <li>
            <Link to="/" >Home</Link>
          </li>
          <li>
            <Link to="/" >About</Link>
          </li>
          <li>
            <Link to="/" >Contact</Link>
          </li>
        </ul>

      </div>
      <div className='flex gap-4 items-center text-richblack-100'>
        {isLoggedIn && <Link to="/dashboard"><button className='bg-richblack-800 py-[8px] px-[12px] rounded-[8px] border border-richblack-700' >Dashboard</button></Link>}
        {isLoggedIn && <Link to="/" ><button className='bg-richblack-800 py-[8px] px-[12px] rounded-[8px] border border-richblack-700' onClick={() => {
          setIsLoggedIn(false);
          toast.success('Logged out')
        }} >LogOut</button></Link>}
        {!isLoggedIn && <Link to="/login"><button className='bg-richblack-800 py-[8px] px-[12px] rounded-[8px] border border-richblack-700'>Signin</button></Link>}
        {!isLoggedIn && <Link to="/signup"><button className='bg-richblack-800 py-[8px] px-[12px] rounded-[8px] border border-richblack-700'>Signup</button></Link>}
      </div>
    </div>
  )
}

export default Navbar
