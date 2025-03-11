import { motion } from "framer-motion";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Testimonials data
const testimonials = [
  {
    name: "John Doe",
    comment: "This platform made booking appointments so easy! Highly recommended.",
  },
  {
    name: "Jane Smith",
    comment: "I love the reminders and the user-friendly interface.",
  },
  {
    name: "Alice Johnson",
    comment: "Secure and efficient. It saved me a lot of time!",
  },
  {
    name: "Bob Brown",
    comment: "The best appointment scheduling system I've ever used.",
  },
  {
    name: "Charlie Davis",
    comment: "Highly reliable and easy to use. Great experience!",
  },
];

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-24">
        <div className="container mx-auto text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Welcome to Our Hospital Appointment System
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl max-w-2xl mx-auto"
          >
            Book, manage, and track your medical appointments with ease. Experience the future of healthcare scheduling.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold mt-8 hover:bg-blue-50 transition"
          >
            Get Started
          </motion.button>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-gray-800 text-center mb-12"
        >
          Why Choose Us?
        </motion.h2>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: "📅",
              title: "Easy Booking",
              description: "Quick and hassle-free appointment scheduling.",
            },
            {
              icon: "⏱️",
              title: "Time-Saving",
              description: "Reduce waiting times with real-time availability.",
            },
            {
              icon: "🔒",
              title: "Secure & Private",
              description: "Your data is protected with advanced encryption.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
            >
              <span className="text-4xl mb-4">{feature.icon}</span>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* How It Works Section */}
      <div className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-gray-800 text-center mb-12"
          >
            How It Works
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: "1️⃣",
                title: "Sign Up",
                description: "Create an account to get started.",
              },
              {
                icon: "2️⃣",
                title: "Book Appointment",
                description: "Choose a doctor and time slot.",
              },
              {
                icon: "3️⃣",
                title: "Get Confirmation",
                description: "Receive instant confirmation and reminders.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
              >
                <span className="text-4xl mb-4">{step.icon}</span>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 overflow-hidden">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-gray-800 text-center mb-12"
        >
          What Our Users Say
        </motion.h2>

        {/* Testimonials Scrolling Container */}
        <div className="relative w-full overflow-hidden">
          {/* Scrolling Testimonials */}
          <motion.div
            className="flex"
            animate={{
              x: ["0%", "-100%"], // Move from right to left
            }}
            transition={{
              duration: 20, // Adjust speed here
              repeat: Infinity, // Infinite loop
              ease: "linear", // Smooth scrolling
            }}
          >
            {/* Double the testimonials for seamless looping */}
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-80 bg-white p-6 rounded-lg shadow-md mx-4 hover:shadow-lg transition-shadow"
              >
                <p className="text-gray-600 italic mb-4">
                  {`"${testimonial.comment}"`}
                </p>
                <p className="text-gray-800 font-semibold">- {testimonial.name}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto text-center px-4">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-6"
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg mb-8"
          >
            Join thousands of satisfied users and experience the future of healthcare scheduling.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            Book Now
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Home;