import  { useState } from "react";
import axios from "axios";
import { Loader2, CreditCard } from "lucide-react";

const PaymentPage = () => {
  
  const [isLoading, setIsLoading] = useState(false);

  const checkoutHandler = async (amount) => {
    setIsLoading(true);
    try {
      const {
        data: { key },
      } = await axios.get("http://localhost:5001/pay/getkey");

      const {
        data: { order },
      } = await axios.post("http://localhost:5001/pay/checkout", {
        amount,
      });

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "6 Pack Programmer",
        description: "Doctor Appointment Payment",
        image: "https://avatars.githubusercontent.com/u/25058652?v=4",
        order_id: order.id,
        callback_url: "http://localhost:5001/pay/paymentverification",
        prefill: {
          name: "Neel Sathvara",
          email: "neel@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Grownett Office",
        },
        theme: {
          color: "#4f46e5",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Payment Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Confirm Appointment</h1>
        <p className="text-sm text-gray-500 text-center mb-6">Pay ₹500 to book your appointment with Dr. Smith</p>

        <button
          onClick={() => checkoutHandler(500)}
          disabled={isLoading}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-white transition ${
            isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin h-5 w-5" /> Processing...
            </>
          ) : (
            <>
              <CreditCard className="h-5 w-5" /> Pay ₹500
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
