import { Router } from 'express'
import multer from 'multer'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import uploadConfig from '../config/upload'
import CreateUserService from '../services/CreateUserService'
import UpdateAvatarUserService from '../services/UpdateAvatarUserService'

const usersRouter = Router()
const upload = multer(uploadConfig)

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body

  const createUser = new CreateUserService()

  const user = await createUser.execute({
    name,
    email,
    password
  })

  const userWithoutPassword = { ...user, password: undefined }

  return response.json(userWithoutPassword)
})

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateAvatarUser = new UpdateAvatarUserService()
    const user = await updateAvatarUser.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename
    })
    return response.json({ user: { ...user, password: undefined } })
  }
)

export default usersRouter
