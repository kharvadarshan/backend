import { useState } from 'react';

const ManageSchedule = () => {
  const [timeSlot, setTimeSlot] = useState({
    doctorId: '67a8ddf7f417c09f242f0e42',
    date: '',
    slot: [
      {
        start: '',
        end: '',
        status: 'Available',
      },
    ],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTimeSlot({ ...timeSlot, [name]: value });
  };

  const handleSlotChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSlots = [...timeSlot.slot];
    updatedSlots[index] = { ...updatedSlots[index], [name]: value };
    setTimeSlot({ ...timeSlot, slot: updatedSlots });
  };

  const addSlot = () => {
    setTimeSlot({
      ...timeSlot,
      slot: [...timeSlot.slot, { start: '', end: '', status: 'Available' }],
    });
  };

  return (
    <div className="flex flex-col lg:flex-row p-4 min-h-screen mx-auto">
      {/* Manage Availability */}
      <div className="w-full lg:basis-2/3 bg-white p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Manage Availability</h3>
        <div className="flex flex-col lg:flex-row mb-4 justify-start p-2">
          <input
            type="date"
            name="date"
            value={timeSlot.date}
            onChange={handleInputChange}
            className="border p-2 rounded w-full lg:w-auto"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 justify-start p-2">
          {timeSlot.slot.map((slot, index) => (
            <div key={index} className="border p-4 rounded-md space-y-2">
              <h3 className="text-lg font-semibold">Slot {index + 1}</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Start Time
                </label>
                <input
                  type="time"
                  name="start"
                  value={slot.start}
                  onChange={(e) => handleSlotChange(index, e)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  End Time
                </label>
                <input
                  type="time"
                  name="end"
                  value={slot.end}
                  onChange={(e) => handleSlotChange(index, e)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2">
          <button
            type="button"
            onClick={addSlot}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Add Another Slot
          </button>
          <button
            type="submit"
            onClick={addSlot}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Create Time Slot
          </button>
        </div>
      </div>

      {/* Select Date and Slots */}
      <div className="w-full lg:basis-1/3 bg-white mt-4 lg:mt-0 lg:ml-4 p-4 rounded-lg shadow">
        <h1 className="text-xl font-semibold mb-4">Select Date</h1>
        <input
          type="date"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        <hr className="mt-4 mb-4 border-4 border-indigo-100" />
        <div className="mt-4">
          <h1 className="text-xl font-semibold">Slots According to Date and its Status</h1>
        </div>
      </div>
    </div>
  );
};

export default ManageSchedule;