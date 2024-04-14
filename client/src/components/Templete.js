import React from 'react'
import frame from '../assets/frame.png'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import { FcGoogle } from "react-icons/fc";
function Templete({ title, desc1, desc2, image, formtype, setIsLoggedIn }) {
    return (
        <div className='flex flex-col-reverse gap-y-5 md:flex-row w-11/12 max-w-[1160px] py-12 mx-auto justify-center md:justify-between items-center md:items-start gap-y-0 gap-x-12'>
            {/* left side  */}
            <div className='w-11/12 max-w-[450px] flex flex-col'>
                <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">{title}</h1>
                <p className='text-[1.125rem] mt-4 leading-[1.625rem] flex flex-col'>
                    <span className="text-richblack-100" >{desc1}</span>
                    <span className="text-blue-100 italic">{desc2}</span>
                </p>
                {formtype == 'signup' ? (<SignupForm setIsLoggedIn={setIsLoggedIn} />) : (<LoginForm setIsLoggedIn={setIsLoggedIn} />)}
                <div className="flex w-full items-center gap-x-2 my-4">
                    <div className="h-[1px] bg-richblack-700 w-full"></div>
                    <p className="uppercase text-richblack-700 font-medium leading-[1.375rem]">
                        or
                    </p>
                    <div className="h-[1px] bg-richblack-700 w-full"></div>
                </div>
                <button className="flex rounded-md items-center justify-center border border-richblack-700 font-medium text-richblack-100 px-[12px] py-[8px] gap-x-2 mt-6">
                    <FcGoogle />
                    <p>Sign in with Google</p>
                </button>
            </div>
            {/* right side  */}
            <div className='relative w-11/12 max-w-[450px]'>
                <img src={frame}
                    alt='pattern'
                    width={558}
                    height={504}
                    loading='lazy'
                /> <img src={image}
                    alt='Students'
                    width={558}
                    height={504}
                    className="absolute -top-4 right-4 "
                    loading='lazy'
                />
            </div>

        </div>
    )
}

export default Templete
