/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion } from "framer-motion";

const ContactList = () => {
  const [contacts, setContacts] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", reason: "General Inquiry" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", reason: "Support Issue" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", reason: "Feedback" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", reason: "Feedback" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", reason: "Feedback" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", reason: "Feedback" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", reason: "Feedback" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", reason: "Feedback" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", reason: "Feedback" },
  ]);

//   const handleDelete = (id) => {
//     setContacts(contacts.filter((contact) => contact.id !== id));
//   };
   
    
  return (
    <div className="w-full min-h-screen max-h-screen flex flex-col  items-center bg-gray-200 p-4">
      <motion.h1
        className="p-2 md:m-2 lg:pt-0  text-2xl  sm:text-3xl font-bold text-center mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Contact List
      </motion.h1>

      <div className="w-full   lg:max-w-6xl sm:max-w-2xl md:max-w-3xl  sm:h-[1500px] overflow-y-auto bg-white shadow-lg rounded-lg p-2 sm:p-4">
        {contacts.map((contact, index) => (
          <motion.div
            key={contact.id}
            className="bg-gray-300 shadow rounded-lg p-3 sm:p-4 gap-1 flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 mt-2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative p-5 flex w-full md:w-0 items-center justify-center z-0">
              <div className="absolute w-12 h-12 bg-gradient-to-r from-[#00c6ff] to-[#0072ff]  rounded-full"></div>
                <span className="text-2xl font-semibold relative ">
                  {index + 1}
                </span>
            </div>

            <div className="w-full">
              <p className="text-xl md:text-2xl font-semibold text-center">
                 {contact.name}
              </p>
              <p className="text-blue-600  md:text-xl text-center ">{contact.email}</p>
              {/* <p className="text-blue-500">{contact.reason}</p> */}
            </div>

            <motion.button
            //   onClick={() => handleDelete(contact.id)}
              whileHover={{ scale: 0.9 }}
              whileTap={{ scale: 0.9 }}
              className="mt-2 mr-2 sm:mt-0 bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition w-full sm:w-auto"
            >
              Reason
            </motion.button>

            <motion.button
            //   onClick={() => handleDelete(contact.id)}
              whileHover={{ scale: 0.9 }}
              whileTap={{ scale: 0.9 }}
              className="mt-2 mr-2 sm:mt-0 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition w-full sm:w-auto"
            >
              Email
            </motion.button>

            <motion.button
            //   onClick={() => handleDelete(contact.id)}
              whileHover={{ scale: 0.9 }}
              whileTap={{ scale: 0.9 }}
              className="mt-2 sm:mt-0 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition w-full sm:w-auto"
            >
              Delete
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;