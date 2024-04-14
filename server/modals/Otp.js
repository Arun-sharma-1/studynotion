const mongoose = require('mongoose'); 
const mailSender = require('../utils/mailSender')
const OtpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5 * 60;
    }
});
const sendVerificationEmail = async (email, otp) => {
    try {
        const mailResponse = await mailSender(email, "Verfication Email from StudyNotion", otp);
        console.log('Response from mail ', mailResponse);
    } catch (err) {
        console.log('Error came ', err);
    }
}
OtpSchema.pre('save', async function (next) {
    await sendVerificationEmail(this.email, this.otp);
    next();
})
module.exports = mongoose.model('Otp', OtpSchema)