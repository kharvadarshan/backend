const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* About Section */}
          <div>
            <h5 className="text-lg font-semibold mb-2">About Us</h5>
            <p className="text-sm">
              We are committed to providing the best appointment booking services with ease and convenience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-lg font-semibold mb-2">Quick Links</h5>
            <ul className="space-y-2">
              <li>
                <a href="/home" className="text-gray-300 hover:text-white text-sm">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-300 hover:text-white text-sm">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-white text-sm">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/faq" className="text-gray-300 hover:text-white text-sm">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h5 className="text-lg font-semibold mb-2">Contact Us</h5>
            <p className="text-sm flex items-center">
              <i className="bi bi-geo-alt-fill mr-2"></i>123 Main Street, City, Country
            </p>
            <p className="text-sm flex items-center">
              <i className="bi bi-envelope-fill mr-2"></i>support@booking.com
            </p>
            <p className="text-sm flex items-center">
              <i className="bi bi-phone-fill mr-2"></i>+123 456 7890
            </p>
          </div>
        </div>

        <hr className="border-gray-700 my-6" />

        {/* Social Media */}
        <div className="text-center mb-3">
          <a href="https://facebook.com" className="text-gray-300 hover:text-white mx-3">
            <i className="bi bi-facebook text-xl"></i>
          </a>
          <a href="https://twitter.com" className="text-gray-300 hover:text-white mx-3">
            <i className="bi bi-twitter text-xl"></i>
          </a>
          <a href="https://instagram.com" className="text-gray-300 hover:text-white mx-3">
            <i className="bi bi-instagram text-xl"></i>
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <small className="text-sm">&copy; 2025 Appointment Booking. All Rights Reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;






// const Footer = () => {
//   return (
//     <footer className="bg-dark text-light py-4">
//       <div className="container">
//         <div className="row">
//           {/* About Section */}
//           <div className="col-md-4 mb-3">
//             <h5>About Us</h5>
//             <p>
//               We are committed to providing the best appointment booking services with ease and convenience.
//             </p>
//           </div>

//           {/* Quick Links */}
//           <div className="col-md-4 mb-3">
//             <h5>Quick Links</h5>
//             <ul className="list-unstyled">
//               <li><a href="/home" className="text-light text-decoration-none">Home</a></li>
//               <li><a href="/about" className="text-light text-decoration-none">About</a></li>
//               <li><a href="/contact" className="text-light text-decoration-none">Contact Us</a></li>
//               <li><a href="/faq" className="text-light text-decoration-none">FAQs</a></li>
//             </ul>
//           </div>

//           {/* Contact Information */}
//           <div className="col-md-4 mb-3">
//             <h5>Contact Us</h5>
//             <p><i className="bi bi-geo-alt-fill me-2"></i>123 Main Street, City, Country</p>
//             <p><i className="bi bi-envelope-fill me-2"></i>support@booking.com</p>
//             <p><i className="bi bi-phone-fill me-2"></i>+123 456 7890</p>
//           </div>
//         </div>

//         <hr className="bg-light" />

//         {/* Social Media */}
//         <div className="text-center">
//           <a href="https://facebook.com" className="text-light me-3">
//             <i className="bi bi-facebook"></i>
//           </a>
//           <a href="https://twitter.com" className="text-light me-3">
//             <i className="bi bi-twitter"></i>
//           </a>
//           <a href="https://instagram.com" className="text-light">
//             <i className="bi bi-instagram"></i>
//           </a>
//         </div>

//         {/* Copyright */}
//         <div className="text-center mt-3">
//           <small>&copy; 2025 Appointment Booking. All Rights Reserved.</small>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
