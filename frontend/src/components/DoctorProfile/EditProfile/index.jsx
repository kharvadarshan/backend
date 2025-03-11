const EditProfile = () => {
  return (
    <div className="flex-1 p-4 md:p-8">
      {/* Heading */}
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Profile</h1>

      {/* Profile Card */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
        {/* Profile Image and Name */}
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          <img
            src="https://randomuser.me/api/portraits/men/94.jpg"
            alt="Profile"
            className="w-20 h-20 md:w-24 md:h-24 rounded-full"
          />
          <div className="text-center md:text-left">
            <h2 className="text-xl md:text-2xl font-bold">John Doe</h2>
            <p className="text-gray-600">john.doe@example.com</p>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-4 md:my-6 border-gray-200" />

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              defaultValue="John Doe"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              defaultValue="john.doe@example.com"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              defaultValue="+1234567890"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Save Changes Button */}
          <button className="w-full md:w-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;