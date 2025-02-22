import axios from 'axios'


    const ContactForm = () => {

        const handleSubmit = async (e) => {
            e.preventDefault();
            
            const formData = {
              name: e.target.name.value,
              email: e.target.email.value,
              message: e.target.message.value,
              
            };
            e.target.name.value = "";
            e.target.email.value = "";
            e.target.message.value = "";
            
            try {
                const response = await axios.post("http://localhost:5001/api/contact", formData);
              
                if (response.status === 201) { // 201 for successful creation
                  alert("Message sent successfully!");
                } else {
                  alert("Failed to send message.");
                }
            } 
            catch (error) {
                console.error("Error submitting contact form:", error);
            }
              
        }
  
        return (
            <div className='mx-auto  flex max-w-sm  items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10'>

            <h2 className='text-3xl text-center text-pink-600 font-bold mb-6'>Contact Us</h2>

            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className='block text-orange-900 text-sm font-semibold mb-2' htmlFor="">Your Name</label>
                    <input name="name" placeholder='Enter Your Name' className='w-full  px-3 py-2  border rounded-lg bg-gray-200 focus:outline-none focus:border-blue-500' required type="text" />
                </div>
                <div className='mb-4'>
                    <label className='block text-orange-900  text-sm font-semibold mb-2' htmlFor="">Your Email Address</label>
                    <input name="email" placeholder='john@example.com' className='w-full px-3 py-2  border rounded-lg bg-gray-200 focus:outline-none focus:border-blue-500' required type="email" />
                </div>
                <div className='mb-4'>
                    <label className='block text-orange-900  text-sm font-semibold mb-2' htmlFor="">Your Message</label>
                    <textarea name="message" rows='4' placeholder='Type Your Message here...' className='w-full  px-3 py-2 border rounded-lg bg-gray-200 focus:outline-none focus:border-blue-500' required type="text" />
                </div>
                <div className="flex justify-center  ">
                    <button type="submit" className="bg-pink-500 text-white px-4 font-semibold py-2 rounded-lg hover:bg-pink-600 focus:outline-white">Send Message</button>
                </div>
            </form>
        </div>
        
        )
    }


export default ContactForm;