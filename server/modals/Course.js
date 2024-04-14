const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
    },
    courseDescription: {
        type: String,
        required: true,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    whatWillYouLearn: {
        type: String,
        required: true,
        trim: true,
    },
    courseContent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section'
    },
    ratingAndReviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'RatingAndReviews'
        },

    ],
    price: {
        type: Number,
        required: true,
    },
    tag: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    },
    studentsEntroller: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    ]
})
module.exports = mongoose.model('Course', courseSchema)