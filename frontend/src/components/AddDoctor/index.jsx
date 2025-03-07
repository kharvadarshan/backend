

const AddDoctor=()=>{
    return(

    <div className="container  flex justify-center items-center mt-[80px] lg:mt-[40px] mb-5 px-4 lg:px-20">
      <div className="bg-gray-900 text-white shadow-lg rounded-lg p-6 w-full max-w-7xl">
        <h2 className="text-center text-red-500 font-bold text-2xl mb-4">Add Doctor</h2>
        <form>
          <div className="grid grid-cols-1 lg:m-5 gap-4">
            <div>
              <label htmlFor="name" className="block mb-1">Your Name</label>
              <input
                type="text"
                id="name"
                className="w-full lg:max-w-6xl  p-2 border border-gray-300 rounded-lg text-black"
                placeholder="Enter Your Name"
                required
              />
            </div>
            <div>
              <label htmlFor="specialization" className="block mb-1">Specialization</label>
              <input
                type="text"
                id="specialization"
                className="w-full p-2  border border-gray-300 rounded-lg text-black"
                placeholder="Enter Your Specialization"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:m-5  gap-4 mt-4">
            <div>
              <label htmlFor="experience" className="block mb-1">Experience</label>
              <input
                type="text"
                id="experience"
                className="w-full p-2 border border-gray-300 rounded-lg text-black"
                placeholder="Enter Your Experience"
                required
              />
            </div>
            <div>
              <label htmlFor="degree" className="block mb-1">Degree</label>
              <input
                type="text"
                id="degree"
                className="w-full p-2 border border-gray-300 rounded-lg text-black"
                placeholder="Enter Your Degree"
                required
              />
            </div>
          </div>

          <div className="mt-4 lg:m-5 ">
            <label htmlFor="fees" className="block mb-1">Fees</label>
            <input
              type="text"
              id="fees"
              className="w-full p-2 border border-gray-300 rounded-lg text-black"
              placeholder="Enter Your Fees"
              required
            />
          </div>

          <div className="mt-4 lg:m-5 ">
            <label htmlFor="address" className="block mb-1">Address</label>
            <input
              type="text"
              id="address"
              className="w-full p-2 border border-gray-300 rounded-lg text-black"
              placeholder="Enter Your Address"
              required
            />
          </div>

          <div className="mt-4 lg:m-5 ">
            <label htmlFor="about" className="block mb-1">About</label>
            <textarea
              id="about"
              className="w-full p-2 border border-gray-300 rounded-lg text-black"
              placeholder="Enter About"
              rows="3"
            ></textarea>
          </div>

          <div className="flex justify-center mt-4">
            <button className="bg-red-500 text-white px-6 py-2 rounded-lg w-full md:w-auto">Add Doctor</button>
          </div>
        </form>
      </div>
    </div>
    )
}
export default AddDoctor;