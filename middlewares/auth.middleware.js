import {userService} from "../user/user.service.js";

export async function authMiddleware (req, res, next){
    if(req.method === 'OPTIONS'){
        next()
    }

    try {

        const cookies = req.cookies;

        if(!cookies || !cookies.gh_token){
           return res.redirect('/auth/login')
        }

        const user = await userService.getUserByToken(cookies.gh_token)

        if(!user){
            return res.redirect('/auth/login')
        }

        req.user = user

        next()

    } catch (error) {
        return res.redirect('/auth/login')
    }
}