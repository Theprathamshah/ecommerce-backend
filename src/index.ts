import axios from 'axios'
import express from 'express'
import cors from 'cors'
import logger from 'morgan';
import healthCheckRouter from './healthCheck';
import authRouter from './routers/authRouter'
const app = express();

app.use(cors());
app.use(express.json());
app.use(logger('dev'))
app.use("/", healthCheckRouter);
app.use('/auth', authRouter);

export default app;