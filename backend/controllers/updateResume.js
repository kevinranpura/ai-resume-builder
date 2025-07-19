const Resume = require('../models/resume');

exports.updateResume = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedResume = await Resume.findByIdAndUpdate(id, updatedData, {new: true,});

    if (!updatedResume) {
      return res.status(404).json({ message: "Resume not found to be updated" });
    }
    res.status(200).json({ message: "Resume updated", resume: updatedResume });
  } catch (err) {
    console.error("Error updating resume:", err);
    res.status(500).json({ message: "Server error" });
  }
};
