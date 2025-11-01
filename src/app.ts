import {} from './config/env.js'
import express from 'express'
import passport from './config/passport.js'
import startServer from './config/server.js'
import authRouter from './routes/auth.js'
import tasksRouter from './routes/tasks.js'

const app = express()

startServer()

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(passport.initialize())

app.use('/auth', authRouter)
app.use('/tasks', tasksRouter)

export default app