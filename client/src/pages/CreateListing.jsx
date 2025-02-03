import React from 'react';

export default function CreateListing() {
  return (
    <main className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-center text-indigo-700 my-7">
        Create a Listing
      </h1>

      <form className="flex flex-col sm:flex-row gap-6">
        {/* Left Side */}
        <div className="flex flex-col gap-5 flex-1 bg-gray-50 p-5 rounded-lg shadow-md">
          <input
            type="text"
            placeholder="Name"
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
            id="name"
            maxLength="65"
            minLength="4"
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
            id="description"
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
            id="address"
            required
          />

          {/* Checkboxes */}
          <div className="flex flex-wrap gap-4">
            {[
              { id: 'sale', label: 'Sell' },
              { id: 'rent', label: 'Rent' },
              { id: 'parking', label: 'Parking Spot' },
              { id: 'furnished', label: 'Furnished' },
              { id: 'offer', label: 'Offer' },
            ].map(({ id, label }) => (
              <div key={id} className="flex items-center gap-2">
                <input type="checkbox" id={id} className="w-5 h-5 accent-indigo-600" />
                <span className="text-gray-700">{label}</span>
              </div>
            ))}
          </div>

          {/* Number Inputs */}
          <div className="flex flex-wrap gap-6">
            {[
              { id: 'bedrooms', label: 'Beds' },
              { id: 'bathrooms', label: 'Bathrooms' },
              { id: 'regularPrice', label: 'Regular Price', extra: '(₹ / month)' },
              { id: 'discountPrice', label: 'Discounted Price', extra: '(₹ / month)' },
            ].map(({ id, label, extra }) => (
              <div key={id} className="flex items-center gap-3">
                <input
                  type="number"
                  id={id}
                  min="1"
                  required
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 w-24 text-center"
                />
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
            Images:
            <span className="font-normal text-gray-600 ml-2">The first image will be the cover (max 6)</span>
          </p>

          <div className="flex gap-4">
            <input
              className="p-3 border border-gray-300 rounded w-full focus:ring-2 focus:ring-indigo-500"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button className="p-3 text-green-700 border border-green-700 rounded-lg uppercase hover:bg-green-700 hover:text-white transition">
              Upload
            </button>
          </div>

          <button className="p-3 bg-indigo-700 text-white uppercase rounded-lg hover:bg-indigo-800 transition shadow-md">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}

