const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../modals/User')
//auth 
exports.auth = async (req, res, next) => {
    try {
        //extract token
        const token = req.cookie.token || req.header('Authorization').replace('Bearer', "").trim();

        if (!token) {
            return res.staus(401).json({
                success: false,
                message: 'Token is missing'
            })
        }
        //verify the token

        try {
            const decode = jwt.verify(token, process.env.SECRET_KEY)
            console.log(decode);
            req.user = decode;
        }
        catch (err) {
            return res.status(401).json({
                success: false,
                message: 'Token is invalid'
            })
        }
        next();
    } catch (err) {

        return res.status(500).json({
            success: false,
            message: 'Something went wrong while validation the token'
        })
    }
}

//isstudent
exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== 'Student') {
            return res.status(401).json({
                success: false,
                message: 'This is a protected route for students only'
            })
        }
        next()
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'user role can not be verified'
        })
    }
}
//isinstructor
exports.isIntructor = async (req, res, next) => {
    try {
        if (req.user.accountType !== 'Instructor') {
            return res.status(401).json({
                success: false,
                message: 'This is a protected route for Instructor only'
            })
        }
        next()
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'user role can not be verified , try again later'
        })
    }
}
exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType !== 'Admin') {
            return res.status(401).json({
                success: false,
                message: 'This is a protected route for Admin only'
            })
        }
        next()
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'user role can not be verified , try again later'
        })
    }
}

