
const Appointment=()=>{
    return (
            <>
                <div className="container-fluid">
                     <h2 className="text-danger">Latest Appointments</h2>
                     <table className="table table-hover border rounded align-middle mt-3" >
                        <thead className="table-dark">
                            <tr className=" border-bottom-2 border-dark">
                                <th>ID</th>
                                <th>Patient Name</th>
                                <th>Contect No</th>
                                <th>Doctor Name</th>
                                <th>Reason</th>
                                <th>Date & Time</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>1</th>
                                <th>ABC</th>
                                <th>1234567890</th>
                                <th>PQR</th>
                                <th>HeadAche</th>
                                <th>12/03/2025 12:30</th>
                                <th>Status</th>
                                <th>
                                    <button className="btn btn-danger m-1">Action</button>
                                </th>
                            </tr>
                            <tr>
                                <th>1</th>
                                <th>ABC</th>
                                <th>1234567890</th>
                                <th>PQR</th>
                                <th>HeadAche</th>
                                <th>12/03/2025 12:30</th>
                                <th>Status</th>
                                <th>
                                <button className="btn btn-danger m-1">Action</button>
                                </th>
                            </tr>
                        </tbody>
                     </table>
                </div>
            </>
    )
}

export default Appointment;