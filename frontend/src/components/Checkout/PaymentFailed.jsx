const PaymentFailed = () => {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100">
        <div className="bg-white shadow-lg rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-red-600">Payment Failed ❌</h2>
          <p className="mt-2 text-gray-600">Please try again later or contact support.</p>
        </div>
      </div>
    );
  };
  
  export default PaymentFailed;
  