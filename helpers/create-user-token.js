import jwt from 'jsonwebtoken'

const createUserToken = async (user, req, res) => {
    const token = jwt.sign({
        name: user.name, 
        id: user._id
    }, "meusecret")

    res.status(200).json({
        message: "Autenticado",
        token: token,
        userId: user._id
    })

}
export {createUserToken}