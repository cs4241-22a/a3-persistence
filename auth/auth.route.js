import {Router} from 'express'
import {authController} from "./auth.controller.js";

const router = Router()

router.get('/auth/login', authController.login)

router.get('/auth/success', authController.success)


export default router