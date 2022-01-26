import {createAsyncThunk, createSlice, createAction} from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from '../../../utils/baseURL';


//Action to Navigate

const resetPost = createAction("category/reset");
const resetPostEdit = createAction("post/reset");
const resetPostDelete = createAction("post/delete");




//create

export const createPostAction = createAsyncThunk('post/created', async (post,{ rejectWithValue, getState, dispatch})=>{
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
        formData.append('category', post?.category?.label)
        formData.append('title', post?.title)
        formData.append('description', post?.description)
        formData.append('image', post?.image)

        const {data} = await axios.post(`${baseUrl}/api/posts`, formData, config);
        //dispatch Action
        dispatch(resetPost());
        return data;
    } catch (error) {
        if(!error?.response){
            throw error;
        }
        return rejectWithValue(error?.response?.data)
    }
})



//update

export const updatePostAction = createAsyncThunk('post/updated', async (post,{ rejectWithValue, getState, dispatch})=>{
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
      const {data} = await axios.put(`${baseUrl}/api/posts/${post?.id}`,post,config);
      //dispatch action to update 
      dispatch(resetPostEdit());
      return data;
  } catch (error) {
      if(!error?.response){
          throw error;
      }
      return rejectWithValue(error?.response?.data)
  }
})



//delete

export const deletePostAction = createAsyncThunk('post/deleted', async (postId,{ rejectWithValue, getState, dispatch})=>{
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
      const {data} = await axios.delete(`${baseUrl}/api/posts/${postId}`,config);
      //dispatch action to update 
      dispatch(resetPostDelete());
      return data;
  } catch (error) {
      if(!error?.response){
          throw error;
      }
      return rejectWithValue(error?.response?.data)
  }
})




//fetch all posts
export const fetchPostsAction = createAsyncThunk('post/list', async (category,{ rejectWithValue, getState, dispatch})=>{

    //http call
  try {
      const {data} = await axios.get(`${baseUrl}/api/posts?category=${category}`);
      return data;
  } catch (error) {
      if(!error?.response){
          throw error;
      }
      return rejectWithValue(error?.response?.data)
  }
})


// Add Like to the post

export const toggleAddLikesToPost = createAsyncThunk('post/like', async (postId, { rejectWithValue, getState, dispatch})=>{
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
        headers: {
            Authorization: `Bearer ${userAuth.token}`,
        }
    } 
    try {
        const {data} = await axios.put(`${baseUrl}/api/posts/likes`, {postId}, config);
        return data;
    } catch (error) {
        if(!error?.response) throw error;
        return rejectWithValue(error?.response?.data) 
    }
    
})


// Add disLike to the post

export const toggleAddDisLikesToPost = createAsyncThunk('post/dislike', async (postId, { rejectWithValue, getState, dispatch})=>{
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
        headers: {
            Authorization: `Bearer ${userAuth.token}`,
        }
    } 
    try {
        const {data} = await axios.put(`${baseUrl}/api/posts/dislikes`, {postId}, config);
        return data;
    } catch (error) {
        if(!error?.response) throw error;
        return rejectWithValue(error?.response?.data) 
    }
    
})


//fetch post details
export const fetchPostDetailsAction = createAsyncThunk('post/details', async (id,{ rejectWithValue, getState, dispatch})=>{

    //http call
  try {
      const {data} = await axios.get(`${baseUrl}/api/posts/${id}`);
      return data;
  } catch (error) {
      if(!error?.response){
          throw error;
      }
      return rejectWithValue(error?.response?.data)
  }
})






//slices----------------------------------------------------

const postSlice = createSlice({name:'post', initialState: {}, extraReducers: (builder) =>{
    //create post
    builder.addCase(createPostAction.pending, (state, action) =>{
        state.loading = true;
    });

        //Dispatch Action to Navigate
    builder.addCase(resetPost, (state, action) =>{
        state.isCreated = true;
    });     

    builder.addCase(createPostAction.fulfilled, (state, action) =>{
        state.postCreated = action?.payload;
        state.isCreated = false;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
    });

    builder.addCase(createPostAction.rejected, (state, action) =>{
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
    });



    //update post
    builder.addCase(updatePostAction.pending, (state, action) =>{
        state.loading = true;
    });   
    
        //Dispatch Action to Navigate after updating post
    builder.addCase(resetPostEdit, (state, action) =>{
        state.isupdated = true;
    });

    builder.addCase(updatePostAction.fulfilled, (state, action) =>{
        state.postUpdated = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
        state.isupdated = false;
    });

    builder.addCase(updatePostAction.rejected, (state, action) =>{
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
    });

    //delete post
    builder.addCase(deletePostAction.pending, (state, action) =>{
        state.loading = true;

    });   

     //Dispatch Action to Navigate after deleting post
     builder.addCase(resetPostDelete, (state, action) =>{
        state.isDeleted = true;
    });

    builder.addCase(deletePostAction.fulfilled, (state, action) =>{
        state.postDeleted = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
        state.isDeleted = false;
    });

    builder.addCase(deletePostAction.rejected, (state, action) =>{
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
    });



    //fetch all posts
    builder.addCase(fetchPostsAction.pending, (state, action) =>{
        state.loading = true;
    });     

    builder.addCase(fetchPostsAction.fulfilled, (state, action) =>{
        state.postLists = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
    });

    builder.addCase(fetchPostsAction.rejected, (state, action) =>{
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
    });


    //Likes
    builder.addCase(toggleAddLikesToPost.pending, (state, action) =>{
        state.loading = true;
    });     

    builder.addCase(toggleAddLikesToPost.fulfilled, (state, action) =>{
        state.likes = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
    });

    builder.addCase(toggleAddLikesToPost.rejected, (state, action) =>{
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
    });

    //Dislikes
    builder.addCase(toggleAddDisLikesToPost.pending, (state, action) =>{
        state.loading = true;
    });     

    builder.addCase(toggleAddDisLikesToPost.fulfilled, (state, action) =>{
        state.disLikes = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
    });

    builder.addCase(toggleAddDisLikesToPost.rejected, (state, action) =>{
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
    });    

    //fetch post details
    builder.addCase(fetchPostDetailsAction.pending, (state, action) =>{
        state.loading = true;
    });     

    builder.addCase(fetchPostDetailsAction.fulfilled, (state, action) =>{
        state.postDetails = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
    });

    builder.addCase(fetchPostDetailsAction.rejected, (state, action) =>{
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
    });



   }
});


export default postSlice.reducer;