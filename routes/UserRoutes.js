import Router from "express"
import { UserController } from "../controllers/UserController.js"

const UserRoutes = Router()
UserRoutes.get('/', UserController.getAll)
UserRoutes.post('/register', UserController.register)
UserRoutes.post('/login', UserController.login)

export {UserRoutes}