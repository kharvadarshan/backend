import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 6;

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/allcontacts`,{withCredentials:true}
      );
      const sortedContacts = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setContacts(sortedContacts);
    } catch (error) {
      console.error("Error Fetching All Contacts:", error);
    }
  };

  const handleDeleteContact = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?"))
      return;

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/allcontacts/${id}`,{withCredentials:true}
      );
      alert(response.data.message);
      fetchContacts();
    } catch (error) {
      console.error("Error in delete contact: Frontend", error);
      alert("Failed to delete contact. Please try again.");
    }
  };

  const totalPages = Math.ceil(contacts.length / contactsPerPage);
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = contacts.slice(
    indexOfFirstContact,
    indexOfLastContact
  );

  // const paginate = (direction) => {
  //   setCurrentPage((prevPage) => {
  //     if (direction === "next")
  //       return prevPage < totalPages ? prevPage + 1 : prevPage;
  //     if (direction === "prev") return prevPage > 1 ? prevPage - 1 : prevPage;
  //     return prevPage;
  //   });
  // };

  return (
    <div className="w-full  min-h-[650px] flex flex-col items-center bg-gray-100 p-6">
      <motion.h1
        className="text-4xl font-bold text-indigo-600 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Contact List
      </motion.h1>

      <div className="w-full  max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentContacts.map((contact, index) => (
          <motion.div
            key={contact._id || index}
            className="bg-white hover:bg-blue-50 p-5 shadow-lg rounded-lg flex flex-col items-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-semibold">{contact.name}</h3>
            <p className="text-blue-600 text-sm">{contact.email}</p>
            <p className="text-gray-500 text-xs mt-1">
              {new Date(contact.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            <motion.button
              onClick={() => setSelectedContact(contact)}
              whileHover={{ scale: 1.1 }}
              className="mt-3 bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition w-full sm:w-36"
            >
              View Reason
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="mt-3 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition w-full sm:w-36"
              onClick={() => {
                const email = contact.email;
                if (email)
                  window.location.href = `https://mail.google.com/mail/?view=cm&to=${email}`;
              }}
            >
              Send Email
            </motion.button>
            <motion.button
              onClick={() => handleDeleteContact(contact._id)}
              whileHover={{ scale: 1.1 }}
              className="mt-3 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition w-full sm:w-36"
            >
              Delete
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* <div className="flex items-center mt-6 space-x-4">
        <motion.button
          whileHover={{ scale: 1.2 }}
          onClick={() => paginate("prev")}
          disabled={currentPage === 1}
          className="bg-blue-600 text-white p-3 rounded-full disabled:opacity-50"
        >
          <FaArrowLeft />
        </motion.button>

        <span className="text-lg font-semibold">
          Page {currentPage} of {totalPages}
        </span>

        <motion.button
          whileHover={{ scale: 1.2 }}
          onClick={() => paginate("next")}
          disabled={currentPage === totalPages}
          className="bg-blue-600 text-white p-3 rounded-full disabled:opacity-50"
        >
          <FaArrowRight />
        </motion.button>
      </div> */}

      <div className="flex justify-center mt-8">
        <div className="flex items-center justify-center space-x-3 border border-gray-300 rounded-lg px-6 py-3 shadow-lg bg-white w-full max-w-md">
          <button
            className="px-4 py-2 rounded-full text-sm md:text-xl font-semibold bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            ◀ Prev
          </button>
          <span className="px-4 py-2 md:text-xl  rounded-full bg-indigo-500 text-white text-sm font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 rounded-full text-sm font-semibold bg-gray-200 hover:bg-gray-300 md:text-xl  disabled:opacity-50"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next ▶
          </button>
        </div>
      </div>

      {selectedContact && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedContact(null)}
        >
          <motion.div
            className="bg-white p-6 shadow-xl rounded-lg w-[90%] sm:w-[450px]"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Message</h2>
            <p className="text-gray-700">
              {selectedContact.message || "No message provided."}
            </p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ContactList;

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";

// const ContactList = () => {
//   const [contacts, setContacts] = useState([]);
//   const [selectedContact, setSelectedContact] = useState(null);

//   useEffect(() => {
//     fetchContacts();
//   }, []);

//   const fetchContacts = async () => {
//     try {
//       const response = await axios.get("http://localhost:5001/api/allcontacts");
//       setContacts(response.data);
//     } catch (error) {
//       console.error("Error Fetching All Contacts:", error);
//     }
//   };

//   const handleDeleteContact = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this contact?")) return;

//     try {
//         const response = await axios.delete(`http://localhost:5001/api/allcontacts/${id}`);
//         alert(response.data.message);
//         fetchContacts();
//     } catch (error) {
//         console.error("Error in delete contact: Frontend", error);
//         alert("Failed to delete contact. Please try again.");
//     }
// };

//   return (
//     <div className="w-full min-h-[650px]  flex flex-col  items-center bg-gray-200 p-4">
//       <motion.h1
//         className="p-2 md:m-2 lg:pt-0  text-2xl  sm:text-3xl font-bold text-center mb-4"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         Contact List
//       </motion.h1>

//       <div className="w-full   lg:max-w-6xl sm:max-w-2xl md:max-w-3xl  md:max-h-[1500px] overflow-y-auto bg-white shadow-lg rounded-lg p-2 sm:p-4">
//         {contacts.map((contact, index) => (
//           <motion.div
//             key={contact.id || index}
//             className="bg-gray-300 shadow rounded-lg p-3 sm:p-4 gap-1 flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 mt-2"
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: 50 }}
//             transition={{ duration: 0.3 }}
//           >
//             <div className="relative p-5 flex w-full md:w-0 items-center justify-center z-0">
//               <div className="absolute w-12 h-12 bg-gradient-to-r from-[#00c6ff] to-[#0072ff] rounded-full"></div>
//               <span className="text-2xl font-semibold relative ">
//                 {index + 1}
//               </span>
//             </div>

//             <div className="w-full">
//               <p className="text-xl md:text-2xl font-semibold text-center">
//                 {contact.name}
//               </p>
//               <p className="text-blue-600  md:text-xl text-center ">
//                 {contact.email}
//               </p>
//             </div>

//             <motion.button
//               onClick={() => setSelectedContact(contact)}
//               whileHover={{ scale: 0.9 }}
//               whileTap={{ scale: 1.4 }}
//               className="mt-2 mr-2 sm:mt-0 bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition w-full sm:w-auto"
//             >
//               Reason
//             </motion.button>

//             <motion.button
//               whileHover={{ scale: 0.9 }}
//               whileTap={{ scale: 1.4 }}
//               className="mt-2 mr-2 sm:mt-0 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition w-full sm:w-auto"
//               onClick={() => {
//                 const email = contact.email;
//                 if (email) {
//                   window.location.href = `https://mail.google.com/mail/?view=cm&to=${email}`;
//                 } else {
//                   alert("No email found!");
//                 }
//               }}
//             >
//               Email
//             </motion.button>

//             <motion.button
//               onClick={() => handleDeleteContact(contact._id)}
//               whileHover={{ scale: 0.9 }}
//               whileTap={{ scale: 1.4 }}
//               className="mt-2 sm:mt-0 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition w-full sm:w-auto"
//             >
//               Delete
//             </motion.button>
//           </motion.div>
//         ))}
//       </div>

//       {selectedContact && (
//         <>
//           <div
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40"
//             onClick={() => setSelectedContact(null)}
//           ></div>

//           <motion.div
//             className="fixed bg-white shadow-2xl p-6 rounded-lg w-[90%] sm:w-[450px] max-w-[90%] z-50"
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.8 }}
//             transition={{ duration: 0.3 }}
//             style={{
//               minHeight: "150px",
//               maxHeight: "80vh",
//               overflowY: "auto",
//             }}
//           >
//             <button
//               onClick={() => setSelectedContact(null)}
//               className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl"
//             >
//               ✖
//             </button>

//             <h2 className="text-2xl font-semibold mb-4 text-center">Reason</h2>
//             <div
//               className="overflow-y-auto"
//               style={{ maxHeight: "65vh", wordBreak: "break-word" }}
//             >
//               <p className="text-gray-700 text-center">
//                 {selectedContact.message || "No Reason Provided"}
//               </p>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </div>
//   );
// };

// export default ContactList;
