import { Router } from 'express'

import AuthenticateUserService from '../services/AuthenticateUserService'

const sessionsRouter = Router()

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body

    const authenticateUser = new AuthenticateUserService()

    const { user, token } = await authenticateUser.execute({
      email,
      password
    })

    const userWithoutPassword = { ...user, password: undefined }

    return response.json({ user: userWithoutPassword, token })
  } catch (err) {
    return response.status(400).json({ message: err.message })
  }
})

export default sessionsRouter
