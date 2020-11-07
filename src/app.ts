import 'reflect-metadata'

import express from 'express'
import routes from './routes'
import uploadConfig from './config/upload'

import './database/connection'

const app = express()

app.use(express.json())
app.use('/files', express.static(uploadConfig.directory))
app.use(routes)

app.get('/', (request, response) => {
  return response.json({ message: 'Here is Ok!' })
})

export default app
