const editprofile = ()=>{
    return(
        <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-6">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-24 h-24 rounded-full"
            />
            <div>
              <h2 className="text-2xl font-bold">John Doe</h2>
              <p className="text-gray-600">john.doe@example.com</p>
            </div>
          </div>
          <hr className="my-6 border-gray-200" />
          <div className="space-y-4">
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
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        </div>
        </div>
    )
}

export default editprofile;