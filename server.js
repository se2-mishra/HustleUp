const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require('cors');



const app = express();
app.use(cors({
    origin: 'http://localhost:5500' // Allow requests from this specific origin
  }));
dotenv.config();

const port = process.env.PORT || 5500;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const db_username = process.env.MONGODB_USERNAME;
const db_password = process.env.MONGODB_PASSWORD;


const uri = `mongodb+srv://shreepad_16:Shreepad1610@cluster0.xmlmwyg.mongodb.net/registrationFormDB`;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(uri, options)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Error connecting to MongoDB:", err));

var db = mongoose.connection; // Keep this line for callback approach

db.on('error', console.error.bind(console, "connection error"));

db.once('open', function () {
  console.log("Connection succeeded");
});

const registrationSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const Registration = mongoose.model("Registration", registrationSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/registration.html");
});


app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Create registration data object
        const registrationData = {
            name,
            email,
            password
        };

        // Insert registration data into the database
        await Registration.create(registrationData);
        
        console.log("Registration Successful");
        
        // Redirect user to login page after successful registration
        return res.redirect("http://127.0.0.1:5500/public/login.html");
    } catch (error) {
        console.error("Error registering user:", error);
        
        // Redirect user to error page in case of error
        return res.redirect("/error");
    }
});

/*
app.post('/register', function(req,res){ 
    var name = req.body.name; 
    var email =req.body.email; 
    var password = req.body.password; 
    
  
    var data = { 
        "name": name, 
        "email":email, 
        "password":password
        
    } 
db.collection('details').insertOne(data,function(err, collection){ 
        if (err) throw err; 
        console.log("Record inserted Successfully"); 
              
    }); 
          
    return res.redirect('http://127.0.0.1:5500/public/login.html'); 
}) 

*/
app.get("/success", (req, res) => {
    res.sendFile(__dirname + "/public/login.html");
});

app.get("/error", (req, res) => {
    res.sendFile(__dirname + "/public/error.html");
});

app.post('/subscribe', async (req, res) => {
    const newSubscription = new Subscription(req.body);
    try {
      const savedSubscription = await newSubscription.save();
      res.status(201).json(savedSubscription);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });