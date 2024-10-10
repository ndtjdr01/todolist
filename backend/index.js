const express = require('express')
const app = express()
const cors = require('cors')
const todoRouter = require('./route/todo/todoRoute')
const goalRoute = require('./route//goal/goalRoute')
const goalContentRoute = require('./route/goal/goalContentRoute')
const planRoute = require('./route/plan/planRoute')

require('./database')

app.use(express.json())
app.use(cors())

app.use('/api/todo/',todoRouter)
app.use('/api/goal/',goalRoute)
app.use('/api/goalContent/',goalContentRoute)
app.use('/api/plan/',planRoute)

app.listen(5000,()=> console.log('listening on port...5000'))

// use middleware
// json
// router
// het