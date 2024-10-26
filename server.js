
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const sequelize = require('./config/database')
const schema = require('./graphql/schema')
const authMiddleware = require('./middlewares/auth')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT


app.use(cors())
app.use(bodyParser.json())

app.use(authMiddleware)

app.use(
    '/graphql',
    graphqlHTTP((req) => ({
        schema: schema,
        graphiql: process.env.NODE_ENV === 'development',
        context: { user: req.user },
    }))
)

app.get('/', (req, res) => {
    res.send('Library GraphQL API is running!')
})

sequelize
    .sync() // { force: true }
    .then(() => {
        console.log('Database connected successfully.')
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}/graphql`)
        })
    })
    .catch((err) => {
        console.error('Error connecting to the database: ', err)
    })
