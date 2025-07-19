const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  username: { type: String, required: true },
  designation: { type: String,},
  summary: { type: String,},

  primaryemail: { type: String, required: true },
  email: {type: String},
  phone: { type: String},
  linkedin: { type: String},
  github: { type: String},
  
  education:[
    {
      degree: { type: String},
      institute: { type: String},
      eduStart: { type: Date},
      eduEnd: { type: Date},
      result: { type: String},
    } 
  ],
  
  workexperience:[
    {
      company: { type: String},
      role: { type: String},
      workStart: { type: Date},
      workEnd: { type: Date},
      workexpDescription: { type: String},
    }
  ],

  projects:[
    {
      projectTitle: { type: String},
      projectLink: { type: String},
      projectDescription: { type: String},
    }
  ],

  skills: [
    {
      skillName: { type: String},
    }
  ],

  certificates: [
    {
      certiTitle: { type: String},
      certiIssuer: { type: String},
      certiLink: { type: String},
    }
  ],

  createdAt: { type: Date, default: Date.now }

  
});

module.exports = mongoose.model('Resume', resumeSchema);
