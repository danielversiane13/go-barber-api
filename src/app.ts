import 'reflect-metadata'

import express from 'express'
import routes from './routes'
import './database/connection'

const app = express()

app.use(express.json())
app.use(routes)

app.get('/', (request, response) => {
  const message = 'Here is Ok!'
  return response.json({ message })
})

export default app
