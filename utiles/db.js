const mongoose = require('mongoose');

module.exports.dbConnect = async () => {
    try {
        if(process.env.mode === 'pro'){
            await mongoose.connect(process.env.DB_PRO_URL, { useNewURLParser: true })
            console.log("PRODUCTION database connect....")
        } else{
            await mongoose.connect(process.env.DB_LOCAL_URL, { useNewURLParser: true })
            console.log("LOCAl database connect....")
        }
       
    } catch (error) {
        console.log(error.message)
    }
}