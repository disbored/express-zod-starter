import express, { type Request, type Response } from 'express'
import { greet } from './modules/greet'

import { validateSchema } from './middleware/validation'
import { greetSchema } from './schemas/greet'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    return res.status(200).send({
        message: 'Make a post request to /greet with body name',
    })
})

router.post('/greet', validateSchema(greetSchema), greet)

export default router
