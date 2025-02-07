
const Appointment = () => {
    return (
      <>
        <div className="container mx-auto p-4">
          <h2 className="text-red-600 text-2xl font-bold mb-6">Latest Appointments</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-lg shadow-lg">
              <thead className="bg-gray-800 text-white">
                <tr className="border-b-2 border-gray-700">
                  <th className="py-3 px-6 text-left">ID</th>
                  <th className="py-3 px-6 text-left">Patient Name</th>
                  <th className="py-3 px-6 text-left">Contact No</th>
                  <th className="py-3 px-6 text-left">Doctor Name</th>
                  <th className="py-3 px-6 text-left">Reason</th>
                  <th className="py-3 px-6 text-left">Date & Time</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6">1</td>
                  <td className="py-3 px-6">ABC</td>
                  <td className="py-3 px-6">1234567890</td>
                  <td className="py-3 px-6">PQR</td>
                  <td className="py-3 px-6">Headache</td>
                  <td className="py-3 px-6">12/03/2025 12:30</td>
                  <td className="py-3 px-6">Status</td>
                  <td className="py-3 px-6">
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500">Action</button>
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6">2</td>
                  <td className="py-3 px-6">ABC</td>
                  <td className="py-3 px-6">1234567890</td>
                  <td className="py-3 px-6">PQR</td>
                  <td className="py-3 px-6">Headache</td>
                  <td className="py-3 px-6">12/03/2025 12:30</td>
                  <td className="py-3 px-6">Status</td>
                  <td className="py-3 px-6">
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500">Action</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };
  
  export default Appointment;
  



// const Appointment=()=>{
//     return (
//             <>
//                 <div className="container-fluid">
//                      <h2 className="text-danger">Latest Appointments</h2>
//                      <table className="table table-hover border rounded align-middle mt-3" >
//                         <thead className="table-dark">
//                             <tr className=" border-bottom-2 border-dark">
//                                 <th>ID</th>
//                                 <th>Patient Name</th>
//                                 <th>Contect No</th>
//                                 <th>Doctor Name</th>
//                                 <th>Reason</th>
//                                 <th>Date & Time</th>
//                                 <th>Status</th>
//                                 <th>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr>
//                                 <th>1</th>
//                                 <th>ABC</th>
//                                 <th>1234567890</th>
//                                 <th>PQR</th>
//                                 <th>HeadAche</th>
//                                 <th>12/03/2025 12:30</th>
//                                 <th>Status</th>
//                                 <th>
//                                     <button className="btn btn-danger m-1">Action</button>
//                                 </th>
//                             </tr>
//                             <tr>
//                                 <th>1</th>
//                                 <th>ABC</th>
//                                 <th>1234567890</th>
//                                 <th>PQR</th>
//                                 <th>HeadAche</th>
//                                 <th>12/03/2025 12:30</th>
//                                 <th>Status</th>
//                                 <th>
//                                 <button className="btn btn-danger m-1">Action</button>
//                                 </th>
//                             </tr>
//                         </tbody>
//                      </table>
//                 </div>
//             </>
//     )
// }

// export default Appointment;