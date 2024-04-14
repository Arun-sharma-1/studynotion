const Section = require('../modals/Section');
const SubSection = require('../modals/SubSection')
const { uploadFileToCloudinary } = require('../utils/imageUploader')
exports.createSubSecton = async (req, res) => {
    try {
        const { sectionId, title, description } = req.body
        const video = req.files.video

        // Check if all necessary fields are provided
        if (!sectionId || !title || !description || !video) {
            return res
                .status(404)
                .json({ success: false, message: "All Fields are Required" })
        }
        console.log(video)

        // Upload the video file to Cloudinary
        const uploadDetails = await uploadFileToCloudinary(
            video,
            process.env.FOLDER_NAME
        )
        const SubSectionDetails = await SubSection.create({
            title: title,
            timeDuration: `${uploadDetails.duration}`,
            description: description,
            videoUrl: uploadDetails.secure_url,
        })
        console.log(uploadDetails)
        // Update the corresponding section with the newly created sub-section
        const updatedSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            { $push: { subSection: SubSectionDetails._id } },
            { new: true }
        ).populate("subSection")
        return res.status(200).json({ success: true, data: updatedSection })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}