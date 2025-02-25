import { Router } from "express"
import { createStartup, deleteStartup, getAllStartups, getStartupById } from "../controllers/startupController.js"

const startupRouter = Router()
startupRouter.route('/').get(getAllStartups).post(createStartup)
startupRouter.route('/:id').get(getStartupById).delete(deleteStartup)

export default startupRouter