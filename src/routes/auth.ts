import express, {type Request, type Response} from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/user.js'
import { registerValidations, loginValidations } from '../middleware/validations.js'
import { validate } from '../middleware/validate.js'

const authRouter = express.Router()

authRouter.post('/signup', registerValidations, validate, async (req: Request, res: Response) => {
    try{
        const { username, password } = req.body
        const user = await User.findOne({ username: username})
        if(user){
            return res.status(409).json({
                status: "failed",
                message: "user already exist"
            })
        }

        const salt = parseInt(process.env.SALT!)

        if(!salt){
            throw new Error('salt not defined in env')
        }
        
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User({
            username: username,
            password: hashedPassword
        })

        await newUser.save()
        return res.status(201).json({
            status: "success",
            message: newUser
        })
    }
    catch(error){
        return res.status(409).json({
            status: "failed",
            message: error
        })
    }
})

authRouter.post('/login', loginValidations, validate, async (req: Request, res: Response) => {
    try{
        const { username, password } = req.body
        const user = await User.findOne({ username: username})
        if(!user){
            return res.status(409).json({
                status: "failed",
                message: "user does not exist"
            })
        }
    
        const isMatched = await bcrypt.compare(password, user.password)
        if(!isMatched){
            return res.status(403).json({
                status: "failed",
                message: "wrong password"
            })
        }

        const secret = process.env.JWT_SECRET
        const id = user._id
        const token = jwt.sign({ id }, secret!)
        res.status(200).json({
            status: "success",
            message: "logged in",
            token: token
        })
    }
    catch(error){
        return res.status(409).json({
            status: "failed",
            message: error
        })
    }
})

export default authRouter