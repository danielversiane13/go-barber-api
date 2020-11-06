import { Router } from 'express'
import { parseISO } from 'date-fns'

import AppointmentRepository from '../repositories/Appointment'
import CreateAppointmentService from '../services/CreateAppointmentService'
import { getCustomRepository } from 'typeorm'

const appointmentsRouter = Router()

appointmentsRouter.get('/', async (request, response) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository)
  const appointments = await appointmentRepository.find()
  return response.json(appointments)
})

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body

    const parsedDate = parseISO(date)

    const createAppointment = new CreateAppointmentService()

    const appointment = await createAppointment.execute({
      provider_id,
      date: parsedDate
    })

    return response.json(appointment)
  } catch (err) {
    return response.status(400).json({ message: err.message })
  }
})

export default appointmentsRouter
