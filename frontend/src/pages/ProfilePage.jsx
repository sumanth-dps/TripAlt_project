import React, { useState } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@gmail.com",
    phone: "+91 98765 43210",
  });

  const [name, setName] = useState(user.name);

  const handleSave = () => {
   
    setUser((prev) => ({ ...prev, name }));

    alert("✅ Profile updated successfully!");
  };

  return (
    <div className="flex justify-center mt-14 px-4 py-10 ">
      <div className="w-full xl:w-3/4 2xl:w-2/3 max-w-2xl bg-orange-50 shadow-xl rounded-2xl p-8 border border-gray-200">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-[#003566] text-center mb-6">
          My Profile
        </h1>

        {/* User Avatar */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex justify-center items-center shadow-md">
            <span className="text-4xl font-bold text-blue-700">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>

        {/* FORM */}
        <div className="space-y-5 text-gray-700">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 text-sm outline-none
                         focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full border rounded-lg px-4 py-2 text-sm bg-gray-100 cursor-not-allowed 
                         text-gray-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="text"
              value={user.phone}
              disabled
              className="w-full border rounded-lg px-4 py-2 text-sm bg-gray-100 cursor-not-allowed 
                         text-gray-500"
            />
          </div>


          {/* Save Button */}
          <div className="pt-3">
            <button
              onClick={handleSave}
              className="w-full bg-[#003566] text-white py-3 rounded-lg font-semibold 
                         hover:bg-blue-700 transition shadow-md text-sm"
            >
              Save Changes
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
