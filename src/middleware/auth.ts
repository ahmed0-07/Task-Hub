import { type Request, type Response, type NextFunction } from "express";
import passport from "../config/passport.js";

export const authenticate = passport.authenticate('jwt', { session: false })

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if(!req.user || req.user.role !== 'admin'){
        return res.status(401).json({
            status: "failed",
            message: "user can not add tasks"
        })
    }

    next()
}
