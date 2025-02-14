const DoctorList = ({ selectedDoctor, setSelectedDoctor, onNext }) => {
    const doctors = [
      { id: 1, name: "Dr. Smith", specialization: "Cardiologist", photo: "https://via.placeholder.com/150" },
      { id: 2, name: "Dr. Johnson", specialization: "Dermatologist", photo: "https://via.placeholder.com/150" },
      { id: 3, name: "Dr. Williams", specialization: "Pediatrician", photo: "https://via.placeholder.com/150" },
    ];
  
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Select a Doctor</h2>
        <div className="space-y-4">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              onClick={() => setSelectedDoctor(doctor)}
              className={`p-4 border rounded-lg cursor-pointer ${
                selectedDoctor?.id === doctor.id ? "bg-indigo-50 border-indigo-500" : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-center space-x-4">
                <img src={doctor.photo} alt={doctor.name} className="w-12 h-12 rounded-full" />
                <div>
                  <p className="font-semibold">{doctor.name}</p>
                  <p className="text-sm text-gray-600">{doctor.specialization}</p>
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
    );
  };
  
  export default DoctorList;