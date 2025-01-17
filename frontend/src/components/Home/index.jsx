
import './style.css';
const Home=()=>{
    return (
        <>
                  <div className="homepage container  mx-0">
            {/* Hero Section */}
            <div className="hero-section row align-items-center text-center text-md-start">
                <div className="col-md-6 px-5">
                    <h1 className="display-4">Book Your Appointment Today</h1>
                    <p className="lead">
                        Simplify your scheduling process and get access to the best professionals with just a few clicks!
                    </p>
                    <button className="btn btn-primary btn-lg mt-3">Get Started</button>
                </div>
                <div className="col-md-6 text-center">
                    <img
                        src="https://team2book.com/wp-content/uploads/2023/12/scheduling_healthcare.jpg"
                        className="img-fluid"
                        style={{ width:'60%',height:'60%'}}
                        alt="Appointment Illustration"
                    />
                </div>
            </div>

            {/* Features Section */}
            <div className="features-section row mt-5 text-center">
                <div className="col-md-4 p-3">
                    <i className="bi bi-calendar-check display-4 text-primary"></i>
                    <h3 className="mt-3">Easy Scheduling</h3>
                    <p>Book appointments with just a few clicks, anytime and anywhere.</p>
                </div>
                <div className="col-md-4 p-3">
                    <i className="bi bi-people display-4 text-primary"></i>
                    <h3 className="mt-3">Qualified Professionals</h3>
                    <p>Connect with certified professionals and experts in your area.</p>
                </div>
                <div className="col-md-4 p-3">
                    <i className="bi bi-bell display-4 text-primary"></i>
                    <h3 className="mt-3">Timely Reminders</h3>
                    <p>Get notifications and reminders to stay on top of your schedule.</p>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="testimonials-section row mt-5 bg-light py-5">
                <h2 className="text-center">What Our Users Say</h2>
                <div className="col-md-4 text-center">
                    <p> &ldquo;This app made booking appointments so effortless! Highly recommended.&rdquo;</p>
                    <h6>- Jane Doe</h6>
                </div>
                <div className="col-md-4 text-center">
                    <p> &ldquo;Great platform with amazing features. Loved the reminders!&rdquo;</p>
                    <h6>- John Smith</h6>
                </div>
                <div className="col-md-4 text-center">
                    <p> &ldquo;I found the best doctor through this app. Fantastic experience!&rdquo;</p>
                    <h6>- Emma Wilson</h6>
                </div>
            </div>
        </div>
        </>
    )
}

export default Home;