const Tag = require('../modals/tags');

exports.createTag = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: 'All field are required'
            })
        }
        //create entry in db;
        const tagDetails = await Tag.create({
            name: name,
            description: description
        })
        console.log(tagDetails);
        return res.status(200).json({
            success: false,
            message: 'Tag created successfully'
        })
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

//get All Tags
exports.showAllTags = async (req, res) => {
    try {
        const allTags = await Tag.find({}, { name: true, description: true });
        res.status(200).json({
            success:true,
            message:'Tags fetched successfully'
        })
    } catch (err) {
        res.status(500).json({
            success: true,
            message: "Can't fectched tags"
        }) }
}