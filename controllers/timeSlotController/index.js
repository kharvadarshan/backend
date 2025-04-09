const TimeSlot = require("../../model/timeSlot");

// Generate time slots for a day (e.g., 9 AM to 5 PM, 30-min intervals)
const generateTimeSlots = (date, doctorId) => {
  const slots = [];
  const startHour = 9; // 9 AM
  const endHour = 17; // 5 PM
  const interval = 30; // 30 minutes

  let currentTime = new Date(date);
  currentTime.setHours(startHour, 0, 0, 0);

  while (currentTime.getHours() < endHour) {
    const start = currentTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    currentTime.setMinutes(currentTime.getMinutes() + interval);
    const end = currentTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    slots.push({
      doctorId,
      date,
      start,
      end,
      status: "Available",
    });
  }
  return slots;
};

// Get or generate time slots for a doctor and date
exports.getTimeSlots = async (req, res) => {
  const { doctorId, date } = req.query;

  try {
    const parsedDate = new Date(date);
    let slots = await TimeSlot.find({ doctorId, date: parsedDate });

    // If no slots exist for this date and doctor, generate them
    if (slots.length === 0) {
      const newSlots = generateTimeSlots(parsedDate, doctorId);
      slots = await TimeSlot.insertMany(newSlots);
    }

    res.json({ ok: true, slots });
  } catch (error) {
    console.error("Error fetching time slots:", error);
    res.status(500).json({ ok: false, message: "Server error" });
  }
};