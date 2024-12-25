const Book = require("../models/book");

exports.createbook = async (req, res) => {
  const { name, phone, seatNumber, payment, departure, destination, date } =
    req.body;
  //console.log(name, phone, seatNumber, payment, departure, destination, date);
  const userId = req.user.id;
  try {
    const bookInfo = new Book({
      userId,
      name,
      phone,
      seatNumber,
      payment,
      departure,
      destination,
      date,
    });
    const bookedSeat = await Book.find({
      departure: departure,
      destination: destination,
      date: date,
    });
    const takenSeats = bookedSeat.map((seat) => seat.seatNumber.toString());

    if (takenSeats.includes(seatNumber)) {
      return res.status(400).json({ message: "Seat Number is taken" });
    } else {
      await bookInfo.save();
      return res.status(201).json({
        message:
          "booked successfully if you want to book another ticket enter name phone and payement option",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server Error" });
  }
};

exports.getbook = async (req, res) => {
  const currentDate = new Date();
  const userId = req.user.id;
  const userRole = req.user.role;

  try {
    let userInfo;
    if (userRole === "admin") {
      // userInfo = await Book.find({ date: { $gte: currentDate } });
      userInfo = await Book.find();
    } else {
      userInfo = await Book.find({ userId, date: { $gte: currentDate } });
    }
    return res.status(201).json(userInfo);
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "server Error" });
  }
};

exports.getbookStats = async (req, res) =>{
  const {date} = req.body;
  //console.log("date : ", date); 
  const [day, month, year] = date.split("/");
  const dateObject = new Date(`${year}-${month}-${day}`);
  //console.log(dateObject);

  try {
    bookStats = await Book.find({date})
    //console.log("bookStats : ", bookStats); 
    res.status(200).json({success : true, bookStats: bookStats});
  } catch (error) {
    console.log("error : ", error);
  }
}

exports.getbookStats2 = async (req, res) =>{
  const {destination, date} = req.body;
  //console.log("destination and date : ", date, destination); 
  const [day, month, year] = date.split("/");
  const dateObject = new Date(`${year}-${month}-${day}`);
  //console.log(dateObject);

  try {
    bookStats = await Book.find({date, destination: { $regex: new RegExp(destination, 'i') }})
    //console.log("bookStats : ", bookStats); 
    res.status(200).json({success : true, bookStats: bookStats});
  } catch (error) {
    console.log("error : ", error);
  }
}

exports.getbookhistory = async (req, res) => {
  const currentDate = new Date();
  try {
    let userInfo;
    if (userRole === "admin") {
      userInfo = await Book.find({ date: { $ls: currentDate } });
    } else {
      userInfo = await Book.find({ userId, date: { $ls: currentDate } });
    }

    return res.status(201).json(userInfo);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server Error" });
  }
};

exports.takenseat = async (req, res) => {
  const { departure, destination, date } = req.body;

  try {
    const bookedSeats = await Book.find({
      departure: departure,
      destination: destination,
      date: date,
    });
    const takenSeats = bookedSeats.map((seat) => seat.seatNumber);
    return res.status(200).json(takenSeats);
  } catch (error) {
    console.log("error : ", error);
  }
};

exports.cancel = async (req, res) => {
  const { departure, destination, seatNumber, date } = req.body;
  const formatedSeatNumber = seatNumber.toString();
  const [day, month, year] = date.split("/");
  const dateObject = new Date(`${year}-${month}-${day}`);
  //console.log(dateObject);

  try {
    const deletedBooking = await Book.findOneAndDelete({
      departure: departure,
      destination: destination,
      seatNumber: formatedSeatNumber,
      date: dateObject,
    });
    if (!deletedBooking) {
      return res
        .status(404)
        .json({ message: "Booking not found or already canceled" });
    }
    return res.status(201).json({
      message: "successfully cancelled",
      updatedBooking: deletedBooking,
    });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};
