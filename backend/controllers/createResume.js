const Resume = require('../models/resume');

exports.createResume = async (req, res) => {  
  try {
    const { title, primaryemail, username } = req.body;
    const newResume = new Resume({
      title,
      primaryemail,
      username
    });

    await newResume.save();
    res.status(201).json({ message: 'Resume created', resume: newResume, resumeid: newResume._id});
  } catch (err) {
    console.error("Error in creating resume ",err);
    res.status(500).json({ message: 'Server error' });
  }
};


