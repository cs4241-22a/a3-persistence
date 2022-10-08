import {todosService} from "./todos.service.js";


class TodosController {

    async getAll (req, res) {

        const user = req.user

        const todos = await todosService.getAll(user._id)

        return res.render('index', {todos: todos ? todos : []})

    }

    async create (req, res) {
        try {

            const user = req.user

            const {title} = req.body

            await todosService.create(user._id, title)

            return res.status(200).json({message: 'Success'})

        }catch (e) {
            console.log('todo create error')
            res.status(500).json({message: 'Note create error', error: e})
        }
    }

    async update (req, res) {
        try {

            const user = req.user

            const {id} = req.params

            const {title} = req.body

            await todosService.update(user._id, id, title)

            return res.status(200).json({message: 'Success'})

        }catch (e) {
            console.log('todo create error', e)
            res.status(500).json({message: 'Note create error', error: e})
        }
    }

    async delete (req, res) {
        try {

            const user = req.user

            const {id} = req.params

            await todosService.delete(user._id, id)

            res.json({message: 'Success'})

        }catch (e) {
            console.log('Note create error')
            res.status(500).json({message: 'Note create error', error: e})
        }
    }



}

export const todosController = new TodosController()