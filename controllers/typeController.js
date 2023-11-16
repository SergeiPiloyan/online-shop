const { Type } = require('../models/models')
const apiError = require('../error/ApiError')

class TypeController {

    async create(req, res) {
        const { name } = req.body;
        const type = await Type.create({ name })
        res.json(type)
    }

    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }

    async delete(req, res) {

    }

}

module.exports = new TypeController()