

const DashBoard = () => {
    const applications = [
      { id: "1", name: "John Doe", status: "Approved", date: "2/23/2025, 12:00 PM" },
      { id: "2", name: "Jane Smith", status: "Pending", date: "2/24/2025, 1:30 PM" },
      { id: "3", name: "Mike Johnson", status: "Rejected", date: "2/25/2025, 3:45 PM" },
    ];
  
    return (
      <div className="min-h-screen bg-gray-100 flex">
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-4">Appointment List</h2>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-blue-500 text-white rounded">Total: {applications.length}</div>
            <div className="p-4 bg-yellow-500 text-white rounded">Pending: {applications.filter(app => app.status === "Pending").length}</div>
            <div className="p-4 bg-green-500 text-white rounded">Approved: {applications.filter(app => app.status === "Approved").length}</div>
            <div className="p-4 bg-red-500 text-white rounded">Rejected: {applications.filter(app => app.status === "Rejected").length}</div>
          </div>
          <table className="w-full bg-white shadow-md rounded">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Doctor Name</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
                <th className="p-3">Time</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="border-t">
                  <td className="p-3">{app.id}</td>
                  <td className="p-3">{app.name}</td>
                  <td className={`p-3 ${app.status === "Approved" ? "text-green-600" : app.status === "Rejected" ? "text-red-600" : "text-yellow-600"}`}>{app.status}</td>
                  <td className="p-3">{app.date}</td>
                  <td className="p-3"><button className="bg-blue-500 text-white px-3 py-1 rounded">View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    );
  };
  
  export default DashBoard;
  
  
  