const Book = require("../models/book")

exports.createbook = (req, res)=>{
    const {name, phone, payment, departure, destination, date} = req.body
    console.log({name, phone, payment, departure, destination, date})
}