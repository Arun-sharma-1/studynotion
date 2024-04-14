const Course = require('../modals/Course')
const Tag = require('../modals/tags');
const User = require('../modals/User');
const { uploadFileToCloudinary } = require('../utils/imageUploader')
require('dotenv').config()
//create course handler function
exports.createCourse = async (req, res) => {
    try {
        //fetch data
        const { courseName, courseDescription, whatWillYouLearn, price, tag } = req.body;

        //get thumbnail
        const thumbnail = req.files.thumbnailImage;

        if (!courseName || !courseDescription || !whatWillYouLearn || !price || !tag || !thumbnail) {
            return res.status(400).json({
                success: false,
                message: 'All field are mandatory'
            })
        }

        //check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log('instructor details ', instructorDetails);

        if (!instructorDetails) {
            return res.status(400).json({
                success: false,
                message: 'Instructor not found'
            })
        }
        //check given tag is valid or not ??? 
        const tagDetails = await Tag.findById(tag); // tag is id 
        if (!tagDetails) {
            return res.status(400).json({
                success: false,
                message: 'Tag not found'
            })
        }

        //upload image to cloudinary;
        const thumbnailImage = await uploadFileToCloudinary(thumbnail, process.env.FOLDER_NAME);

        //creat an entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatWillYouLearn: whatWillYouLearn,
            price,
            tag: tagDetails._id,
            thumbnail: thumbnailImage.secure_url
        })

        //add the new course to the user 
        const updatedCourse = await User.findByIdAndUpdate({ _id: instructorDetails._id }, {
            $push: {
                courses: newCourse._id
            }
        }, { new: true })

        //TODO: update tag schema
        // await Tag.findByIdAndUpdate({_id:tagDetails._id},{
        //     $push:{
        //         course:updatedCourse._id
        //     }
        // })
        res.status(200).json({
            success: true,
            data: newCourse,
            message: "Course Created Successfully",
        })

    }
    catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Failed to create course",
            error: error.message,
        })
    }
}


//getAll course handler function
exports.getAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find(

            {
                courseName: true,
                price: true,
                thumbnail: true,
                instructor: true,
                ratingAndReviews: true,
                studentsEnrolled: true,
            }
        ).populate("instructor")
            .exec()
        return res.status(200).json({
            success: true,
            data: allCourses,
        })
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            success: false,
            message: `Can't Fetch Course Data`,
            error: error.message,
        })
    }
}