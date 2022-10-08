import {Schema, model, Types} from 'mongoose';

const schema = new Schema ({
    title: {type: String, required: true},
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date, default: Date.now()},
    owner: {type: Types.ObjectId, ref: 'User'}
})

export const TodosModel = model('Todos', schema)