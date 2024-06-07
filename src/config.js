const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/registrationFormDB");

//Check database Connections
connect.then(() => {
    console.log("Database Connected Successfull");
})
.catch(() =>{
    console.log("Didn't connect Sorry");

});

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

//Collection Part
const collection = new mongoose.model("users", LoginSchema);

module.exports = collection;
