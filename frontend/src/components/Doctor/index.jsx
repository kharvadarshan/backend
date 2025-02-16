/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
// import { useState, useEffect } from "react";
// import axios from "axios";

// const DoctorList = ({selectedDoctor, setSelectedDoctor, onNext }) => {
//   const [doctors, setDoctors] = useState([]);
//   const [selectedSpecialization, setSelectedSpecialization] = useState("All");
//   useEffect(() => {
//     fetchDoctors();
//   }, []);

  

//   const fetchDoctors = async () => {
//     try {
//       const response = await axios.get("http://localhost:5001/api/doctors");
//       setDoctors(response.data);
//     } catch (error) {
//       console.error("Error fetching doctors:", error);
//     }
//   };

//   const specializations = ["All", ...new Set(doctors.map((doctor) => doctor.specialization))];

//   const filteredDoctors = doctors.filter(
//     (doctor) => selectedSpecialization === "All" || doctor.specialization === selectedSpecialization
//   );

//   return (
//     <div className="mx-5">
//       <div className="mx-auto pt-5 pb-10">
//         <h1 className="text-center text-3xl text-gray-800 font-bold mb-7">Doctor Details</h1>
//         <div className="flex flex-col md:flex-row gap-6">
//           {/* Sidebar Filters */}
//           <div className="w-full md:w-1/4">
//             <div className="bg-gray-300 p-4 rounded-lg shadow-md">
//               <h5 className="text-lg font-semibold mb-3">Specialization</h5>
//               {specializations.map((specialization) => (
//                 <button
//                   key={specialization}
//                   className={`w-full text-left px-4 py-2 rounded-md my-1 transition-colors ${
//                     selectedSpecialization === specialization
//                       ? "bg-indigo-500 text-white"
//                       : "bg-white text-gray-800 hover:bg-gray-200"
//                   }`}
//                   onClick={() => setSelectedSpecialization(specialization)}
//                 >
//                   {specialization}
//                 </button>
//               ))}
//             </div>
//           </div>
          

//           {/* Doctor Cards */}
//           <div className="w-full md:w-3/4">
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredDoctors.map((doctor) => (
//                 <div
//                   key={doctor.id}
//                   onClick={() => {
//                     if (setSelectedDoctor) {
//                       setSelectedDoctor(doctor); // Ensure function exists before calling
//                       onNext();
//                     } else {
//                       console.error("setSelectedDoctor is not defined!");
//                     }
//                   }}
//                   className="cursor-pointer border p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 bg-white border-gray-300"
//                 >
//                   <img
//                     src={doctor.image}
//                     alt={doctor.name}
//                     className="w-20 h-20 object-cover rounded-full mx-auto mb-3"
//                   />
//                   <h5 className="text-lg font-bold text-center">{doctor.name}</h5>
//                   <p className="text-gray-600 text-center">{doctor.specialization}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorList;




import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/doctors");
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const specializations = ["All", ...new Set(doctors.map((doctor) => doctor.specialization))];

  const filteredDoctors = doctors.filter(
    (doctor) => selectedSpecialization === "All" || doctor.specialization === selectedSpecialization
  );

  return (
    <div className="mx-5">
      <div className="mx-auto pt-5 pb-10">
        <h1 className="text-center text-3xl text-gray-800 font-bold mb-7">Doctor Details</h1>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Filters */}
          <div className="w-full md:w-1/4">
            <div className="bg-gray-300 p-4 rounded-lg shadow-md">
              <h5 className="text-lg font-semibold mb-3">Specialization</h5>
              {specializations.map((specialization) => (
                <button
                  key={specialization}
                  className={`w-full text-left px-4 py-2 rounded-md my-1 transition-colors ${
                    selectedSpecialization === specialization
                      ? "bg-indigo-500 text-white"
                      : "bg-white text-gray-800 hover:bg-gray-200"
                  }`}
                  onClick={() => setSelectedSpecialization(specialization)}
                >
                  {specialization}
                </button>
              ))}
            </div>
          </div>

          {/* Doctor Cards */}
          <div className="w-full md:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  onClick={() => navigate(`/all-doctors/${doctor._id}`)}
                  className="cursor-pointer border p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 bg-white border-gray-300"
                >
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-20 h-20 object-cover rounded-full mx-auto mb-3"
                  />
                  <h5 className="text-lg font-bold text-center">{doctor.name}</h5>
                  <p className="text-gray-600 text-center">{doctor.specialization}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorList;


// import { useState, useEffect } from "react";
// import axios from 'axios';

// const DoctorList = ({ selectedDoctor, setSelectedDoctor, onNext }) => {
//   const [doctors, setDoctors] = useState([]);
//   const [selectedSpecialization, setSelectedSpecialization] = useState("All");
//   // const [id, setId] = useState();

//   useEffect(() => {
//     fetchDoctors();
//   }, []); 

//   // console.log("Props in DoctorList:", { selectedDoctor, setSelectedDoctor, onNext });


//   const fetchDoctors = async () => {
//     try {
//       const response = await axios.get('http://localhost:5001/api/doctors');
//       setDoctors(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // const handleDoctorSelect = (doctor) => {
//   //   if (setSelectedDoctor) {
//   //     setSelectedDoctor(doctor);
//   //   } else {
//   //     console.error("setSelectedDoctor is not defined!");
//   //   }
//   // };
  

//   const specializations = ["All", ...new Set(doctors.map((doctor) => doctor.specialization))];

//   const filteredDoctors = doctors.filter((doctor) => {
//     return selectedSpecialization === "All" || doctor.specialization === selectedSpecialization;
//   });

//   return (
//     <div className="mx-5">
//       <div className="mx-auto pt-5 pb-10">
//       <h1 className="text-center text-3xl text-gray-800  font-bold mb-7">Doctor Details</h1>
//       <div className="flex flex-col md:flex-row gap-6 ">
//         {/* Sidebar Filters */}
//         <div className="w-full md:w-1/4">
//           <div className="bg-gray-300 p-4 rounded-lg shadow-md">
//             <h5 className="text-lg font-semibold mb-3">Specialization</h5>
//             {specializations.map((specialization) => (
//               <button
//                 key={specialization}
//                 className={`w-full text-left px-4 py-2 rounded-md my-1 transition-colors ${
//                   selectedSpecialization === specialization
//                     ? "bg-indigo-500 text-white"
//                     : "bg-white text-gray-800 hover:bg-gray-200"
//                 }`}
//                 onClick={() => setSelectedSpecialization(specialization)}
//               >
//                 {specialization}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Doctor Cards */}
//         <div className="w-full md:w-3/4">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredDoctors.map((doctor) => (
//               <div
//                 key={doctor.id}
//                 onClick={() => setSelectedDoctor()}
//                 className={`cursor-pointer border p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 ${
//       selectedDoctor?.id === doctor.id ? "border-indigo-500 bg-indigo-100" : "border-gray-300 bg-white"}`}
//               >
//                 <img
//                   src={doctor.image}
//                   alt={doctor.name}
//                   className="w-20 h-20 object-cover rounded-full mx-auto mb-3"
//                 />
//                 <h5 className="text-lg font-bold text-center">{doctor.name}</h5>
//                 <p className="text-gray-600 text-center">{doctor.specialization}</p>
//               </div>
//             ))}
//           </div>

//           {/* Next Button */}
//           <button
//             onClick={onNext}
//             disabled={!selectedDoctor}
//             className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"

//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default DoctorList;






// // import { useState, useEffect } from "react";
// // import "bootstrap/dist/css/bootstrap.min.css";
// // import axios from 'axios';


// // const DoctorList = ({ selectedDoctor, setSelectedDoctor, onNext }) => {
// //   const [doctors, setDoctors] = useState([]);
// //   // const [selectedSpecialty, setSelectedSpecialty] = useState("All");
// //   const [selectedSpecialization, setSelectedSpecialization] = useState("All");

// //   useEffect(() => {
// //     fetchDoctors();
// //   }, []);
 
// //   const [id ,setId]=useState();
// //   console.log(id);

// //   const fetchDoctors = async () => {
// //     try {
// //       const response = await axios.get('http://localhost:5001/api/doctors');
// //       setDoctors(response.data);
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   // const specialties = ["All", ...new Set(doctors.map((doctor) => doctor.specialty))];
// //   const specializations = ["All", ...new Set(doctors.map((doctor) => doctor.specialization))];

// //   const filteredDoctors = doctors.filter((doctor) => {
// //     // const matchesSpecialty = selectdoctor.specialty === selectedSpecialty;
// //     const matchesSpecialization = selectedSpecialization === "All" || doctor.specialization === selectedSpecialization;
// //     return matchesSpecialization;
// //   });


// //   return (
// //     <div className="container py-4 w-full">
// //       <h1 className="text-center mb-4">Doctor Details</h1>
// //       <div className="row">
// //         <div className="col-md-3 mb-4">
// //           {/* <div className="list-group">
// //             <h5 className="mb-3">Specialty</h5>
// //             {specialties.map((specialty) => (
// //               <button
// //                 key={specialty}
// //                 className={`list-group-item list-group-item-action ${
// //                   selectedSpecialty === specialty ? "active" : ""
// //                 }`}
// //                 onClick={() => setSelectedSpecialty(specialty)}
// //               >
// //                 {specialty}
// //               </button>
// //             ))}
// //           </div> */}
// //           <div className="list-group mt-4">
// //             <h5 className="mb-3">Specialization</h5>
// //             {specializations.map((specialization) => (
// //               <button
// //                 key={specialization}
// //                 className={`list-group-item list-group-item-action ${
// //                   selectedSpecialization === specialization ? "active" : ""
// //                 }`}
// //                 onClick={() => setSelectedSpecialization(specialization)}
// //               >
// //                 {specialization}
// //               </button>
// //             ))}
// //           </div>
// //         </div>
// //         <div className="col-md-9">
// //           <div className="row">
// //             {filteredDoctors.map((doctor) => (
// //               <div onClick= {()=>{setId(doctor.id); console.log(doctor); setSelectedDoctor(doctor);
// //                             }              }  key={doctor.id} className="col-md-4"  >
// //                   <div   className={`card text-center shadow-sm p-3 mb-4 ${selectedDoctor?.id === doctor.id ? "bg-indigo-50 border-indigo-500" : "bg-white border-gray-200"}`} >
// //                           <img
// //                             src={doctor.image}
// //                             alt={doctor.name}
// //                             className="card-img-top rounded-circle mx-auto mt-3"
// //                             style={{ width: "80px", height: "80px", objectFit: "cover" }}
// //                           />
// //                           <div className="card-body ">
// //                             <h5 className="card-title">{doctor.name}</h5>
// //                             <p className="card-text">{doctor.specialization}</p>
// //                             {/* <p className="card-text">{doctor.experience} of experience</p> */}
// //                             {/* <p className="card-text">Fees: ₹{doctor.fees}</p> */}
// //                             {/* <p className="card-text">{doctor.about}</p> */}
// //                             {/* <p className="text-primary">{doctor.contact}</p> */}
// //                           </div>
// //                       </div>
// //               </div>
// //             ))}
// //           </div>
// //           <button
// //           onClick={onNext}
// //           disabled={!selectedDoctor}
// //           className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-md disabled:bg-indigo-300"
// //         >
// //           Next
// //         </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default DoctorList;