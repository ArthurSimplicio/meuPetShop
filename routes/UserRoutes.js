import Router from "express"
import { UserController } from "../controllers/UserController.js"

const UserRoutes = Router()
UserRoutes.get('/', UserController.getAll)
UserRoutes.post('/register', UserController.register)

export {UserRoutes}