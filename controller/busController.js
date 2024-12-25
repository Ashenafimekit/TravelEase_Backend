const Bus = require("../models/Bus");

exports.addbus = async (req, res) => {
  const { departure, destination, date, time, price } = req.body;
  console.log({ departure, destination, date, time, price });

  try {
    const busInfo = new Bus({ departure, destination, date, time, price });
    await busInfo.save();
    return res.status(201).json({ message: "Bus Added to the system" });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

exports.getbus = async (req, res) => {
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  };
  try {
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);

    const busInfo = await Bus.find({
      date: { $gte: formattedDate },
    });
    return res.status(200).json(busInfo);
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

exports.searchbus = async (req, res) => {
  try {
    const { departure, destination } = req.body;

    console.log(departure, destination);
    const bus = await Bus.find({
      departure: { $regex: new RegExp(departure, "i") },
      destination: { $regex: new RegExp(destination, "i") },
    });
    if (bus.length === 0) {
      return res.status(404).json({ message: "Bus Not Found" });
    } else {
      if(bus.length === 0) {
        return res.status(200).json({ message: "Bus Not Found" });
      }
      return res.status(200).json({ message: `${bus.length} bus available to your destination` });
    }
  } catch (error) {
    console.log("error : ", error);
    return res.status(500).json({ message: "Server Error, please try again" });
  }
};

exports.getbusadmin = async (req, res) => {
  try {
    const busInfo = await Bus.find();
    return res.status(201).json(busInfo);
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

exports.deletebus = async (req, res) => {
  const { departure, destination, date, time, price } = req.body;
  console.log(departure, destination, date, time, price);

  try {
    const deletedBus = await Bus.findOneAndDelete({
      departure: departure.toString(),
      destination: destination.toString(),
      date: date.toString(),
      time: time.toString(),
      price: price.toString(),
    });
    if (!deletedBus) {
      return res
        .status(404)
        .json({ message: "bus not found or already deleted" });
    }
    return res.status(201).json({ message: "successfully deleted" });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

exports.filter = async (req, res) => {
  try {
    const { departure, destination, date } = req.body;

    let filt = {};

    if (departure) {
      filt.departure = { $regex: new RegExp(departure, "i") };
    }
    if (destination) {
      filt.destination = { $regex: new RegExp(destination, "i") };
    }
    if (date) {
      filt.date = date;
    }
    if (Object.keys(filt).length > 0) {
      const data = await Bus.find(filt);
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};
