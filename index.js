const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
require("dotenv").config()

const app = express();


app.use(express.json());
app.use(cors());

const userRoute = require('./routes/userRoutes')
const contactRoute = require('./routes/contactRoutes')
const busRoute = require('./routes/busRoute')
const bookRoute = require('./routes/bookRoute')
const createDefaultAdmin = require('./createDefaultAdmin'); 
const mongoURL = process.env.MONGODB_URL
const port = process.env.PORT


mongoose.connect(mongoURL)
.then(()=> console.log("monogDB connected"))
.catch(err => console.log(err))

createDefaultAdmin();

app.use('/users',userRoute)
app.use('/contact',contactRoute)
app.use('/bus',busRoute)
app.use('/book',bookRoute)

app.listen(port, () => {
  console.log("server is running on port 3000");
});
