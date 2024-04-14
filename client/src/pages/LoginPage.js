import React from 'react'
import loginImg from '../assets/login.png'
import Templete from '../components/Templete'
function LoginPage({ setIsLoggedIn }) {
  return (
    <div>
      <Templete
        title="Welcome back"
        desc1='Build skills for today,tomorrow,and beyond'
        desc2='Education to future-proof your career'
        image={loginImg}
        setIsLoggedIn={setIsLoggedIn}
        formtype='login'
      />
    </div>
  )
}

export default LoginPage