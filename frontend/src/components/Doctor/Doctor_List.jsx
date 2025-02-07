// import React from "react";

// const doctors = [
//   {
//     id: 1,
//     name: "Dr. Ayesha Khan",
//     specialty: "Cardiologist",
//     image: "../../../public/assets/doctor.png",
//     contact: "ayesha.khan@example.com",
//   },
//   {
//     id: 2,
//     name: "Dr. Raj Mehta",
//     specialty: "Dermatologist",
//     image: "../../../public/assets/doctor.png",
//     contact: "raj.mehta@example.com",
//   },
//   {
//     id: 3,
//     name: "Dr. Priya Sharma",
//     specialty: "Pediatrician",
//     image: "../../../public/assets/doctor.png",
//     contact: "priya.sharma@example.com",
//   },
// ];

// const DoctorCard = ({ doctor }) => {
//   return (
//     <div className="bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center text-center">
//       <img
//         src={doctor.image}
//         alt={doctor.name}
//         className="w-24 h-24 rounded-full object-cover mb-4"
//       />
//       <h3 className="text-xl font-semibold">{doctor.name}</h3>
//       <p className="text-gray-600">{doctor.specialty}</p>
//       <p className="text-blue-500 mt-2">{doctor.contact}</p>
//     </div>
//   );
// };

// const Doctor_List = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h2 className="text-3xl font-bold text-center mb-6">Our Doctors</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
//         {doctors.map((doctor) => (
//           <DoctorCard key={doctor.id} doctor={doctor} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Doctor_List;


// import React, { useState } from "react";

// const doctors = [
//   {
//     id: 1,
//     name: "Dr. Ayesha Khan",
//     specialty: "Cardiologist",
//     contact: "ayesha.khan@example.com",
//     image: "../../../public/assets/doctor.png",
//   },
//   {
//     id: 2,
//     name: "Dr. Raj Mehta",
//     specialty: "Dermatologist",
//     contact: "raj.mehta@example.com",
//     image: "../../../public/assets/doctor.png",
//   },
//   {
//     id: 3,
//     name: "Dr. Priya Sharma",
//     specialty: "Pediatrician",
//     image: "../../../public/assets/doctor.png",
//     contact: "priya.sharma@example.com",
//   },
//   {
//     id: 4,
//     name: "Dr. Priya Sharma",
//     specialty: "Pediatrician",
//     image: "../../../public/assets/doctor.png",
//     contact: "priya.sharma@example.com",
//   },
//   {
//     id: 5,
//     name: "Dr. Priya Sharma",
//     specialty: "Pediatrician",
//     image: "../../../public/assets/doctor.png",
//     contact: "priya.sharma@example.com",
//   },
//   {
//     id: 6,
//     name: "Dr. Priya Sharma",
//     specialty: "Pediatrician",
//     image: "../../../public/assets/doctor.png",
//     contact: "priya.sharma@example.com",
//   },
//   {
//     id: 7,
//     name: "Dr. Priya Sharma",
//     specialty: "Pediatrician",
//     image: "../../../public/assets/doctor.png",
//     contact: "priya.sharma@example.com",
//   },
//   {
//     id: 8,
//     name: "Dr. Priya Sharma",
//     specialty: "Pediatrician",
//     image: "../../../public/assets/doctor.png",
//     contact: "priya.sharma@example.com",
//   },
//   {
//     id: 9,
//     name: "Dr. Priya Sharma",
//     specialty: "Pediatrician",
//     image: "../../../public/assets/doctor.png",
//     contact: "priya.sharma@example.com",
//   },
//   {
//     id: 10,
//     name: "Dr. Priya Sharma",
//     specialty: "Pediatrician",
//     image: "../../../public/assets/doctor.png",
//     contact: "priya.sharma@example.com",
//   },
// ];  

// const specialties = [...new Set(doctors.map((doctor) => doctor.specialty))];

// const DoctorCard = ({ doctor }) => {
//   return (
//     <div className="bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center text-center w-full  md:w-full h-64 sm:w-full">
//       <img
//         src={doctor.image}
//         alt={doctor.name}
//         className="w-24 h-24 rounded-full object-cover mb-4"
//       />
//       <h3 className="text-xl font-semibold">{doctor.name}</h3>
//       <p className="text-gray-600">{doctor.specialty}</p>
//       <p className="text-blue-500 mt-2 md:text-xs">{doctor.contact}</p>
//     </div>
//   );
// };

// const DoctorList = () => {
//   const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  
//   const filteredDoctors =
//     selectedSpecialty === "All"
//       ? doctors
//       : doctors.filter((doctor) => doctor.specialty === selectedSpecialty);

//   return (
//     <>
//     <div>
//       <h1 className="text-3xl font-bold text-center  mb-3">Doctor Details</h1>
//     </div>
//     <div className="min-h-screen bg-gray-100  p-4 flex flex-col md:flex-row">
//       <div className="w-full md:w-1/4 p-3 bg-white shadow-lg mr-4 h-64 rounded-2xl mb-4 md:mb-0">
//         <h3 className="text-xl font-bold mb-4">Specialties</h3>
//         <ul>
//           <li
//             className={`cursor-pointer p-2 ${selectedSpecialty === "All" ? "font-bold text-blue-500" : ""}`}
//             onClick={() => setSelectedSpecialty("All")}
//           >
//             All
//           </li>
//           {specialties.map((specialty) => (
//             <li
//               key={specialty}
//               className={`cursor-pointer p-2 ${selectedSpecialty === specialty ? "font-bold text-blue-500" : ""}`}
//               onClick={() => setSelectedSpecialty(specialty)}
//             >
//               {specialty}
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div className="w-full md:w-3/4  grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
//         {filteredDoctors.map((doctor) => (
//           <DoctorCard key={doctor.id} doctor={doctor} />
//         ))}
//       </div>
//     </div>
//     </>
//   );
// };

// export default DoctorList;

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const doctors = [
  {
    id: 1,
    name: "Dr. Ayesha Khan",
    specialty: "Cardiologist",
    contact: "ayesha.khan@example.com",
    image: "../../../public/assets/doctor.png",
  },
  {
    id: 2,
    name: "Dr. Raj Mehta",
    specialty: "Dermatologist",
    contact: "raj.mehta@example.com",
    image: "../../../public/assets/doctor.png",
  },
  {
    id: 3,
    name: "Dr. Priya Sharma",
    specialty: "Pediatrician",
    contact: "priya.sharma@example.com",
    image: "../../../public/assets/doctor.png",
  },
];

const specialties = ["All", ...new Set(doctors.map((doctor) => doctor.specialty))];

const DoctorCard = ({ doctor }) => {
  return (
    <div className="card text-center shadow-sm p-3 mb-4">
      <img
        src={doctor.image}
        alt={doctor.name}
        className="card-img-top rounded-circle mx-auto mt-3"
        style={{ width: "80px", height: "80px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{doctor.name}</h5>
        <p className="card-text">{doctor.specialty}</p>
        <p className="text-primary">{doctor.contact}</p>
      </div>
    </div>
  );
};

const DoctorList = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");

  const filteredDoctors =
    selectedSpecialty === "All"
      ? doctors
      : doctors.filter((doctor) => doctor.specialty === selectedSpecialty);

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Doctor Details</h1>
      <div className="row">
        <div className="col-md-3 mb-4">
          <div className="list-group">
            {specialties.map((specialty) => (
              <button
                key={specialty}
                className={`list-group-item list-group-item-action ${
                  selectedSpecialty === specialty ? "active" : ""
                }`}
                onClick={() => setSelectedSpecialty(specialty)}
              >
                {specialty}
              </button>
            ))}
          </div>
        </div>
        <div className="col-md-9">
          <div className="row">
            {filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="col-md-4">
                <DoctorCard doctor={doctor} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorList;
