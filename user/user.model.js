import {Schema, model } from 'mongoose';

const schema = new Schema ({
    username: {type: String, required: true},
    gh_id: {type: Number, required: true},
    avatar_url: {type: String, default: ''}
})

export const UserModel = model('User', schema)