//gONjqskXVi5Tknxo
import mongoose from "mongoose"

const url = `mongodb+srv://arthursimp20_db_user:gONjqskXVi5Tknxo@cluster0.70da3tg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

async function connect() {
   await mongoose.connect(url)
   console.log("Conectamos com Moongose")
}
connect().catch(err => console.log(err))

export {connect}