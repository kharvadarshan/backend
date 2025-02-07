

const ContactApp = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center  mt-5 mb-5 min-vw-100">
    <div className="card p-4 bg-dark text-white shadow-lg rounded-4 w-50" >
      <h2 className="text-center text-danger fw-bold mb-4">Contact Us</h2>
      <form>
        {/* Name Input */}
        <div className="mb-3">
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
  
        {/* Email Input */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Your Email Address
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="john@example.com"
            required
          />
        </div>
  
        {/* Message Input */}
        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Your Message
          </label>
          <textarea
            id="message"
            className="form-control"
            rows="5"
            placeholder="Type your message here..."
            required
          ></textarea>
        </div>
  
        {/* Submit Button */}
        <div className="text-center mb-3 mt-5">
          <button type="submit" className="btn btn-danger w-100 py-2 fw-bold">
            Send Message
          </button>
        </div>
      </form>
    </div>
  </div>
  
  )
}

export default ContactApp