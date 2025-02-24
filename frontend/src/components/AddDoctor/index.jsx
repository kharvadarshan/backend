

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

        // <div className="conatiner d-flex justify-content-center align-items-center mt-3 mb-5 mx-lg-5">
        //   <div className="card p-4 bg-dark text-white shadow-lg rounded-4 w-auto">
        //        <h2 className="text-center text-danger fw-bold mb-4">Add Doctor</h2>
        //         <form className="" >
                     
        //             <div className="row ">
        //              <div className="col mb-3">
        //                    <label htmlFor="name" className="form-label">
        //                       Your Name
        //                    </label>
        //                       <input
        //                         type="text"
        //                         id="name"
        //                         className="form-control"
        //                         placeholder="Enter Your Name"
        //                         required
        //                      />
        //                </div>
        //                <div className="col mb-3">
        //                    <label htmlFor="specialization" className="form-label">
        //                       Saypecialization
        //                    </label>
        //                     <input
        //                       type="text"
        //                       id="specialization"
        //                       className="form-control"
        //                       placeholder="Enter Your Specialization"
        //                       required
        //                     />
        //                </div>
        //              </div>
                     
        //             <div className="row ">         
        //                   <div className=" col mb-3">
        //                          <label htmlFor="experience" className="form-label">
        //                             Experience
        //                          </label>
        //                           <input
        //                             type="text"
        //                             id="experience"
        //                             className="form-control"
        //                             placeholder="Enter Your experience"
        //                             required
        //                           />
        //                      </div>
        //                      <div className=" col mb-3">
        //                           <label htmlFor="experience" className="form-label">
        //                             Degree 
        //                          </label>
        //                           <input
        //                             type="text"
        //                             id="degree"
        //                             className="form-control"
        //                             placeholder="Enter Your Degree"
        //                             required
        //                           />
        //                      </div>
        //             </div>
        //             <div className="row">
        //                 <div className="col mb-3">
        //                      <label htmlFor="experience" className="form-label">
        //                             Fees
        //                          </label>
        //                           <input
        //                             type="text"
        //                             id="degree"
        //                             className="form-control"
        //                             placeholder="Enter Your Fees"
        //                             required
        //                           />
        //                 </div>
        //             </div>
        //             <div className="row">
        //             <div className="col mb-3">
        //                      <label htmlFor="experience" className="form-label">
        //                             Address 
        //                          </label>
        //                           <input
        //                             type="text"
        //                             id="address"
        //                             className="form-control"
        //                             placeholder="Enter Your Address"
        //                             required
        //                           />
        //                      </div>
        //             </div>
        //             <div className="row">
        //                 <div className="col mb-3 d-flex flex-column">
        //                       <label htmlFor="experience" className="form-label">
        //                             About  
        //                          </label>
        //                         <textarea placeholder="Enter About"></textarea>
        //                 </div>
        //             </div>
                    
        //             <div className="row">
        //                  <div className="col mb-3 d-flex flex-row align-items-center justify-content-center">
        //                  <button className=" btn btn-danger w-100 mt-3">Add Doctor</button>
        //                  </div>
                         
        //             </div>
                    
                           
        //         </form>
        //   </div>
        // </div>
    )
}
export default AddDoctor;