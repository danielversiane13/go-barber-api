import express from 'express'
import routes from './routes'

const app = express()

app.use(express.json())
app.use(routes)

app.get('/', (request, response) => {
  const message = 'Here is Ok!'
  return response.json({ message })
})

export default app
