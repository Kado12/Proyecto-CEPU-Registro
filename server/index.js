const express = require('express')
const cors = require('cors')
const config = require('./config/environments.js')
const registerRoutes = require('./routes/register.routes.js')


const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api', registerRoutes)



app.listen(config.app.port, () => {
  console.log(`Server listening on port ${config.app.port}`)
})