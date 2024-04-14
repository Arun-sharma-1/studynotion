const Section = require('../modals/Section');
const Course = require('../modals/Course');
const { findByIdAndUpdate } = require('../modals/Otp');

//create a section
exports.createSection = async (req, res) => {
    try {
        const { sectionName, courseId } = req.body;

        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: 'Missing Properties'
            })
        }
        //create section
        const newSection = await Section.create({ sectionName });
        //update course with section ObjectId

        const updatedCourse = await Course.findByIdAndUpdate({ courseId }, {
            $push: {
                courseContent: newSection._id
            }
        }, { new: true }).populate({ path: 'courseContent', populate: { path: 'subsection' } }).exec()

        res.status(200).json({
            success: true,
            message: "Section created successfully",
            updatedCourse,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}

//update a section
exports.updateSection = async (req, res) => {
    try {
        //fetch data
        const { sectionName, sectionId } = req.body;
        if (!sectionName || !sectionId) {
            return res.status(400).json({
                success: false,
                message: 'Missing Properties'
            })
        }

        const section = await Section.findByIdAndUpdate(
            sectionId,
            { sectionName },
            { new: true }
        )
        res.status(200).json({
            success: false,
            message: "Section updatedr",

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}
//delete a section
exports.deleteSection = async (req, res) => {
    try {
        const { sectionId, courseId } = req.body;
        await Section.findByIdAndDelete(sectionId);
        res.status(200).json({
            success: true,
            message: 'Section deleted successfully'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}