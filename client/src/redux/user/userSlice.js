import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInStart: (state) => {  //doing smae things as din in signup  file just in redux state is global so that we can use users information anywhere in our application
            state.loading = true;
            //state.error = null;
        },
        signInSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.error = null;
        },
        signInFail: (state, action) => {
            state.error = action.payload;
            state.loading = false;    
        }, 
        updateAvatar: (state, action) => {
            if (state.currentUser) {
              state.currentUser.avatar = action.payload; // Update avatar URL
            }
          },
          updateUserStart: (state) => {
            state.loading = true;
          },
          updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
          },
          updateUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
          },
          
    },
});

export const { signInStart, signInSuccess, signInFail, updateAvatar, updateUserFailure,updateUserStart,updateUserSuccess } = userSlice.actions;

export default userSlice.reducer;