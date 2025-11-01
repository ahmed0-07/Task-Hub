import { body } from "express-validator";

export const registerValidations = [
    body('username').notEmpty(),
    body('password').notEmpty().isLength({ min: 6}).withMessage('Password too short')
] 

export const loginValidations = [
    body('username').notEmpty(),
    body('password').notEmpty().withMessage('Password req')
]