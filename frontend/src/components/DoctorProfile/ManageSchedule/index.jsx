import  { useEffect, useState } from "react";
import { format, eachDayOfInterval, parseISO } from "date-fns";
import { Trash2, Plus, Calendar, Clock } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

export default function DoctorSlotScheduler() {
  // const [selectedDate, setSelectedDate] = useState("");
  //const [startDate, setStartDate] = useState("");
 // const [endDate, setEndDate] = useState("");
  // const [singleDayStartTime, setSingleDayStartTime] = useState(""); // Changed
  // const [singleDayEndTime, setSingleDayEndTime] = useState(""); // Changed
  //const [recurringStartTime, setRecurringStartTime] = useState(""); // Changed
 // const [recurringEndTime, setRecurringEndTime] = useState(""); // Changed
  const [slots, setSlots] = useState(
    {
       date:"",
       startTime:"",
       endTime:"",
    }
  );

  const [manySlots,setManySlots]=useState({
    startDate:"",
    endDate:"",
    startTime:"",
    endTime:""
  });

  useEffect(()=>{
     getAvailableTimeSlots();
  },[]);

  const [timeSlots,setTimeSlots]=useState([]);

  

  const getAvailableTimeSlots = async()=>{
    try
    {
            const response = await axios.get(`http://localhost:5001/doctorprofile/getTimeSlots/${activeUser._id}`);

            if(response.data.ok)
            {
              setTimeSlots(response.data.result);
            }
    }catch(error)
    {
      console.log(error);
    }
  }



  


  const [error, setError] = useState("");

  const isValidTime = (start, end) => start < end;

  const activeUser = useSelector((state)=>state.user.user.doctor);
  

  const addTimeSlot = async()=>{
    Swal.fire({
          title: "Are you sure?",
          text: "Do you really want to add Time slot ?",
          icon: "warning",
          confirmButtonText: "Yes, Add",
          cancelButtonText: "No, Cancel",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              
              const response = await axios.post("http://localhost:5001/doctorprofile/addSlot",
                {doctorId:activeUser._id,slot:slots}
              );

              if (response.data.ok) {
                getAvailableTimeSlots();
                Swal.fire(
                  "Success",
                  "The time slot  has been added.",
                  "success"
                );
              } else {
                Swal.fire("Error!", response.data.message, "error");
              }
            } catch (error) {
              Swal.fire("Error!", "Could not connect to the server.", error);
            }
          }
        });
  }

  const addManyTimeSlot = async()=>{

    setError("");
    const { startDate, endDate, startTime, endTime } = manySlots;
    if (!startDate || !endDate || !startTime || !endTime) {
      return setError("Please fill in all fields for recurring slots.");
    }
    if (!isValidTime(startTime, endTime)) {
      return setError("Start time must be before end time.");
    }

    if (!isValidTime(startTime, endTime)) {
      return setError("Start time must be before end time.");
    }

    Swal.fire({
          title: "Are you sure?",
          text: "Do you really want to add Time slot ?",
          icon: "warning",
          confirmButtonText: "Yes, Add",
          cancelButtonText: "No, Cancel",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
                 

              const allDates = eachDayOfInterval({
                start: parseISO(startDate),
                end: parseISO(endDate),
              }).map((day) => format(day, "yyyy-MM-dd"));

              
              const response = await axios.post("http://localhost:5001/doctorprofile/addManySlot",
                {doctorId:activeUser._id,dates:allDates,slot:{start:startTime,end:endTime}}
              );

              if (response.data.ok) {
                getAvailableTimeSlots();
                Swal.fire(
                  "Success",
                  "The time slot  has been added.",
                  "success"
                );
              } else {
                Swal.fire("Error!",  response.data.message, "error");
              }
            } catch (error) {
              Swal.fire("Error!", "Could not connect to the server.", error);
            }
          }
        });
  }


  // const handleAddSingleSlot = () => {
  //   setError("");
  //   if (!selectedDate || !singleDayStartTime || !singleDayEndTime) {
  //     return setError("Please fill in all fields.");
  //   }
  //   if (!isValidTime(singleDayStartTime, singleDayEndTime)) {
  //     return setError("Start time must be before end time.");
  //   }
  //   // const exists = slots.some(
  //   //   (slot) => slot.date === selectedDate && slot.startTime === singleDayStartTime
  //   // );
  //   // if (exists) {
  //   //   return setError("This slot already exists.");
  //   // }
  //   // const newSlot = { date: selectedDate, startTime: singleDayStartTime, endTime: singleDayEndTime };
  //   // setSlots(newSlot);
  //   setSelectedDate("");
  //   setSingleDayStartTime("");
  //   setSingleDayEndTime("");
  // };

 



  // const handleApplySlotToAllDays = () => {
  //   setError("");
  //   if (!startDate || !endDate || !recurringStartTime || !recurringEndTime) {
  //     return setError("Please fill in all fields.");
  //   }
  //   if (!isValidTime(recurringStartTime, recurringEndTime)) {
  //     return setError("Start time must be before end time.");
  //   }
  //   const allDates = eachDayOfInterval({
  //     start: parseISO(startDate),
  //     end: parseISO(endDate),
  //   });
  //   const newSlots = allDates.map((day) => ({
  //     date: format(day, "yyyy-MM-dd"),
  //     startTime: recurringStartTime,
  //     endTime: recurringEndTime,
  //   }));

    // const uniqueNewSlots = newSlots.filter(
    //   (newSlot) =>
    //     !slots.some(
    //       (existing) =>
    //         existing.date === newSlot.date &&
    //         existing.startTime === newSlot.startTime
    //     )
    // );

   // setSlots([...slots, ...uniqueNewSlots]);
    // setRecurringStartTime("");
    // setRecurringEndTime("");
    // setStartDate("");
    // setEndDate("");
  //};

  const handleDeleteSlot = async(id) => {

    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete Time slot ?",
      icon: "warning",
      confirmButtonText: "Yes, Add",
      cancelButtonText: "No, Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
 
          const response = await  axios.get('http://localhost:5001/doctorprofile/deleteTimeSlot',
                    {params:
                      {
                        id:id,
                        doctorId:activeUser._id
                      }});

          if (response.data.ok) {
            getAvailableTimeSlots();
            Swal.fire(
              "Success",
              "The time slot  has been deleted.",
              "success"
            );
          } else {
            Swal.fire("Error!",  response.data.message, "error");
          }
        } catch (error) {
          Swal.fire("Error!", "Could not connect to the server.", error);
        }
      }
    });
  };


  return (
    <div className="max-w-4xl mx-auto p-4 font-sans text-gray-800">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 mb-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Doctor Slot Scheduler</h1>
        <p className="opacity-90">Manage your appointment availability with ease</p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6 flex items-start">
          <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <div>{error}</div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {/* Single Day Slot */}
        <div className="bg-white rounded-xl p-6 border border-blue-500 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="bg-indigo-100 p-2 rounded-lg mr-3">
              <Calendar className="text-indigo-600" size={20} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Single Day Slot</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
              <div className="relative">
                <input
                  type="date"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                  value={slots.date}
                  onChange={(e) => setSlots({...slots,date:e.target.value})}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                <div className="relative">
                  <input
                    type="time"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                    value={slots.startTime}
                    onChange={(e) => setSlots({...slots,startTime:e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                <div className="relative">
                  <input
                    type="time"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                    value={slots.endTime}
                    onChange={(e) => setSlots({...slots,endTime:e.target.value})}
                  />
                </div>
              </div>
            </div>
            
            <button
              onClick={()=>{
                addTimeSlot()}}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center transition-colors"
            >
              <Plus size={18} className="mr-2" />
              Add Slot
            </button>
          </div>
        </div>

        {/* All Days Slot */}
        <div className="bg-white rounded-xl p-6 border border-blue-500 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="bg-green-100 p-2 rounded-lg mr-3">
              <Calendar className="text-green-600" size={20} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Recurring Slots</h3>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500"
                  value={manySlots.startDate}
                  onChange={(e) => setManySlots({...manySlots,startDate:e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500"
                  value={manySlots.endDate}
                  onChange={(e) => setManySlots({...manySlots,endDate:e.target.value})}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                <input
                  type="time"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500"
                  value={manySlots.startTime}
                  onChange={(e) => setManySlots({...manySlots,startTime:e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                <input
                  type="time"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500"
                  value={manySlots.endTime}
                  onChange={(e) => setManySlots({...manySlots,endTime:e.target.value})}
                />
              </div>
            </div>
            
            <button
              onClick={addManyTimeSlot}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center transition-colors"
            >
              <Clock size={18} className="mr-2" />
              Apply to All Days
            </button>
          </div>
        </div>
      </div>

      {/* Display Slots */}
      <div className="bg-white rounded-xl max-h-96  scroll-smooth overflow-y-auto p-6 border border-gray-500 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <h3 className="text-xl font-semibold  text-gray-800">Scheduled Slots</h3>
            <span className="ml-2 bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {slots.length}
            </span>
          </div>
          {timeSlots?.length > 0 && (
            <button
              // onClick={}
              className="text-sm bg-red-50 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-100 flex items-center transition-colors"
            >
              <Trash2 size={16} className="mr-1" />
              Clear All
            </button>
          )}
        </div>

        {timeSlots?.length === 0 ? (
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Calendar className="text-gray-400" size={24} />
            </div>
            <h4 className="text-lg font-medium text-gray-500 mb-1">No slots added yet</h4>
            <p className="text-gray-400 text-sm">Add slots using the forms above</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {timeSlots?.map((timeSlot, index) => (
              <li
                key={index}
                className=""
              >
               {
                timeSlot?.slot?.map((range,index)=>(
                <>
                <div className={`flex items-center justify-between py-4 px-3  my-2  rounded-lg transition-colors ${ range.status==="Booked" ? "bg-red-50": "bg-green-50" } `}>
                  <div className="flex items-center">
                    <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                      <Calendar className="text-indigo-600" size={18} />
                    </div>
                    <div>
                     
                      <div className="font-medium text-gray-900">
                        {format(parseISO(timeSlot.date), "EEEE, MMMM d, yyyy")}
                      </div>
                      <div key={index} className="text-gray-500 text-sm flex items-center">
                        <Clock size={14} className="mr-1" />
                        {range.start} - {range.end} <span className={`text-lg p-1 ${range.status=="Booked"? "text-red-700": "text-green-700"} `}>({range.status})</span> 
                      </div>
                      
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteSlot(range._id)}
                    className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
                    aria-label="Delete slot"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                </>
                        ))
                      }
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}





// import axios from 'axios';
// import { useState } from 'react';
// import { toast } from 'react-toastify';
// const ManageSchedule = () => {
//   const [timeSlot, setTimeSlot] = useState({
//     doctorId: '67a8ddf7f417c09f242f0e42',
//     date: '',
//     slot: [
//       {
//         start: '',
//         end: '',
//         status: 'Available',
//       },
//     ],
//   });

//   console.log(timeSlot);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setTimeSlot({ ...timeSlot, [name]: value });
//   };

//   const handleSlotChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedSlots = [...timeSlot.slot];
//     updatedSlots[index] = { ...updatedSlots[index], [name]: value };
//     setTimeSlot({ ...timeSlot, slot: updatedSlots });
//   };

//   const addSlot = () => {
//     setTimeSlot({
//       ...timeSlot,
//       slot: [...timeSlot.slot, { start: '', end: '', status: 'Available' }],
//     });
//   };

//   const handleSubmit = async(e)=>{
//     e.preventDefault();
//     try{
//             const response = await axios.post('http://localhost:5001/doctorprofile/addSlot',timeSlot);
//             if(response.data.ok)
//             {
//                toast.success("Time slot added Successfully...!",{ position:"top-right"});
//             }
//     }catch(error)
//     {
//       console.log(error);
//     }
//   };

//   return (
//     <form className="flex flex-col lg:flex-row p-4 min-h-screen mx-auto"  onSubmit={handleSubmit}> 
//       {/* Manage Availability */}
//       <div className="w-full lg:basis-2/3 bg-white p-4 rounded-lg shadow">
//         <h3 className="text-xl font-semibold mb-4">Manage Availability</h3>
//         <div className="flex flex-col lg:flex-row mb-4 justify-start p-2">
//           <input
//             type="date"
//             name="date"
//             value={timeSlot.date}
//             onChange={handleInputChange}
//             className="border p-2 rounded w-full lg:w-auto"
//           />
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 justify-start p-2">
//           {timeSlot.slot.map((slot, index) => (
//             <div key={index} className="border p-4 rounded-md space-y-2">
//               <h3 className="text-lg font-semibold">Slot {index + 1}</h3>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Start Time
//                 </label>
//                 <input
//                   type="time"
//                   name="start"
//                   value={slot.start}
//                   onChange={(e) => handleSlotChange(index, e)}
//                   className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   End Time
//                 </label>
//                 <input
//                   type="time"
//                   name="end"
//                   value={slot.end}
//                   onChange={(e) => handleSlotChange(index, e)}
//                   className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                   required
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2">
//           <button
//             type="button"
//             onClick={addSlot}
//             className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
//           >
//             Add Another Slot
//           </button>
//           <button
//             type="submit"
           
//             className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
//           >
//             Submit
//           </button>
//         </div>
//       </div>

//       {/* Select Date and Slots */}
//       <div className="w-full lg:basis-1/3 bg-white mt-4 lg:mt-0 lg:ml-4 p-4 rounded-lg shadow">
//         <h1 className="text-xl font-semibold mb-4">Select Date</h1>
//         <input
//           type="date"
//           className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//         />
//         <hr className="mt-4 mb-4 border-4 border-indigo-100" />
//         <div className="mt-4">
//           <h1 className="text-xl font-semibold">Slots According to Date and its Status</h1>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default ManageSchedule;