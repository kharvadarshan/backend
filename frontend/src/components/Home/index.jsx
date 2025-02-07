
import './style.css';

const Home = () => {
  return (
    <>
      <div className="homepage container mx-auto px-4">
        {/* Hero Section */}
        <div className="hero-section grid grid-cols-1 md:grid-cols-2 items-center text-center md:text-left bg-blue-600 text-white py-12 px-6 rounded-2xl">
          <div>
            <h1 className="text-4xl font-bold">Book Your Appointment Today</h1>
            <p className="text-lg mt-4">
              Simplify your scheduling process and get access to the best professionals with just a few clicks!
            </p>
            <button className="bg-white text-blue-600 px-6 py-3 mt-5 rounded-lg font-semibold hover:bg-blue-200">
              Get Started
            </button>
          </div>
          <div className="mt-8 md:mt-0">
            <img
              src="https://team2book.com/wp-content/uploads/2023/12/scheduling_healthcare.jpg"
              className="w-3/4 mx-auto"
              alt="Appointment Illustration"
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-center">
          <div className="p-6">
            <i className="bi bi-calendar-check text-5xl text-blue-600"></i>
            <h3 className="text-xl font-semibold mt-4">Easy Scheduling</h3>
            <p className="mt-2 text-gray-600">
              Book appointments with just a few clicks, anytime and anywhere.
            </p>
          </div>
          <div className="p-6">
            <i className="bi bi-people text-5xl text-blue-600"></i>
            <h3 className="text-xl font-semibold mt-4">Qualified Professionals</h3>
            <p className="mt-2 text-gray-600">
              Connect with certified professionals and experts in your area.
            </p>
          </div>
          <div className="p-6">
            <i className="bi bi-bell text-5xl text-blue-600"></i>
            <h3 className="text-xl font-semibold mt-4">Timely Reminders</h3>
            <p className="mt-2 text-gray-600">
              Get notifications and reminders to stay on top of your schedule.
            </p>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="testimonials-section border-t-4 border-blue-600 bg-gray-100 mt-12 py-12">
          <h2 className="text-center text-2xl font-bold text-blue-600">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="text-center">
              <p className="italic text-gray-600">
                &ldquo;This app made booking appointments so effortless! Highly recommended.&rdquo;
              </p>
              <h6 className="mt-2 font-semibold">- Jane Doe</h6>
            </div>
            <div className="text-center">
              <p className="italic text-gray-600">
                &ldquo;Great platform with amazing features. Loved the reminders!&rdquo;
              </p>
              <h6 className="mt-2 font-semibold">- John Smith</h6>
            </div>
            <div className="text-center">
              <p className="italic text-gray-600">
                &ldquo;I found the best doctor through this app. Fantastic experience!&rdquo;
              </p>
              <h6 className="mt-2 font-semibold">- Emma Wilson</h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;



// import './style.css';
// const Home=()=>{
//     return (
//         <>
//                   <div className="homepage container  mx-0">
//             {/* Hero Section */}
//             <div className="hero-section row align-items-center text-center text-md-start">
//                 <div className="col-md-6 px-5">
//                     <h1 className="display-4">Book Your Appointment Today</h1>
//                     <p className="lead">
//                         Simplify your scheduling process and get access to the best professionals with just a few clicks!
//                     </p>
//                     <button className="btn btn-primary btn-lg mt-3">Get Started</button>
//                 </div>
//                 <div className="col-md-6 text-center">
//                     <img
//                         src="https://team2book.com/wp-content/uploads/2023/12/scheduling_healthcare.jpg"
//                         className="img-fluid"
//                         style={{ width:'60%',height:'60%'}}
//                         alt="Appointment Illustration"
//                     />
//                 </div>
//             </div>

//             {/* Features Section */}
//             <div className="features-section row mt-5 text-center">
//                 <div className="col-md-4 p-3">
//                     <i className="bi bi-calendar-check display-4 text-primary"></i>
//                     <h3 className="mt-3">Easy Scheduling</h3>
//                     <p>Book appointments with just a few clicks, anytime and anywhere.</p>
//                 </div>
//                 <div className="col-md-4 p-3">
//                     <i className="bi bi-people display-4 text-primary"></i>
//                     <h3 className="mt-3">Qualified Professionals</h3>
//                     <p>Connect with certified professionals and experts in your area.</p>
//                 </div>
//                 <div className="col-md-4 p-3">
//                     <i className="bi bi-bell display-4 text-primary"></i>
//                     <h3 className="mt-3">Timely Reminders</h3>
//                     <p>Get notifications and reminders to stay on top of your schedule.</p>
//                 </div>
//             </div>

//             {/* Testimonials Section */}
//             <div className="testimonials-section row mt-5 bg-light py-5">
//                 <h2 className="text-center">What Our Users Say</h2>
//                 <div className="col-md-4 text-center">
//                     <p> &ldquo;This app made booking appointments so effortless! Highly recommended.&rdquo;</p>
//                     <h6>- Jane Doe</h6>
//                 </div>
//                 <div className="col-md-4 text-center">
//                     <p> &ldquo;Great platform with amazing features. Loved the reminders!&rdquo;</p>
//                     <h6>- John Smith</h6>
//                 </div>
//                 <div className="col-md-4 text-center">
//                     <p> &ldquo;I found the best doctor through this app. Fantastic experience!&rdquo;</p>
//                     <h6>- Emma Wilson</h6>
//                 </div>
//             </div>
//         </div>
//         </>
//     )
// }

// export default Home;