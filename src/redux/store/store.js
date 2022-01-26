import {configureStore} from '@reduxjs/toolkit';
import usersReducer from "../slices/users/usersSlices";
import categoriesReducer from "../slices/category/categorySlice";
import post from '../slices/posts/postSlices';
import comments from '../slices/comments/commentSlices'


const store = configureStore({
    reducer:{
        users:usersReducer,
        category:categoriesReducer,
        post,
        comments,
    },
});


export default store;