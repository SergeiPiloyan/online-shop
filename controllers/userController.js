const apiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Basket } = require('../models/models')
const ApiError = require('../error/ApiError')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}


class UserController {

    async registration(req, res, next) {
        const { email, password, role } = req.body

        if (!email || !password) {
            return next(ApiError.badRequest('Incorrect email or password'))
        }

        const candidate = await User.findOne({ where: { email } })
        if (candidate) {
            return ApiError.badRequest('User with this email exists')
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({ email, role, password: hashPassword })
        const basket = await Basket.create({ userId: user.id })
        const token = generateJwt(user.id, user.email, user.role)

        return res.json({ token })
    }

    async login(req, res, next) {

        const { email, password } = req.body

        const user = await User.findOne({ where: { email } })
        if (!user) {
            return next(ApiError.internal('User is not found'))
        }

        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal("User is not found"))
        }

        const token = generateJwt(user.id, email.id, user.role)

        return res.json(token)
    }

    async check(req, res, next) {
        // const { id } = req.query

        // if (!id) {
        //     return next(apiError.badRequest(`id isn't specified`))
        // }

        // return res.jso n(id)
    }
}



module.exports = new UserController()