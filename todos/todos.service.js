import {TodosModel} from "./todos.model.js";

class TodosService {

    async getAll (owner) {
        return TodosModel.find({owner})
    }

    async create (owner, title){
        const newTodo = new TodosModel({
            title, owner
        })

        await newTodo.save()

        return newTodo
    }

    async update (owner, id,  title){

        console.log(title)

        const todo = await this.getOne({owner, _id: id})

        if(!todo){
            throw new Error(`Can't find note!`)
        }

        return TodosModel.findByIdAndUpdate(id, {title, updated_at: Date.now()})
    }

    async delete (owner, id){

        const todo = await this.getOne({owner, _id: id})

        if(!todo){
            throw new Error(`Can't find note!`)
        }

        return TodosModel.findByIdAndDelete(id)
    }

    async getOne (query){
        return TodosModel.findOne(query)
    }

}

export const todosService = new TodosService()