import { useState,useEffect } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";

const SpecializationForm = () => {
  const [specialization, setSpecialization] = useState("");
  const [specializations, setSpecializations] = useState([]); // Mocked existing specializations
  const [message, setMessage] = useState("");

  const getSpecialization = async()=>{
    try
    {
         const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/getSpecialization`,{
          withCredentials: true, // This sends cookies
        });

         if(response.data.ok)
         {

          setSpecializations(response.data.specialization);
         }
    }catch(error)
    {
     console.log(error);
    }
  }


  useEffect(()=>{
    getSpecialization();
  },[])



  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder logic - to be replaced with backend integration
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to add New Specialization?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Add",
      cancelButtonText: "No, Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post(
            `${
              import.meta.env.VITE_API_URL
            }/admin/addSpecialization`,{name:specialization},{
              withCredentials: true, // This sends cookies
             
            }
          );

          if (response.data.ok) {
            getSpecialization();
            setSpecialization("");
            Swal.fire(
              "Added!",
              "The new specialization has been added.",
              "success"
            );
           
          } else {
           
            Swal.fire("Error!", response.data.message, "error");
          }
        } catch (error) {
          
          Swal.fire("Error!", "Could not connect to the server.", "error");
          console.error(error);
        }
      }
    });
  };

  const handleDelete = (spec) => {

    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete Specialization?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "No, Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `${
              import.meta.env.VITE_API_URL
            }/admin/deleteSpecialization/${spec}`,{
              withCredentials: true,
            }
          );

          if (response.data.ok) {
             getSpecialization();
            setSpecialization("");
            Swal.fire(
              "Deleted!",
              "The specialization has been deleted.",
              "success"
            );
           
          } else {
           
            Swal.fire("Error!", response.data.message, "error");
          }
        } catch (error) {
          
          Swal.fire("Error!", "Could not connect to the server.", "error");
          console.error(error);
        }
      }
    });
    
  };

  return (
    <div className="max-w-xl mx-auto mt-14 p-6 bg-white rounded-2xl shadow-lg border">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
        Add Doctor Specialization
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter specialization"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 flex justify-center items-center gap-2 transition"
        >
          <PlusCircle className="w-5 h-5" />
          Add Specialization
        </button>

        {message && (
          <div className="text-sm text-center mt-2 font-medium text-blue-600">
            {message}
          </div>
        )}
      </form>

      {/* Specialization List */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">
          Existing Specializations:
        </h3>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
          {specializations?.map((spec) => (
            <div
              key={spec._id}
              className="flex justify-between items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium"
            >
              <span>{spec.name}</span>
              <button
                onClick={() => handleDelete(spec._id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecializationForm;
