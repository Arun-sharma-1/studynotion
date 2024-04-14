const { findOneAndUpdate } = require('moongose/models/user_model');
const User = require('../modals/User')
const mailSender = require('../utils/mailSender')
const Crypto = require('crypto');
const bcrpt = require('bcrypt')
//reset passwordToken
exports.resetPassowordToken = async (req, res) => {
    try {
        const email = req.body.email;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "All fileds are mandatory"
            })
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Mail is not registered"
            })
        }
        const token = Crypto.randomUUID();
        const updatedDetails = await User.findOneAndUpdate({ email: email }, {
            token: token,
            resetPasswordExpires: Date.now() + 5 * 60 * 1000
        }, { new: true })

        //create url
        const url = `http://localhost:3000/update-password/${token}`

        //send mail containing the url
        await mailSender(email, "Password Reset Link", `Password Reset Link : ${url}`)

        return res.json({
            success: true,
            message: "Email sent Successfully, please check email and change password"
        })
    } catch (err) {
        return res.json({
            success: false,
            message: "Can't change password , try again later"
        })
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const { password, confirmPassword, token } = req.body;

        if (password != confirmPassword) {
            return res.status(401).json({
                success: false,
                message: 'Password do not match'
            })
        }

        //get userDetails from db using token
        const userDetails = await User.findOne({ token: token });
        if (!userDetails) {
            return res.json({
                success: false,
                message: 'Token is invalid'
            })
        }
        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.json({ 
                success: false,
                message: 'Link is Expired,please again send request for reset password'
            })
        }
        const hashedPassword = bcrpt.hash(password, 10);
        await User.findOneAndUpdate({ token: token }, { password: hashedPassword },  {new:true})

        return res.status(200).json({
            success: false,
            message: 'Password changes successfully'
        })

    } catch (err) {
        return res.json({
            success: false,
            message: "can't rest password"
        })
     }
}