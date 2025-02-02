import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    regularPrice:{
        type: Number,
        required: true,
    },
    discountPrice:{
        type: Number,
        required: true,
    },
    bathrooms:{
        type: Number,
        required: true,
    },
    bedrooms:{
        type: Number,
        required: true,
    },
    furnished:{
        type: Boolean,
        required: true,
    },
    type:{          //rent or sale
        type: String,
        required: true,
    },
    offer:{
        type: Boolean,
        required: true,
    },
    imageUrls:{
        type: Array,
        required: true,
    },
    userRef:{
        type: String,
        required: true,
    },



}, { timestamps: true });  //so that we can know when the listing was created and updated in mongodb and we can use this in the frontend to show the user when the listing was created and updated

const Listing = mongoose.model("Listing", listingSchema);

export default Listing; //we can now use Listing model anywhere in our project 