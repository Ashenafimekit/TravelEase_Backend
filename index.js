const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const app = express();

app.use(express.json());
app.use(cors());

const userRoute = require('./routes/userRoutes')
const contactRoute = require('./routes/contactRoutes')
const busRoute = require('./routes/busRoute')
const bookRoute = require('./routes/bookRoute')

mongoose.connect("mongodb://localhost:27017/TravelEase", {useNewUrlParser : true, useUnifiedTopology : true})
.then(()=> console.log("monogDB connected"))
.catch(err => console.log(err))

app.use('/users',userRoute)
app.use('/contact',contactRoute)
app.use('/bus',busRoute)
app.use('/book',bookRoute)

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
