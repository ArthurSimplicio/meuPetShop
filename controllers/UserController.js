import bcrypt from 'bcrypt'
import { User } from '../models/User.js'
import { createUserToken } from '../helpers/create-user-token.js'

class UserController {
   static async register(req, res) {
      const {
         name,
         email,
         phone,
         password,
         confirmpassword
      } = req.body

      //Validacoes
      if (!name) {
         res.status(422).json({ message: 'Nome obrigatório' })
         return
      }
      if (!email) {
         res.status(422).json({ message: 'Email obrigatório' })
         return
      }
      if (!phone) {
         res.status(422).json({ message: 'Numero obrigatório' })
         return
      }
      if (!password) {
         res.status(422).json({ message: 'Senha obrigatória' })
         return
      }
      if (!confirmpassword) {
         res.status(422).json({ message: "Confirme a senha" })
         return
      }
      if (confirmpassword !== password) {
         res.status(422).json({ message: 'Senha e confirmacao devem ser iguais' })
         return
      }

      const userExists = await User.findOne({ email })

      if (userExists) {
         res.status(422).json({ message: 'Use outro email por favor!' })
         return
      }

      const salt = await bcrypt.genSalt(12)
      const passwordHash = await bcrypt.hash(password, salt)

      const user = new User({
         name,
         email,
         phone,
         password: passwordHash
      })

      try {
         const newUser = await user.save()
        createUserToken(newUser, req, res )
      } catch (error) {
         res.status(500).json({ message: error })
      }

   }

   static async login(req, res) {
      const {email, password} = req.body
      if(!email){
         res.status(422).json({
            message: "Email obrigatorio"
         })
      }
      if(!password){
         res.status(422).json({
            message: "Senha obrigatoria"
         })
      }

      const user = await User.findOne({email})
      if(!user){
         res.status(422).json({
            message: 'Não há usuário com esse email'
         })
         return
      }
      const checkPassword = await bcrypt.compare(password, user.password)
      if(!checkPassword){
         res.status(422).json({
            message: 'Senha invalida!'
         })
         return
      }

   }

   static async getAll(req, res) {
      try {
         const users = await User.find();
         res.status(200).json({users})
      } catch (error) {
         res.status(400).json({ message: error })
      }
   }
}

export { UserController }