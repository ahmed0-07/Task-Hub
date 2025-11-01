import express, {type Request, type Response} from 'express'
import { authenticate, isAdmin } from '../middleware/auth.js'
import Task from '../models/task.js'
import Submission from '../models/submission.js'
import { uploadPDF } from '../config/multer.js'

const tasksRouter = express.Router()

tasksRouter.post('/add-task', authenticate, isAdmin, async (req: Request, res: Response) => {
    try{
        const { name } = req.body
        const task = new Task({ name: name})
    
        await task.save()
        return res.status(201).json({
            status: "success",
            message: task
        })
    }
    catch(error){
        return res.status(409).json({
            status: "failed",
            message: error
        })
    }
})

tasksRouter.post('/submit/:id', authenticate, uploadPDF.single('task'), async (req: Request, res: Response) => {
    try{
        if (!req.file) {
            return res.status(400).json({ error: 'No PDF file uploaded' });
        }
        const id = req.params.id
        const user = req.user?._id
        const path = req.file.path
        const submission = new Submission({
            task: id,
            user: user,
            path: path
        })

        await submission.save()
        return res.status(201).json({
            status: "success",
            message: submission
        })
    }
    catch(error){
        return res.status(409).json({
            status: "failed",
            message: error
        })
    }
})

tasksRouter.post('/grade/:id', authenticate, isAdmin, async (req: Request, res: Response) => {
    try{
        const id = req.params.id
        const { grade } = req.body
        await Submission.findByIdAndUpdate(id, { grade: grade, status: 'graded'})

        return res.status(201).json({
            status: "success",
            message: "graded"
        })
    }
    catch(error){
        return res.status(409).json({
            status: "failed",
            message: error
        })
    }
})

export default tasksRouter