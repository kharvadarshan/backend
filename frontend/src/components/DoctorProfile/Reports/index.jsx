import { useState } from "react";

const Reports = ()=>{
     const [doctor, setDoctor] = useState({
        id: 'doc001',
        name: 'Dr. Ross Geller',
        email: 'ross.geller@example.com',
        specialization: 'Anesthetics',
        rating: 5.0,
        isApproved: false,
        availability: [
          {
            date: '2025-02-24',
            timeSlots: [
              { time: '09:30', isBooked: false, patient: null },
              { time: '10:00', isBooked: true, patient: 'Patient A' },
              { time: '10:30', isBooked: false, patient: null },
              { time: '11:00', isBooked: false, patient: null },
            ],
          },
          {
            date: '2025-02-25',
            timeSlots: [
              { time: '09:00', isBooked: false, patient: null },
              { time: '09:30', isBooked: true, patient: 'Patient B' },
              { time: '10:00', isBooked: false, patient: null },
            ],
          },
        ],
        medicalReports: [
          { patient: 'Patient A', report: 'Routine checkup - Normal', date: '2025-02-24' },
          { patient: 'Patient B', report: 'Prescription for medication X', date: '2025-02-25' },
        ],
      });

      const [newReport, setNewReport] = useState({ patient: '', report: '', date: '' });


    const addMedicalReport = () => {
        const { patient, report, date } = newReport;
        if (patient && report && date) {
          doctor.medicalReports.push({ patient, report, date });
          setDoctor({ ...doctor });
          setNewReport({ patient: '', report: '', date: '' });
        }
      };
    return (
       <>
         {/* Add Medical Reports/Prescriptions */}
        <div className="bg-white p-4 m-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-2">Add Medical Report/Prescription</h3>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="text"
            value={newReport.patient}
            onChange={(e) => setNewReport({ ...newReport, patient: e.target.value })}
            placeholder="Patient Name"
            className="border p-2 rounded w-full min-w-0"
          />
          <textarea
            value={newReport.report}
            onChange={(e) => setNewReport({ ...newReport, report: e.target.value })}
            placeholder="Report/Prescription"
            className="border p-2 rounded w-full min-w-0"
          />
          <input
            type="date"
            value={newReport.date}
            onChange={(e) => setNewReport({ ...newReport, date: e.target.value })}
            className="border p-2 rounded w-full min-w-0"
          />
          <button
            onClick={addMedicalReport}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full sm:w-auto"
          >
            Add Report
          </button>
        </div>

        <h4 className="text-lg font-medium mb-2">Existing Reports</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {doctor.medicalReports.map((report, index) => (
            <div key={index} className="bg-gray-100 p-2 rounded break-words">
              {report.date} - {report.patient}: {report.report}
            </div>
          ))}
        </div>
      </div>
       </>
    )
}

export default Reports;