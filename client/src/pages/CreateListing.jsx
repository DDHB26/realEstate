import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { imageUploadSuccess, imageUploadFail, clearUploadMessage } from "../redux/imageSlice";

export default function CreateListing() {
  const [files, setFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const dispatch = useDispatch();
  const uploadMessage = useSelector((state) => state.image.uploadMessage);

  useEffect(() => {
    dispatch(clearUploadMessage());
  }, [dispatch]);

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    dispatch(clearUploadMessage());

    if (files.length + selectedFiles.length > 6) {
      return dispatch(imageUploadFail("You can only upload up to 6 images."));
    }

    const validFiles = selectedFiles.filter(file => file.size <= 2 * 1024 * 1024);
    if (validFiles.length !== selectedFiles.length) {
      dispatch(imageUploadFail("Some files exceed 2MB limit."));
    }

    setFiles([...files, ...validFiles]);
  };

  const handleDeleteImage = (index) => {
    setFiles(files.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const handleImageSubmit = async () => {
    if (files.length === 0) {
      return dispatch(imageUploadFail("Please select images to upload."));
    }

    setIsUploading(true);
    try {
      const uploadedImages = [];
      const previews = [];

      for (const file of files) {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "mern-estate");
        data.append("cloud_name", "dvjdgmqa2");

        const res = await fetch("https://api.cloudinary.com/v1_1/dvjdgmqa2/image/upload", {
          method: "POST",
          body: data,
        });

        const uploadedImage = await res.json();
        uploadedImages.push(uploadedImage.url);
        previews.push(URL.createObjectURL(file)); // Preview after upload
      }

      setImagePreviews(previews);
      dispatch(imageUploadSuccess(uploadedImages));
    } catch (error) {
      dispatch(imageUploadFail("Image upload failed. Please try again."));
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-center text-indigo-700 my-7">Create a Listing</h1>

      <form className="flex flex-col sm:flex-row gap-6">
        {/* Left Side */}
        <div className="flex flex-col gap-5 flex-1 bg-gray-50 p-5 rounded-lg shadow-md">
          <input type="text" placeholder="Name" className="input-field" id="name" maxLength="65" minLength="4" required />
          <textarea placeholder="Description" className="input-field" id="description" required />
          <input type="text" placeholder="Address" className="input-field" id="address" required />

          {/* Checkboxes */}
          <div className="flex flex-wrap gap-4">
            {["Sell", "Rent", "Parking Spot", "Furnished", "Offer"].map((label, index) => (
              <label key={index} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 accent-indigo-600" />
                <span className="text-gray-700">{label}</span>
              </label>
            ))}
          </div>

          {/* Number Inputs */}
          <div className="flex flex-wrap gap-6">
            {[
              { id: "bedrooms", label: "Beds" },
              { id: "bathrooms", label: "Bathrooms" },
              { id: "regularPrice", label: "Regular Price", extra: "(₹ / month)" },
              { id: "discountPrice", label: "Discounted Price", extra: "(₹ / month)" },
            ].map(({ id, label, extra }) => (
              <div key={id} className="flex items-center gap-3">
                <input type="number" id={id} min="1" required className="input-field w-24 text-center" />
                <div className="flex flex-col items-center">
                  <p className="text-gray-700">{label}</p>
                  {extra && <span className="text-xs text-gray-500">{extra}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col flex-1 gap-5 bg-gray-50 p-5 rounded-lg shadow-md">
          <p className="font-semibold text-gray-800">
            Images: <span className="font-normal text-gray-600 ml-2">Max 6 images</span>
          </p>

          {/* Image Upload Section */}
          <div className="flex gap-4">
            <input onChange={handleImageChange} className="input-field" type="file" accept="image/*" multiple />
            <button onClick={handleImageSubmit} type="button" className={`upload-btn ${isUploading ? "disabled" : ""}`} disabled={isUploading}>
              {isUploading ? "Uploading..." : "Upload"}
            </button>
          </div>

          {/* Image Preview */}
          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mt-4">
              {imagePreviews.map((src, index) => (
                <div key={index} className="relative">
                  <img src={src} alt={`preview-${index}`} className="h-24 w-24 object-cover rounded-lg shadow-md" />
                  <button onClick={() => handleDeleteImage(index)} className="delete-btn">X</button>
                </div>
              ))}
            </div>
          )}

          {/* Success/Error Message */}
          {uploadMessage && !isUploading && <p className="text-center text-sm font-semibold text-red-600 mt-2">{uploadMessage}</p>}

          <button className="create-btn">Create Listing</button>
        </div>
      </form>

      {/* Tailwind Custom Styles */}
      <style>
        {`
          .input-field {
            padding: 12px;
            border: 1px solid #ccc;
            border-radius: 8px;
            width: 100%;
            transition: all 0.3s;
          }
          .input-field:focus {
            outline: none;
            border-color: #6366f1;
            box-shadow: 0 0 5px rgba(99, 102, 241, 0.5);
          }
          .upload-btn {
            padding: 12px;
            background: #22c55e;
            color: white;
            border-radius: 8px;
            transition: background 0.3s;
          }
          .upload-btn:hover {
            background: #16a34a;
          }
          .upload-btn.disabled {
            background: #9ca3af;
            cursor: not-allowed;
          }
          .delete-btn {
            position: absolute;
            top: -5px;
            right: -5px;
            background: red;
            color: white;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            text-align: center;
            font-size: 12px;
          }
          .create-btn {
            padding: 12px;
            background: #4f46e5;
            color: white;
            border-radius: 8px;
            transition: background 0.3s;
          }
          .create-btn:hover {
            background: #4338ca;
          }
        `}
      </style>
    </main>
  );
}

