import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    uploadMessage: null,
};

const imageSlice = createSlice({
    name: "image",
    initialState,
    reducers: {
        imageUploadSuccess: (state) => {
            state.uploadMessage = "Images uploaded successfully!";
        },
        imageUploadFail: (state, action) => {
            state.uploadMessage = action.payload;
        },
        clearUploadMessage: (state) => {
            state.uploadMessage = null;
        },
    },
});

export const { imageUploadSuccess, imageUploadFail, clearUploadMessage } = imageSlice.actions;
export default imageSlice.reducer;
