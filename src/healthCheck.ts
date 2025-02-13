
import { Request, Router, Response } from "express";

const router = Router();

router.get('/',async (req: Request, res:Response) => {
    res.send({message:'server is up and running...'})
})

export default router;