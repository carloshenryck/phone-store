import express from 'express'
import cors from 'cors'
import registerRoute from './routes/register.route'
import loginRoute from './routes/login.route'
import { createErrorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/login', loginRoute)
app.use('/register', registerRoute)
createErrorHandler(app)

export default app;