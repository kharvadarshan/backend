

const AddDoctor=()=>{
    return(
        <div className="conatiner d-flex justify-content-center align-items-center mt-3 mb-5 mx-lg-5">
          <div className="card p-4 bg-dark text-white shadow-lg rounded-4 w-auto">
               <h2 className="text-center text-danger fw-bold mb-4">Add Doctor</h2>
                <form className="" >
                     
                    <div className="row ">
                     <div className="col mb-3">
                           <label htmlFor="name" className="form-label">
                              Your Name
                           </label>
                              <input
                                type="text"
                                id="name"
                                className="form-control"
                                placeholder="Enter Your Name"
                                required
                             />
                       </div>
                       <div className="col mb-3">
                           <label htmlFor="specialization" className="form-label">
                              Saypecialization
                           </label>
                            <input
                              type="text"
                              id="specialization"
                              className="form-control"
                              placeholder="Enter Your Specialization"
                              required
                            />
                       </div>
                     </div>
                     
                    <div className="row ">         
                          <div className=" col mb-3">
                                 <label htmlFor="experience" className="form-label">
                                    Experience
                                 </label>
                                  <input
                                    type="text"
                                    id="experience"
                                    className="form-control"
                                    placeholder="Enter Your experience"
                                    required
                                  />
                             </div>
                             <div className=" col mb-3">
                                  <label htmlFor="experience" className="form-label">
                                    Degree 
                                 </label>
                                  <input
                                    type="text"
                                    id="degree"
                                    className="form-control"
                                    placeholder="Enter Your Degree"
                                    required
                                  />
                             </div>
                    </div>
                    <div className="row">
                        <div className="col mb-3">
                             <label htmlFor="experience" className="form-label">
                                    Fees
                                 </label>
                                  <input
                                    type="text"
                                    id="degree"
                                    className="form-control"
                                    placeholder="Enter Your Fees"
                                    required
                                  />
                        </div>
                    </div>
                    <div className="row">
                    <div className="col mb-3">
                             <label htmlFor="experience" className="form-label">
                                    Address 
                                 </label>
                                  <input
                                    type="text"
                                    id="address"
                                    className="form-control"
                                    placeholder="Enter Your Address"
                                    required
                                  />
                             </div>
                    </div>
                    <div className="row">
                        <div className="col mb-3 d-flex flex-column">
                              <label htmlFor="experience" className="form-label">
                                    About  
                                 </label>
                                <textarea placeholder="Enter About"></textarea>
                        </div>
                    </div>
                    
                    <div className="row">
                         <div className="col mb-3 d-flex flex-row align-items-center justify-content-center">
                         <button className=" btn btn-danger w-100 mt-3">Add Doctor</button>
                         </div>
                         
                    </div>
                    
                           
                </form>
          </div>
        </div>
    )
}
export default AddDoctor;