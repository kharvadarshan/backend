import React from "react";
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

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-20">
        <div className="container mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            About Our Hospital Appointment System
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl max-w-2xl mx-auto"
          >
            We are dedicated to providing a seamless and efficient appointment scheduling experience for patients and healthcare providers.
          </motion.p>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Who We Are
            </h2>
            <p className="text-gray-600 mb-4">
              Our hospital appointment scheduling system is designed to simplify the process of booking, managing, and tracking medical appointments. Whether you're a patient or a healthcare provider, our platform ensures a hassle-free experience.
            </p>
            <p className="text-gray-600 mb-4">
              With a focus on user-friendly design and advanced technology, we aim to bridge the gap between patients and doctors, making healthcare more accessible and efficient.
            </p>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center"
          >
            <img
              src="https://img.freepik.com/free-vector/online-doctor-concept-illustration_114360-1836.jpg"
              alt="About Us"
              className="rounded-lg shadow-lg w-full max-w-md"
            />
          </motion.div>
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-gray-800 text-center mb-8"
          >
            Our Mission
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: "🌍",
                title: "Accessibility",
                description: "We aim to make healthcare accessible to everyone, regardless of location or time constraints.",
              },
              {
                icon: "⏱️",
                title: "Efficiency",
                description: "Streamline appointment scheduling to save time for both patients and doctors.",
              },
              {
                icon: "🚀",
                title: "Innovation",
                description: "Leverage cutting-edge technology to provide a seamless user experience.",
              },
            ].map((mission, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <span className="text-4xl mb-4">{mission.icon}</span>
                <h3 className="text-xl font-semibold mb-4">{mission.title}</h3>
                <p className="text-gray-600">{mission.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-gray-800 text-center mb-8"
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          className="max-w-3xl mx-auto"
        >
          {[
            {
              question: "How do I book an appointment?",
              answer: "You can book an appointment by logging into your account, selecting a doctor, and choosing a convenient time slot.",
            },
            {
              question: "Can I reschedule my appointment?",
              answer: "Yes, you can reschedule your appointment anytime through your dashboard.",
            },
            {
              question: "Is my personal information secure?",
              answer: "Absolutely! We use advanced encryption to protect your data.",
            },
            {
              question: "Do you support emergency appointments?",
              answer: "Yes, we have a dedicated system for emergency bookings.",
            },
          ].map((faq, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="mb-6"
            >
              <details className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow">
                <summary className="font-semibold text-gray-800">
                  {faq.question}
                </summary>
                <p className="mt-4 text-gray-600">{faq.answer}</p>
              </details>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Unique Features Section */}
      <div className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-gray-800 text-center mb-8"
          >
            Unique Features
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: "📅",
                title: "Real-Time Availability",
                description: "View and book appointments based on real-time doctor availability.",
              },
              {
                icon: "📱",
                title: "Mobile-Friendly",
                description: "Access our platform on any device, anytime, anywhere.",
              },
              {
                icon: "🔒",
                title: "Secure Payments",
                description: "Safe and secure payment options for hassle-free transactions.",
              },
              {
                icon: "📝",
                title: "Automated Reminders",
                description: "Get reminders via email or SMS for your upcoming appointments.",
              },
              {
                icon: "👨‍⚕️",
                title: "Doctor Profiles",
                description: "Detailed profiles of doctors to help you make informed decisions.",
              },
              {
                icon: "💬",
                title: "24/7 Support",
                description: "Our support team is always available to assist you.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <span className="text-4xl mb-4">{feature.icon}</span>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-4"
          >
            Ready to Book Your Appointment?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg mb-8"
          >
            Join thousands of satisfied patients and experience the future of healthcare scheduling.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            Get Started
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default About;