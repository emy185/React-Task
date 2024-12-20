import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
const BASE_URL = "https://jsonplaceholder.typicode.com/posts";
// fetch all posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
});

// add new posts
export const addPost = createAsyncThunk("posts/addPost", async (postData) => {
    const response = await axios.post(BASE_URL, postData);
    return response.data;
});

// update post 
export const updatePost = createAsyncThunk("posts/updatePost", async ({id, updatedData}) => {
    const response = await axios.patch(`${BASE_URL}/${id}`, updatedData);
    return response.data;
});

// delete post 
export const deletePost = createAsyncThunk("posts/deletePost", async (postId) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  return { id: postId };
});