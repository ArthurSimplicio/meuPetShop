import express from 'express'
import cors from 'cors'
import { UserRoutes } from './routes/UserRoutes.js'
import { connect } from './db/conection.js'

const app = express()
app.use(cors())
app.use(express.json())

const allowedOrigins = [
  'https://arthursimplicio.github.io',
  'https://arthursimplicio.github.io/teste/'
];
app.use(cors({credentials: true, origin: allowedOrigins}))

app.use(express.static('public'))
app.use('/users', UserRoutes)

app.listen(5000, () => console.log('Deu certo'))