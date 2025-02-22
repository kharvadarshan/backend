const mongoose = require("mongoose");
const contactModel = require("../../model/contact");

// Create a new contactUs
exports.createContact = async (req, res) => {
  try {
    
    const {name,email,message} = req.body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newContact = new contactModel({name,email,message});
    const savedContactUs = await newContact.save();

    res.status(201).json(savedContactUs);
  } catch (error) {
    console.error("Error creating contactUs:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }

};

exports.gettingContact = async (req, res) => {
  try {
    const data = await contactModel.find({});
    console.log(data);
    return res.status(200).json(Array.isArray(data) ? data : []); // Ensure array
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


exports.delettingContact = async (req, res) => {
    try {
        const id  = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Contact ID" });
        }

        const contact = await contactModel.findById(id);
        if (!contact) {
            return res.status(404).json({ message: "Contact Not Found" });
        }

        await contactModel.findByIdAndDelete(id);
        return res.status(200).json({ message: "Contact Deleted Successfully" });

    } catch (error) {
        console.error("Error in delete contact: Backend", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
