import {GH_AUTH_DATA} from "../config/env.config.js";
import {userService} from "../user/user.service.js";

class AuthService {

    login () {
        return {
            client_id: GH_AUTH_DATA.client_id,
            redirect_uri: GH_AUTH_DATA.redirect_uri
        }
    }

    async success (code) {

        const token = await userService.getGhToken(code)

        const data = await userService.getGhUser(token)

        const user = await userService.getOne({username: data.login})

        if(!user){

            await userService.create({
                username: data.login,
                gh_id: data.id,
                avatar_url: data.avatar_url
            })

        }

        return token
    }

}

export const authService = new AuthService()