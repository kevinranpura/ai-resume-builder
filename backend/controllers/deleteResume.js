const Resume = require("../models/resume");

exports.deleteResume = async (req, res) => {
    try {
        const {id} = req.params;        
        const resume = await Resume.findByIdAndDelete(id);
        res.json({ success: true, data: resume });
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
};