import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

// const DoctorCard = ({ doctor,selectedDoctor,setSelectedDoctor,onNext }) => {
//   return (
//     <div  key={doctor.id}  onclick={()=>setSelectedDoctor(doctor)} className={`card text-center shadow-sm p-3 mb-4 ${selectedDoctor?.id === doctor.id ? "bg-indigo-50 border-indigo-500" : "bg-white border-gray-200"}`} >
//       <img
//         src={doctor.image}
//         alt={doctor.name}
//         className="card-img-top rounded-circle mx-auto mt-3"
//         style={{ width: "80px", height: "80px", objectFit: "cover" }}
//       />
//       <div className="card-body">
//         <h5 className="card-title">{doctor.name}</h5>
//         <p className="card-text">{doctor.specialty}</p>
//         <p className="card-text">{doctor.specialization}</p>
//         <p className="card-text">{doctor.experience} of experience</p>
//         <p className="card-text">{doctor.degree}</p>
//         <p className="card-text">Fees: ₹{doctor.fees}</p>
//         <p className="card-text">{doctor.address}</p>
//         <p className="card-text">{doctor.about}</p>
//         <p className="text-primary">{doctor.contact}</p>
//       </div>
//     </div>
//   );
// };

const DoctorList = ({ selectedDoctor, setSelectedDoctor, onNext }) => {
  const [doctors, setDoctors] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [selectedSpecialization, setSelectedSpecialization] = useState("All");

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/doctors');
      setDoctors(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const specialties = ["All", ...new Set(doctors.map((doctor) => doctor.specialty))];
  const specializations = ["All", ...new Set(doctors.map((doctor) => doctor.specialization))];

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSpecialty = selectedSpecialty === "All" || doctor.specialty === selectedSpecialty;
    const matchesSpecialization = selectedSpecialization === "All" || doctor.specialization === selectedSpecialization;
    return matchesSpecialty && matchesSpecialization;
  });

  return (
    <div className="container py-4 w-full">
      <h1 className="text-center mb-4">Doctor Details</h1>
      <div className="row">
        <div className="col-md-3 mb-4">
          <div className="list-group">
            <h5 className="mb-3">Specialty</h5>
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
          <div className="list-group mt-4">
            <h5 className="mb-3">Specialization</h5>
            {specializations.map((specialization) => (
              <button
                key={specialization}
                className={`list-group-item list-group-item-action ${
                  selectedSpecialization === specialization ? "active" : ""
                }`}
                onClick={() => setSelectedSpecialization(specialization)}
              >
                {specialization}
              </button>
            ))}
          </div>
        </div>
        <div className="col-md-9">
          <div className="row">
            {filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="col-md-4"  >
                  <div  onClick={()=>setSelectedDoctor(doctor)}  className={`card text-center shadow-sm p-3 mb-4 ${selectedDoctor?.id === doctor.id ? "bg-indigo-50 border-indigo-500" : "bg-white border-gray-200"}`} >
                          <img
                            src={doctor.image}
                            alt={doctor.name}
                            className="card-img-top rounded-circle mx-auto mt-3"
                            style={{ width: "80px", height: "80px", objectFit: "cover" }}
                          />
                          <div className="card-body ">
                            <h5 className="card-title">{doctor.name}</h5>
                            <p className="card-text">{doctor.specialization}</p>
                            <p className="card-text">{doctor.experience} of experience</p>
                            <p className="card-text">Fees: ₹{doctor.fees}</p>
                            <p className="card-text">{doctor.about}</p>
                            <p className="text-primary">{doctor.contact}</p>
                          </div>
                      </div>
              </div>
            ))}
          </div>
          <button
          onClick={onNext}
          disabled={!selectedDoctor}
          className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-md disabled:bg-indigo-300"
        >
          Next
        </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorList;




























// import  { useState ,useEffect} from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import axios from 'axios';





// const DoctorCard = ({ doctor }) => {

//   return (
//     <div className="card text-center shadow-sm p-3 mb-4">
//       <img
//         src={doctor.image}
//         alt={doctor.name}
//         className="card-img-top rounded-circle mx-auto mt-3"
//         style={{ width: "80px", height: "80px", objectFit: "cover" }}
//       />
//       <div className="card-body">
//         <h5 className="card-title">{doctor.name}</h5>
//         <p className="card-text">{doctor.specialty}</p>
//         <p className="text-primary">{doctor.contact}</p>
//       </div>
//     </div>
//   );
// };

// const DoctorList = () => {
   
//   const [doctors,setDoctors]=useState([]);
//   const specialties = ["All", ...new Set(doctors.map((doctor) => doctor.specialty))];
//   useEffect(()=>{
//     fetchDoctors();
//   },[]);

//   const fetchDoctors= async()=>{
//        try{
//             const response = await axios.get('http://localhost:5001/api/doctors');
//             console.log(response.data);
//             setDoctors(response.data);
//             console.log(doctors);
//        }catch(error)
//        {
//         console.log(error);
//        }
//   }

    
//   const [selectedSpecialty, setSelectedSpecialty] = useState("All");

//   const filteredDoctors =
//     selectedSpecialty === "All"
//       ? doctors
//       : doctors.filter((doctor) => doctor.specialty === selectedSpecialty);

//   return (
//     <div className="container py-4">
//       <h1 className="text-center mb-4">Doctor Details</h1>
//       <div className="row">
//         <div className="col-md-3 mb-4">
//           <div className="list-group">
//             {specialties.map((specialty) => (
//               <button
//                 key={specialty}
//                 className={`list-group-item list-group-item-action ${
//                   selectedSpecialty === specialty ? "active" : ""
//                 }`}
//                 onClick={() => setSelectedSpecialty(specialty)}
//               >
//                 {specialty}
//               </button>
//             ))}
//           </div>
//         </div>
//         <div className="col-md-9">
//           <div className="row">
//             {filteredDoctors.map((doctor) => (
//               <div key={doctor.id} className="col-md-4">
//                 <DoctorCard doctor={doctor} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorList;







