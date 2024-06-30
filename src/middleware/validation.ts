import type { Request, Response, NextFunction } from 'express'
import { type AnyZodObject, ZodError } from 'zod'
import { StatusCodes } from 'http-status-codes'

export const validateSchema =
    (schema: AnyZodObject) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = schema.parse(req.body)
            next()
        } catch (error) {
            if (error instanceof ZodError) {
                const messages = error.errors.map((issue) => ({
                    message: `${issue.path.join('.')} ${issue.message}`,
                    path: issue.path.join('.'),
                    type: issue.code,
                }))

                res.status(StatusCodes.BAD_REQUEST).json({
                    error: 'Invalid data',
                    issues: messages,
                })
            } else {
                console.error(error)
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    error: 'Internal Server Error',
                })
            }
        }
    }
