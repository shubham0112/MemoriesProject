import axios from 'axios';

const API = axios.create({baseURL:'http://localhost:3000'});
// const url = 'http://localhost:3000/posts';


// adding token to 'req' before making call to backend
// it is going to be executed before each one of our requests
// will help the auth middleware in the backend who is validating the token
API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const fetchPost = (id) => API.get(`/posts/${id}`);

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);

export const fetchPostBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);

export const createPost = (newPost) => API.post('/posts',newPost);

export const updatePost = (id,updatedPost) => API.patch(`/posts/${id}`,updatedPost)

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const comment = (value,id) => API.post(`/posts/${id}/commentPost`,{value});

export const signIn = (formData) => API.post('/user/signin',formData);
export const signUp = (formData) => API.post('/user/signup',formData);