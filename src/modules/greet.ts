import { type Request, type Response } from 'express'

export const greet = (req: Request, res: Response) => {
    res.json({ message: `Hey ${req.body.name}` })
}
