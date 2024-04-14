
import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
function LoginForm({ setIsLoggedIn }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false);
    const changeHandler = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => (
            {
                ...prev,
                [name]: value
            }
        ))
    }
    const submitHandler = (event) => {
        event.preventDefault();
        toast.success('LoggedIn');
        setIsLoggedIn(true);
        navigate('/dashboard');
    }
    return (
        <form onSubmit={submitHandler} className="flex flex-col w-full gap-y-4 mt-6">
            <label>
                <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                    Email Address <sup className="text-pink-200">*</sup>
                </p>
                <input
                    type='text'
                    required
                    value={formData.email}
                    onChange={changeHandler}
                    placeholder='Enter email Id'
                    name='email'
                    className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5 focus:outline-none focus:border-[1px] focus:border-opacity-50 border-white"
                />
            </label>
            <label className='relative'>
                <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                    Password
                    <sup className="text-pink-200 ml-1 ">*</sup>
                </p>
                <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={changeHandler}
                    placeholder='Enter Password'
                    name='password'
                    className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] pr-[50px] text-richblack-5 outline-none focus:outline-none focus:border-[1px] focus:border-opacity-50 border-white"
                />
                <span
                    className='absolute right-3 top-[40px] cursor-pointer'
                    onClick={() => { setShowPassword((prev) => !prev) }}>
                    {showPassword ? (<AiOutlineEye fill="#AFB2BF" fontSize={24} />) : (<AiOutlineEyeInvisible fill="#AFB2BF" fontSize={24} />)}
                </span>

                <Link to='#' >
                    <p className='text-xs mt-1 text-blue-100 float-right'>Forget Password</p>
                </Link>
            </label>

            <button className="bg-yellow-50 py-[8px] px-[12px] rounded-[8px] mt-6 font-semibold text-richblack-900">
                Sign in
            </button>

        </form>
    )
}

export default LoginForm

