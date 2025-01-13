import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateAvatar } from '../redux/user/userSlice';

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); // For success or error messages
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validImageTypes.includes(file.type)) {
      setSuccessMessage('Invalid file type. Please upload an image.');
      return;
    }

    setLoading(true);
    setSuccessMessage(''); // Clear existing messages

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
      dispatch(updateAvatar(uploadedImage.url)); // Update avatar in Redux store
      setSuccessMessage('Image uploaded successfully!');
    } catch (error) {
      console.error('Image upload failed', error);
      setSuccessMessage('Image upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={handleFileUpload}
        />
        <img
          onClick={() => fileRef.current.click()}
          src={currentUser?.avatar || '/default-avatar.png'}
          alt="profile"
          className="w-24 h-24 rounded-full object-cover self-center cursor-pointer mt-2"
        />
        <input type="text" placeholder="username" className="border p-3 rounded-lg" />
        <input type="text" placeholder="email" className="border p-3 rounded-lg" />
        <input type="text" placeholder="password" className="border p-3 rounded-lg" />
        <button
          className="bg-blue-500 text-white p-3 rounded-lg uppercase hover:opacity-85 disabled:opacity-70"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update'}
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



