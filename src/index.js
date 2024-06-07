const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");

const app = express();

//Conversion of data to JSON
app.use(express.json());

app.use(express.urlencoded({extended: false}));


//use EJS as the view Engine
app.set('view engine', 'ejs');
//use static file
app.use(express.static("public"));

app.get('/', (req, res) => {
    
    res.render("login");

});


app.get('/signup', (req, res) => {

    res.render("signup");
});
app.get('/home', (req, res) => {

    res.render("home");
});
app.get("/error", (req, res) => {
    res.sendFile(__dirname + "/public/error.html");
});

//User Registration
app.post("/signup", async (req, res) => {

    // const data ={
    //     name: req.body.username,
    //     email: req.body.email,
    //     password: req.body.password

    // }

    // const userdata = await collection.insertMany(data);
    // console.log(userdata);
// });
    try {
        const { name, email, password } = req.body;
        
        // Create registration data object
        const registrationData = {
            name,
            email,
            password
        };


        //Check if the user already exists in the database
        const existingUser = await collection.findOne({name: registrationData.email});

        if (existingUser) {
            res.send("User already exists. Please choose a different Username.");
        }else{
            //hash the password
            const saltRounds = 10; //No. of Saltrounds for Hashing
            const hashedPassword = await bcrypt.hash(registrationData.password, saltRounds);
            registrationData.password = hashedPassword; 
            // Insert registration data into the database
            // await Registration.create(registrationData);
            const userdata = await collection.insertMany(registrationData);
            // console.log(registrationData);
            
            console.log("Registration Successful");
            // Redirect user to login page after successful registration
            return res.redirect("/");
        };
        
        
        
    } catch (error) {
        console.error("Error registering user:", error);
        
        // Redirect user to error page in case of error
        return res.redirect("/error");
    };
    });

//Login User
app.post("/", async (req, res) => {
    // console.log("Error11");
    try{
        const check = await collection.findOne({name: req.body.username});
        // console.log("Error0");
        if (!check) {
            res.send("Username not found");
            // console.log("Error1");
        }
        //compare the hash password from the database PT
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        // console.log("Error2");
        if (isPasswordMatch){
            res.render("home");
            // console.log("Error3");
        }else{
            req.send("Wrong Password");
            // console.log("Error4");
        }


    }catch{
        res.send("Wrong Credentials");
        // console.log("Error5");
    }
});



const port = 5000;
app.listen(port, () => {
    console.log(`Server running on Port: ${port}`);
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