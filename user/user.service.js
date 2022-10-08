import axios from "axios";
import {parse} from "query-string";
import {GH_AUTH_DATA} from "../config/env.config.js";
import {UserModel} from "./user.model.js";

class UserService {

    async create (data) {
        const newUser = new UserModel(data)

        await newUser.save()
    }

    async getOne (query) {
        return UserModel.findOne(query)
    }

    async getUserByToken (token) {

        const ghUser = await this.getGhUser(token)

        return UserModel.findOne({username: ghUser.login})

    }

    async getGhToken (code) {
        try {

            const queryParams = `client_id=${GH_AUTH_DATA.client_id}&client_secret=${GH_AUTH_DATA.client_secret}&code=${code}`

            const response = await axios.get(`https://github.com/login/oauth/access_token?${queryParams}`)

            const {access_token} = parse(response.data)

            if (!access_token) {
                throw new Error('Error with getting token')
            }

            return Promise.resolve(access_token)

        } catch (e) {
            console.log('get gh token error: ', e)
            return Promise.reject('Error with getting token')
        }
    }

    async getGhUser (access_token) {
        try {

            const userResponse = await axios.get(`https://api.github.com/user`, {
                headers: {Authorization: `Bearer ${access_token}`}
            })

            return Promise.resolve(userResponse.data)

        } catch (e) {
            console.log('get gh token error: ', e)
            return Promise.reject('Error with getting token')
        }
    }

}

export const userService = new UserService()