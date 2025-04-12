import { Router } from "express"
import { createStartup, deleteStartup, getAllStartups, getStartupById, updateStartup } from "../controllers/startupController.js"
import { upload } from "../configs/multer.js"

const startupRouter = Router()
startupRouter.route('/').get(getAllStartups).post(upload.single('logo') ,createStartup)
startupRouter.route('/:id').get(getStartupById).delete(deleteStartup).patch(updateStartup)

export default startupRouter