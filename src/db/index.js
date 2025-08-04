import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const connectDB = async () => {
    try {
        // we can also store below in a variable: mongoose returns an object
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`) //* holding the response after connection established
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
        //console.log(connectionInstance) // just to learn
        // not doing app.listen here as goal is purely db connection only
    } catch (error) {
        console.log("MONGODB connection error:- ", error)
        process.exit(1) //* else can throw error
        //note: process given by nodejs.reference of current running application process
        // different exit codes are there
    }
}
export default connectDB