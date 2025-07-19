const Resume = require("../models/resume");

exports.getResumes = async (req, res) => {
	try {
        const {primaryemail} = req.body;
		const resumes = await Resume.find({primaryemail});
		res.status(200).json(resumes);
	} catch (error) {
		res.status(500).json({ message:"Error fetching resumes" });
	}
};

