import mongoose from 'mongoose'
import express, { Express } from 'express';
import dotenv from 'dotenv';
import eventRouter from './routers/hamal-router';
import userRouter from './routers/user-router';
import errorHandler from './middlewares/error-middleware';
import cookieParser from 'cookie-parser'
import authHandler from './middlewares/auth-middleware'


dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/api/user', userRouter)
app.use('/api', authHandler, eventRouter)

app.use(errorHandler)

mongoose.connect('mongodb://127.0.0.1:27017/hamal',
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
  },
  (error) => {
    if (error) {
      console.log(error);
    }
    else {
      app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
      });
    }
  })
