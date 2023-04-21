import mongoose from 'mongoose';
require("dotenv").config();

const dbConnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>{
        console.log("DB connection is Successfull!")
    })
    .catch((e)=>{
        console.log("Issue in connecting to DB!");
        console.error(e);
        process.exit(1);
    })
}

export default {dbConnect};