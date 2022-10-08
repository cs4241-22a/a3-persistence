import {Router} from 'express'
import {authMiddleware} from "../middlewares/auth.middleware.js";
import {todosController} from "./todos.controller.js";

const router = Router()

router.get('/', authMiddleware, todosController.getAll)
router.post('/api/todos/create', authMiddleware, todosController.create)
router.put('/api/todos/edit/:id', authMiddleware, todosController.update)
router.delete('/api/todos/delete/:id', authMiddleware, todosController.delete)


export default router