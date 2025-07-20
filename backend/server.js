const express = require('express')
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/database');
const app = express()
const router = require('./routes/resumeRoutes.js')



app.use(cors({
  origin: 'https://ai-resume-builder-kevins-projects-1bc07b22.vercel.app/',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}))

app.use(express.json())

dotenv.config()
const PORT = process.env.PORT

connectDB()

app.use('/api/resumes', router);

app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`)
})