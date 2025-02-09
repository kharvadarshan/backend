
    const ContactForm = () => {
        return (
            <div className='max-w-md w-full  mx-auto p-6 bg-orange-300 rounded-lg shadow-md'>

            <h2 className='text-3xl text-center text-pink-600 font-bold mb-6'>Contact Us</h2>

            <form action="">
                <div className='mb-4'>
                    <label className='block text-white text-sm font-semibold mb-2' htmlFor="">Your Name</label>
                    <input placeholder='Enter Your Name' className='w-full  px-3 py-2 text-orange-600 border rounded-lg bg-gray-200 focus:outline-none focus:border-blue-500' required type="text" />
                </div>
                <div className='mb-4'>
                    <label className='block text-white text-sm font-semibold mb-2' htmlFor="">Your Email Address</label>
                    <input placeholder='john@example.com' className='w-full px-3 py-2 text-orange-600 border rounded-lg bg-gray-200 focus:outline-none focus:border-blue-500' required type="email" />
                </div>
                <div className='mb-4'>
                    <label className='block text-white text-sm font-semibold mb-2' htmlFor="">Your Message</label>
                    <textarea rows='4' placeholder='Type Your Message here...' className='w-full text-orange-600 px-3 py-2 border rounded-lg bg-gray-200 focus:outline-none focus:border-blue-500' required type="text" />
                </div>
                <div className="flex justify-center  ">
                    <button type="submit" className="bg-pink-500 text-white px-4 font-semibold py-2 rounded-lg hover:bg-pink-600 focus:outline-white">Send Message</button>
                </div>
            </form>
        </div>
        
        )
    }
    
    export default ContactForm;