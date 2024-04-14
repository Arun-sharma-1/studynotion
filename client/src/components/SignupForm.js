import React, { useState } from 'react';
import { AiFillEyeInvisible, AiOutlineEye } from "react-icons/ai";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
function SignupForm({ setIsLoggedIn }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmpassword: ''
    })
    const [showPassword1, setShowPassword1] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)
    const [accountType, setAccountType] = useState("student");
    const changeHandler = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => (
            {
                ...prev,
                [name]: value
            }
        ))
    }
    function submitHandler(event) {
        event.preventDefault();
        if (formData.password !== formData.confirmpassword) {
            toast.error('Password do not match')
            return;
        }
        setIsLoggedIn(true)
        toast.success(`account created with ${formData.email}`)
        navigate('/dashboard')

    }

    return (
        <div className="mt-8">
            <div className='flex bg-richblack-800 max-w-max  rounded-full p-1 gap-x-1 '>
                <button
                    className={`${accountType === "student" ? "bg-richblack-900 text-richblack-5" : "bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}
                    onClick={() => {
                        setAccountType("student")
                    }}
                >Student</button>
                <button
                    onClick={() => {
                        setAccountType("instructor")
                    }}
                    className={`${accountType === "instructor" ? "bg-richblack-900 text-richblack-5" : "bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}
                >Instructor</button>
            </div>

            <form onSubmit={submitHandler} className='flex flex-col w-full gap-y-4 mt-6'>
                <div className='flex gap-x-4 items-center'>
                    <label className='w-full'>
                        <p className="text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]">
                            First Name<sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            required
                            type='text'
                            name='firstname'
                            onChange={changeHandler}
                            value={formData.firstname}
                            placeholder='Enter First Name'
                            className="bg-richblack-800 text-white rounded-[4px] w-full px-[12px] py-[8px]"
                        />
                    </label>
                    <label className='w-full'>
                        <p className="text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]">
                            Last Name<sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            required
                            type='text'
                            name='lastname'
                            onChange={changeHandler}
                            value={formData.lastname}
                            placeholder='Enter Last Name'
                            className="bg-richblack-800   text-white rounded-[4px] w-full px-[12px] py-[8px]"
                        />
                    </label>
                </div>

                <label>
                    <p className="text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]">
                        Email Address<sup className="text-pink-200">*</sup>
                    </p>
                    <input
                        required
                        type='text'
                        value={formData.email}
                        name='email'
                        onChange={changeHandler}
                        className="bg-richblack-800  text-white rounded-[4px] w-full px-[12px] py-[8px]"
                        placeholder='Enter your Email'
                    />
                </label>

                <div className='flex gap-x-4'>
                    <label className="w-full relative">
                        <p className="text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]">
                            Create Password<sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            type={showPassword1 ? 'text' : 'password'}
                            placeholder='Enter Password'
                            name='password'
                            onChange={changeHandler}
                            className="bg-richblack-800 text-[12px] md:text-[16px]  text-white rounded-[4px] w-full p-[12px] pr-[44px]"
                            value={formData.password} />
                        <span
                            className="absolute top-1/2 translate-y-1/4 right-3 z-10 cursor-pointer" onClick={() => setShowPassword1((prev) => !prev)}>
                            {!showPassword1 ? (<AiFillEyeInvisible fill="#AFB2BF" fontSize={18} />) : (<AiOutlineEye fill="#AFB2BF" fontSize={18} />)}
                        </span>
                    </label>
                    <label className="w-full relative">
                        <p className="text-richblack-5 mb-1 text-[0.875rem] leading-[1.375rem]">
                            Confirm Password<sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            className="bg-richblack-800 text-[12px] md:text-[16px]  text-white rounded-[4px] w-full p-[12px] pr-[44px]"
                            type={showPassword2 ? 'text' : 'password'}
                            placeholder='Confirm Password'
                            name='confirmpassword'
                            onChange={changeHandler}
                            value={formData.confirmpassword} />
                        <span className="absolute top-1/2 translate-y-1/4 right-3 z-10 cursor-pointer" onClick={() => setShowPassword2((prev) => !prev)}>
                            {!showPassword2 ? (<AiFillEyeInvisible fill="#AFB2BF" fontSize={18} />) : (<AiOutlineEye fill="#AFB2BF" fontSize={18} />)}
                        </span>
                    </label>
                </div>
                <button className="bg-yellow-50 text-richblack-900 font-semibold px-[12px] rounded-[8px] py-[8px] mt-6">
                    Create Account
                </button>
            </form>
        </div>
    )
}

export default SignupForm
