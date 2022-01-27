import {createAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from '../../../utils/baseURL';



// Action to Navigate

const resetUserAction = createAction("user/profile/reset");


// const resetProfilePhotoAction = createAction("user/profilephoto/reset"); 




//register actions
export const registerUserAction = createAsyncThunk('users/register', async (user, {rejectWithValue, getState, dispatch})=>{
    try {
        //http call
        const config = {
            headers:{
                'Content-Type': 'application/json',
            }
        };
        const { data } = await axios.post(`${baseUrl}/api/users/register`, user, config );
        return data
    } catch (error) {
        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data)
    }
})



//Login
export const loginUserAction = createAsyncThunk('users/login', async (userData, {rejectWithValue, getState, dispatch})=>{
    const config = {
        headers:{
            'Content-Type': 'application/json',  
        }
    };
    try {
        //make http
        const { data } = await axios.post(`${baseUrl}/api/users/login`, userData, config );
        //save user in local storage
        localStorage.setItem('userInfo', JSON.stringify(data));
        return data
    } catch (error) {
        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data)
        
    }
})


//Profile
export const userProfileAction = createAsyncThunk('user/profile', async (id,{ rejectWithValue, getState, dispatch}) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
        headers: {
            Authorization: `Bearer ${userAuth.token}`,
        }
    }
    //http call
    try {
        const {data} = await axios.get(`${baseUrl}/api/users/profile/${id}`,
        config
         );
        return data;
    } catch (error) {
        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data)
    }
})


//update profile 
export const updateUserAction = createAsyncThunk('user/update', async (userData,{ rejectWithValue, getState, dispatch})=>{
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
        headers: {
            Authorization: `Bearer ${userAuth.token}`,
        }
    }
    //http call
  try {

      const {data} = await axios.put(`${baseUrl}/api/users/${userData?._id}`, {
          lastName:userData?.lastName,
          firstName:userData?.firstName,
          bio:userData?.bio,
          email:userData?.email,
      }, config);
        //dispatch action to reset updated data
        dispatch(resetUserAction());
      return data;
  } catch (error) {
      if(!error?.response){
          throw error;
      }
      return rejectWithValue(error?.response?.data)
  }
})



//fetch User details
export const fetchUserDetailsAction = createAsyncThunk(
    "user/detail",
    async (id, { rejectWithValue, getState, dispatch }) => {
      try {
        const { data } = await axios.get(`${baseUrl}/api/users/${id}`);
        return data;
      } catch (error) {
        if (!error?.response) throw error;
        return rejectWithValue(error?.response?.data);
      }
    }
  );




//Logout
export const logoutAction = createAsyncThunk('users/logout', async (payload, {rejectWithValue, getState, dispatch})=>{
    try {
        //remove user from local storage
        localStorage.removeItem('userInfo');
    } catch (error) {
        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data)
        
    }
})




//upload profile photo
export const uploadProfilePhotoAction = createAsyncThunk('user/profile-photo', async (userImg,{ rejectWithValue, getState, dispatch})=>{
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
        headers: {
            Authorization: `Bearer ${userAuth.token}`,
        }
    }
    //http call
  try {
      const formData = new FormData();
      formData.append('image', userImg?.image)
      const {data} = await axios.put(`${baseUrl}/api/users/profilephoto-upload`, formData, config);
      
      //dispatch action to reset profile photo updated 
      
      return data;
  } catch (error) {
      if(!error?.response){
          throw error;
      }
      return rejectWithValue(error?.response?.data)
  }
})



//get user from local storage and place into store
const userLoginFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;


//slices

const usersSlices = createSlice({
    name: 'users',
    initialState:{
        userAuth: userLoginFromStorage,
    },
    extraReducers:(builder) => {
        //register
        builder.addCase(registerUserAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;  
        });
        builder.addCase(registerUserAction.fulfilled, (state, action) => {
          state.loading = false;
          state.registered = action?.payload;
          state.appErr = undefined;
          state.serverErr = undefined; 
        });
        builder.addCase(registerUserAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

         //login
         builder.addCase(loginUserAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;  
        });
        builder.addCase(loginUserAction.fulfilled, (state, action) => {
          state.userAuth = action?.payload;
          state.loading = false;
          state.appErr = undefined;
          state.serverErr = undefined; 
        });
        builder.addCase(loginUserAction.rejected, (state, action) => {
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
            state.loading = false;
        });
        

         //profile
         builder.addCase(userProfileAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;  
        });
        builder.addCase(userProfileAction.fulfilled, (state, action) => {
          state.profile = action?.payload;
          state.loading = false;
          state.appErr = undefined;
          state.serverErr = undefined; 
        });
        builder.addCase(userProfileAction.rejected, (state, action) => {
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
            state.loading = false;
        });

         //update profile
         builder.addCase(updateUserAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;  
        });

            //Dispatch Action
        builder.addCase(resetUserAction, (state, action) =>{
        state.isUpdated = true;
        });   

        builder.addCase(updateUserAction.fulfilled, (state, action) => {
          state.loading = false;
          state.userUpdated = action?.payload;
          state.isUpdated = false;
          state.appErr = undefined;
          state.serverErr = undefined; 
        });
        builder.addCase(updateUserAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

        //user details
        builder.addCase(fetchUserDetailsAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(fetchUserDetailsAction.fulfilled, (state, action) => {
            state.loading = false;
            state.userDetails = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(fetchUserDetailsAction.rejected, (state, action) => {
            console.log(action.payload);
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });


        //logout
        builder.addCase(logoutAction.pending, (state, action) => {
            state.loading = true;  
        });
        builder.addCase(logoutAction.fulfilled, (state, action) => {
          state.userAuth = undefined;
          state.loading = false;
          state.appErr = undefined;
          state.serverErr = undefined; 
        });
        builder.addCase(logoutAction.rejected, (state, action) => {
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
            state.loading = false;
        });


         //upload profile photo
    builder.addCase(uploadProfilePhotoAction.pending, (state, action) =>{
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
    });

    // //Dispatch Action 
    // builder.addCase(resetProfilePhotoAction, (state, action) =>{
    //     state.isProfilePhotoUpdated= true;
    //     }); 


    builder.addCase(uploadProfilePhotoAction.fulfilled, (state, action) =>{
        state.profilePhoto = action?.payload;
        // state.isProfilePhotoUpdated= false;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
    });

    builder.addCase(uploadProfilePhotoAction.rejected, (state, action) =>{
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
    });




    },
})


export default usersSlices.reducer;