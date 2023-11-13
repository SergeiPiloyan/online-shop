require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const models = require('./models/models')
const router = require('./routers/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleWare')


const PORT = process.env.PORT || 5000;
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', router)

// обработка ошибок, последний MiddleWare
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`server started on port: ${PORT}`))
    } catch (error) {
        console.log(error);
    }
}

start();