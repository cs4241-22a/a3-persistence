import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cookieParser from 'cookie-parser';
import notesRoutes from './todos/todos.route.js'
import errorRoutes from './error/404.route.js'
import authRoutes from './auth/auth.route.js'
import {MONGO_URI} from "./config/env.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()

// middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use('/public', express.static('public'));

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const PORT = process.env.PORT || 5000

app.use('/', notesRoutes)
app.use('/', authRoutes)
app.use('/', errorRoutes)

const start = async () => {

    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true
        }, (err) => {
            if(err){
                console.log('Error db connect')
            }else {
                console.log('db connected')
            }
        })

        app.listen(PORT, () => {
            console.log(`Server has been started in PORT ${PORT}`)
        })
    }catch (e) {
        console.log('Server start error')
    }
}

start()
