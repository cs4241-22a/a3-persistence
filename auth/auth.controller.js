import {authService} from "./auth.service.js";

class AuthController {

    async login (req, res) {
        try {

            const authData = authService.login()

            res.render('login', {authData})

        }catch (e) {
            console.log(e)
            res.status(500).json({message: 'error', error: e})
        }
    }

    async success (req, res) {
        try {

            const {code} = req.query

            if(!code){
                return res.redirect('/auth/login')
            }

            const token = await authService.success(code)

            res.cookie('gh_token', token, {maxAge: 60 * 60 * 1000, httpOnly: true})

            return res.redirect('/')

        }catch (e) {
            console.log(e)
            res.status(500).json({message: 'error', error: e})
        }
    }
}

export const authController = new AuthController()