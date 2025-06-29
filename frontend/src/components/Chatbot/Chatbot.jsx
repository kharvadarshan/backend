// // components/HealthChatbot.js
// import React, { useState } from 'react';
// import axios from 'axios';

// const HealthChatbot = () => {
//     const [messages, setMessages] = useState([]);
//     const [input, setInput] = useState('');

//     const sendMessage = async () => {
//         const userMsg = { sender: 'user', text: input };
//         setMessages([...messages, userMsg]);
//         setInput('');

//         try {
//             const res = await axios.post('/api/chatbot/ask', { message: input });
//             const botMsg = { sender: 'bot', text: res.data.reply };
//             setMessages(prev => [...prev, botMsg]);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <div className="chat-container">
//             <div className="chat-box">
//                 {messages.map((msg, index) => (
//                     <div key={index} className={msg.sender === 'user' ? 'user-msg' : 'bot-msg'}>
//                         {msg.text}
//                     </div>
//                 ))}
//             </div>
//             <div className="input-area">
//                 <input
//                     type="text"
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                     placeholder="Ask about your health..."
//                 />
//                 <button onClick={sendMessage}>Send</button>
//             </div>
//         </div>
//     );
// };

// export default HealthChatbot;


// import { useState } from "react";
// // import axios from "axios";

// const Chatbot = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSend = async () => {
//     if (!input) return;

//     setMessages([...messages, { text: input, sender: "user" }]);
//     setInput("");
//     setLoading(true);

//     // try {
//     //   const res = await axios.post("http://localhost:5000/api/chatbot", { query: input });
//     //   setMessages([...messages, { text: res.data.response, sender: "bot" }]);
//     // } catch (err) {
//     //   console.error("Error:", err);
//     // }

//     setLoading(false);
//   };

//   return (
//     <div className="w-full max-w-3xl mx-auto p-4 bg-gray-400 my-20 rounded-lg shadow-md">
//       <h2 className="text-xl font-bold text-center mb-2">Ask the Chatbot</h2>
//       <div className="h-64 overflow-y-auto bg-white p-3 rounded">
//         {messages.map((msg, index) => (
//           <p
//             key={index}
//             className={`p-2 my-1 rounded-md ${
//               msg.sender === "user" ? "bg-blue-500 text-white text-right" : "bg-gray-300 text-black"
//             }`}
//           >
//             {msg.text}
//           </p>
//         ))}
//         {loading && <p className="text-gray-500">Thinking...</p>}
//       </div>
//       <div className="mt-2 flex">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           className="flex-1 p-2 border rounded-md"
//           placeholder="Ask me anything..."
//         />
//         <button
//           onClick={handleSend}
//           className="ml-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;
