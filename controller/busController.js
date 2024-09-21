const Bus = require("../models/Bus");

exports.addbus = async (req, res) => {
  const { departure, destination, date, time, price } = req.body;
  console.log({ departure, destination, date, time, price });

  try {
    const busInfo = new Bus({ departure, destination, date, time, price });
    await busInfo.save();
    return res.status(201).json({ message: "successfully submitted" });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

exports.getbus = async (req, res) => {
  try {
    const busInfo = await Bus.find();
    return res.status(200).json(busInfo);
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

exports.filter = async (req, res) => {
  try {
    const { departure, destination, date } = req.body;
    console.log({ departure, destination, date });

    let filt = {};

    if (departure) {
      filt.departure = { $regex: new RegExp(departure, 'i') };
    }
    if (destination) {
      filt.destination = { $regex: new RegExp(destination, 'i') };
    }
    if (date) {
      filt.date = date;
    }
    if (Object.keys(filt).length > 0) {
      const data = await Bus.find(filt);
      console.log("one");
      return res.status(200).json(data);
    } 
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};
