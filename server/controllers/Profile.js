const Profile = require('../modals/Profile')
const User = require('../modals/User')
const Course = require('../modals/Course')
exports.updateProfile = async (req, res) => {
    try {
        const { firstName = "", lastName = "", dateOfBirth = "", about = "", contactNumber = "", gender = "" } = req.body
        const id = req.user.id

        const userDetails = await User.findById(id)
        const profileId = userDetails?.additionalDetails;
        const profile = await Profile.findById(profileId)

        profile.dateOfBirth = dateOfBirth
        profile.about = about
        profile.contactNumber = contactNumber
        profile.gender = gender

        await profile?.save()
        // Find the updated user details
        const updatedUserDetails = await User.findById(id)
            .populate("additionalDetails")
            .exec()

        return res.json({
            success: true,
            message: "Profile updated successfully",
            updatedUserDetails,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}

//can we schedule this delete operation
exports.deleteAccount = async (req, res) => {
    try {
        const id = req.user.id
        console.log(id)
        const user = await User.findById({ _id: id })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }
        //delete profile
        await Profile.findByIdAndDelete({ _id: user.additionalDetails });
        //delete user
        await User.findByIdAndDelete({ _id: id })

        for (const courseId of user.courses) {
            await Course.findByIdAndUpdate(
                courseId,
                { $pull: { studentsEnroled: id } },
                { new: true }
            )
        }

        await User.findByIdAndDelete({ _id: id })
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "User Cannot be deleted , Please try again later"
        })
    }
}
exports.getAllUserDetails = async (req, res) => {
    try {
        const id = req.user.id
        const userDetails = await User.findById(id)
            .populate("additionalDetails")
            .exec()
        console.log(userDetails)
        res.status(200).json({
            success: true,
            message: "User Data fetched successfully",
            data: userDetails,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}