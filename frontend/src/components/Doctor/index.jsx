import  { useState } from "react";

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
    image: "../../../public/assets/doctor.png",
    contact: "priya.sharma@example.com",
  },
  {
    id: 4,
    name: "Dr. Priya Sharma",
    specialty: "Pediatrician",
    image: "../../../public/assets/doctor.png",
    contact: "priya.sharma@example.com",
  },
  {
    id: 5,
    name: "Dr. Priya Sharma",
    specialty: "Pediatrician",
    image: "../../../public/assets/doctor.png",
    contact: "priya.sharma@example.com",
  },
  {
    id: 6,
    name: "Dr. Priya Sharma",
    specialty: "Pediatrician",
    image: "../../../public/assets/doctor.png",
    contact: "priya.sharma@example.com",
  },
  {
    id: 7,
    name: "Dr. Priya Sharma",
    specialty: "Pediatrician",
    image: "../../../public/assets/doctor.png",
    contact: "priya.sharma@example.com",
  },
  {
    id: 8,
    name: "Dr. Priya Sharma",
    specialty: "Pediatrician",
    image: "../../../public/assets/doctor.png",
    contact: "priya.sharma@example.com",
  },
  {
    id: 9,
    name: "Dr. Priya Sharma",
    specialty: "Pediatrician",
    image: "../../../public/assets/doctor.png",
    contact: "priya.sharma@example.com",
  },
  {
    id: 10,
    name: "Dr. Priya Sharma",
    specialty: "Pediatrician",
    image: "../../../public/assets/doctor.png",
    contact: "priya.sharma@example.com",
  },
];  

const specialties = [...new Set(doctors.map((doctor) => doctor.specialty))];

const DoctorCard = ({ doctor }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center text-center w-full  md:w-full h-64 sm:w-full">
      <img
        src={doctor.image}
        alt={doctor.name}
        className="w-24 h-24 rounded-full object-cover mb-4"
      />
      <h3 className="text-xl font-semibold">{doctor.name}</h3>
      <p className="text-gray-600">{doctor.specialty}</p>
      <p className="text-blue-500 mt-2 md:text-xs">{doctor.contact}</p>
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
    <>
    <div>
      <h1 className="text-3xl font-bold text-center  mb-3">Doctor Details</h1>
    </div>
    <div className="min-h-screen bg-gray-100  p-4 flex flex-col md:flex-row">
      <div className="w-full md:w-1/4 p-3 bg-white shadow-lg mr-4 h-64 rounded-2xl mb-4 md:mb-0">
        <h3 className="text-xl font-bold mb-4">Specialties</h3>
        <ul>
          <li
            className={`cursor-pointer p-2 ${selectedSpecialty === "All" ? "font-bold text-blue-500" : ""}`}
            onClick={() => setSelectedSpecialty("All")}
          >
            All
          </li>
          {specialties.map((specialty) => (
            <li
              key={specialty}
              className={`cursor-pointer p-2 ${selectedSpecialty === specialty ? "font-bold text-blue-500" : ""}`}
              onClick={() => setSelectedSpecialty(specialty)}
            >
              {specialty}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full md:w-3/4  grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {filteredDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </div>
    </>
  );
};

export default DoctorList;












// const Doctors=()=>{
//     return (
//         <>
//           <div className='container p-4 min-vh-100 min-vw-100'>
//                <div className="row">
//                    <div className='col-2 bg-dark p-2'>
//                           <ul className="d-flex flex-column pt-5">
//                              <li className="">
//                                 <a href="#" className="text-decoration-none fs-4">Filters 1</a>
//                              </li> 
//                              <li className=''>
//                                 <a href="#" className="text-decoration-none fs-4" >Filters 2</a>
//                              </li>  
//                              <li className=''>
//                                 <a href="#" className="text-decoration-none fs-4" >Filters 3</a>
//                              </li>  
//                           </ul>
//                    </div>
//                    <div className='col-10'>
//                            <div className="container ">
//                              <div className='row row-cols-auto'>
//                                              <div className='col border border-1 border-dark p-3 mx-3 my-2  '>
//                                                 <div className='my-3' >
//                                                     <img src="../../assets/OIP (1).jpeg"  style={{width:'100%',height:'100%'}} alt="Doctor's Photo"></img>
//                                                 </div>
//                                                 <div className='text-success fw-bold'>
//                                                  Available
//                                                 </div>
//                                                 <div>
//                                                    <h1>Name</h1>
//                                                    <h2>Specialization</h2>
//                                                 </div>
//                                             </div>
//                                             <div className='col border border-1 border-dark p-3 mx-3  my-2 '>
//                                                 <div className='my-3'>
//                                                     <img src="../../assets/OIP (1).jpeg"  style={{width:'100%',height:'100%'}}  alt="Doctor's Photo"></img>
//                                                 </div>
//                                               <div className='text-success fw-bold'>
//                                                Available
//                                               </div>
//                                               <div>
//                                                  <h1>Name</h1>
//                                                  <h2>Specialization</h2>
//                                               </div>
//                                           </div>
//                                           <div className='col border border-1 border-dark p-3 mx-3 my-2 '>
//                                               <div className='my-3'>
//                                                   <img src="../../assets/OIP (1).jpeg"  style={{width:'100%',height:'100%'}}  alt="Doctor's Photo"></img>
//                                               </div>
//                                               <div className='text-success fw-bold'>
//                                                Available
//                                               </div>
//                                               <div>
//                                                  <h1>Name</h1>
//                                                  <h2>Specialization</h2>
//                                               </div>
//                                           </div>
//                                           <div className='col border border-1 border-dark p-3 mx-3 my-2 '>
//                                               <div className='my-3'>
//                                                   <img src="../../assets/OIP (1).jpeg"  style={{width:'100%',height:'100%'}}  alt="Doctor's Photo"></img>
//                                               </div>
//                                               <div className='text-success fw-bold'>
//                                                Available
//                                               </div>
//                                               <div>
//                                                  <h1>Name</h1>
//                                                  <h2>Specialization</h2>
//                                               </div>
//                                           </div>
//                                           <div className='col border border-1 border-dark p-3 mx-3 my-2 '>
//                                               <div className='my-3'>
//                                                   <img src="../../assets/OIP (1).jpeg"  style={{width:'100%',height:'100%'}}  alt="Doctor's Photo"></img>
//                                               </div>
//                                               <div className='text-success fw-bold'>
//                                                Available
//                                               </div>
//                                               <div>
//                                                  <h1>Name</h1>
//                                                  <h2>Specialization</h2>
//                                               </div>
//                                           </div>
//                                           <div className='col border border-1 border-dark p-3 mx-3 my-2 '>
//                                               <div className='my-3'>
//                                                   <img src="../../assets/OIP (1).jpeg"  style={{width:'100%',height:'100%'}}  alt="Doctor's Photo"></img>
//                                               </div>
//                                               <div className='text-success fw-bold'>
//                                                Available
//                                               </div>
//                                               <div>
//                                                  <h1>Name</h1>
//                                                  <h2>Specialization</h2>
//                                               </div>
//                                           </div>
//                                      </div>
//                                 </div>
//                            </div>  
//                    </div>

//                </div>
               
//         </>
//     )
// }

// export default Doctors;