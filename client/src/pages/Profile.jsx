import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateAvatar, updateUserStart, updateUserFailure, updateUserSuccess } from '../redux/user/userSlice';

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    username: currentUser.username || '',
    email: currentUser.email || '',
    password: '',
    avatar: currentUser.avatar || '',
  });

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validImageTypes.includes(file.type)) {
      setSuccessMessage('Invalid file type. Please select a valid image.');
      return;
    }

    setLoading(true);
    setSuccessMessage('');

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'mern-estate');
    data.append('cloud_name', 'dvjdgmqa2');

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dvjdgmqa2/image/upload', {
        method: 'POST',
        body: data,
      });

      const uploadedImage = await res.json();

      setFormData((prevFormData) => ({
        ...prevFormData,
        avatar: uploadedImage.url,
      }));

      dispatch(updateAvatar(uploadedImage.url));
      setSuccessMessage('Image uploaded successfully!');
    } catch (error) {
      setSuccessMessage('Image upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {  // the _id here is the _id used in mongoose database
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        setSuccessMessage('Update failed. Please try again.');
        return;
      }

      dispatch(updateUserSuccess(data));
      setSuccessMessage('Profile updated successfully!');
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      setSuccessMessage('Update failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Avatar */}
        <div className="self-center relative">
          <input
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
            onChange={handleFileUpload}
          />
          <div
            className="w-24 h-24 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 p-1 flex items-center justify-center relative"
            onClick={() => fileRef.current.click()}
          >
            <img
              src={formData.avatar || '/default-avatar.png'}
              alt="profile"
              className="w-full h-full rounded-full object-cover"
            />
            <button
              type="button"
              className="absolute bottom-[-10px] right-[-10px] bg-blue-500 text-white text-xs px-3 py-1 rounded-full shadow-md hover:bg-blue-600"
              onClick={() => fileRef.current.click()}
            >
              Edit
            </button>
          </div>
        </div>

        {/* Input Fields */}
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />

        {/* Update Profile Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 shadow-md"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>

      {/* Display success or error message */}
      {successMessage && (
        <div
          className={`mt-4 p-4 rounded-lg shadow-lg ${
            successMessage.includes('successfully')
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          } flex items-center gap-3 transition-all duration-300`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={
                successMessage.includes('successfully')
                  ? 'M5 13l4 4L19 7'
                  : 'M6 18L18 6M6 6l12 12'
              }
            />
          </svg>
          <span className="font-medium">{successMessage}</span>
        </div>
      )}

      <div className="flex justify-between mt-5">
        <span className="text-red-500 cursor-pointer">Delete account</span>
        <span className="text-red-500 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}








