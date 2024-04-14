const User = require('../modals/User');
const OTP = require('../modals/Otp');
const otpGenerator = require('otp-generator')
const bcrpt = require('bcrypt')
const Profile = require('../modals/Profile')
const jwt = require('jsonwebtoken');
const { options } = require('moongose/routes');
require('dotenv').config()
//send otp

exports.sendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        //user exist or not 
        const isPrevUser = await User.findOne({ email });

        //user already exist
        if (isPrevUser) {
            return res.status(401).json({
                success: false,
                message: "User already registered"
            })
        }

        //generate otp
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        })
        console.log('otp is ', otp);

        var result = await OTP.findOne({ otp: otp });

        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            })
            result = await OTP.findOne({ otp: otp });
        }

        const otpPayload = { email, otp };
        console.log('payload for otp ', otpPayload);

        const otpBody = await OTP.create(otpPayload);
        res.status(200).json({
            success: true,
            message: 'OTP sent successfully',
            otp,
        })
    } catch (err) {
        console.log('err at otp gen ', err);
        res.status(500).json({
            success: false,
            message: err.message
        })
    }


}
//signup

exports.signUP = async (req, res) => {
    try {//data fetch
        const { firstName, lastName, email, password, confirmPassword, accountType, contactNumber, otp } = req.body;
        //validate kro
        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(403).json({
                success: false,
                message: 'All fields are mandatory'
            })
        }
        //2dono pass match krlo
        if (password !== confirmPassword) {
            return res.status(401).json({
                success: false,
                message: 'Passwords and Confirm passwords should be same'
            })
        }
        //user exist krta h ya nhi
        const prevUser = await User.findOne({ email });
        if (prevUser) {
            res.status(401).json({
                success: false,
                message: 'User already exists'
            })
        }
        //find most recent otp 
        const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log('recent otp ', recentOtp);

        if (recentOtp.length == 0) {
            return res.json({
                success: 'false',
                message: 'OTP NOT Found'
            })
        }
        //validate otp▐
        else if (recentOtp.otp !== otp) {
            return res.json({
                success: false,
                message: 'OTP do not match'
            })
        }

        //hash pass
        const hashedPassword = await bcrpt.hash(password, 10);

        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null
        })
        //create entry in db
        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPassword,
            accountType,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`
        })
        return res.status(200).json({
            success: true,
            message: 'User is registered Successfully'
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "User can not registered , please try again later"
        })
    }

}
//signin
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required ,please try again';
            })
        }
        const user = await User.findOne({ email }).populate("additionalDetails");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not Registered , Please create account first'
            })
        }
        const payload = {
            email: user.email,
            id: user._id,
            accountType: user.accountType
        }
        if (await bcrpt.compare(user.password, password)) {
            const token = jwt.sign(payload, process.env.SECRET_KEY, {
                expiresIn: '2h'
            })

            user.token = token;
            user.password = undefined;

            //create cokkie
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 100),
                httpOnly:true
            }
            res.cookie('token', token, options).status(200).json({
                success: true,
                token,
                user,
                message: 'Logged in Successfully'
            })
        }
        else{
            return res.status(400).json({
                success:false,
                message:'wrong password'
            })
        }
    } catch (err) { 
        return res.status(500).json({
            success:false,
            message:'Log in failure , please try again later'
        })
    }
}
//change password 