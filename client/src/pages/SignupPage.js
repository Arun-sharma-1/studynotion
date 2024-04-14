import React from 'react'
import Templete from '../components/Templete'
import signupImage from '../assets/signup.png'
function SignupPage({ setIsLoggedIn }) {
  return (
    <div>
      <Templete
        title="Join the millions learning to code with studynotion for free"
        desc1='Build skills for today,tomorrow,and beyond'
        desc2='Education to future-proof your career'
        image={signupImage}
        setIsLoggedIn={setIsLoggedIn}
        formtype='signup'
      />
    </div>
  )
}

export default SignupPage
