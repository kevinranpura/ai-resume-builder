const Resume = require("../models/resume");

exports.getById = async (req, res) => {
    try {
        const {id} = req.body;
        const resume = await Resume.findById({_id:id});
        res.json({ success:true, data:resume});
    } catch (error) {
        res.status(500).json({ message:"Error fetching resume with id" });
    }
};