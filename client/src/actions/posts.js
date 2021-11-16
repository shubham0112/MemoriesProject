import {FETCH_POST,FETCH_ALL,FETCH_BY_SEARCH,CREATE,UPDATE,DELETE,LIKE,START_LOADING,END_LOADING} from '../constants/actionTypes';
import * as api from '../api';

// Action Creators (i.e function which returns an action)

// firstly we make api reuests i.e make changes in the database and then return it
// then we dispatch the respective action to change the state (by calling the reducers) => this is for frontend

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({type:START_LOADING});
        const {data} = await api.fetchPost(id);
        
        // dispatch the action
        dispatch({type:FETCH_POST,payload:data}); //it will go to posts reducer (FETCH_POST is action)
        dispatch({type:END_LOADING});
    } catch (error) {
        console.log(error);
    }
}

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({type:START_LOADING});
        const {data} = await api.fetchPosts(page);
        
        // dispatch the action
        dispatch({type:FETCH_ALL,payload:data}); //it will go to posts reducer (FETCH_ALL is action)
        dispatch({type:END_LOADING});
    } catch (error) {
        console.log(error);
    }
}

export const getPostBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({type:START_LOADING});
        
        const {data:{data} } = await api.fetchPostBySearch(searchQuery);

        dispatch({type:FETCH_BY_SEARCH,payload:data});
        dispatch({type:END_LOADING});
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post, history) => async (dispatch) => {
    try {
        dispatch({type:START_LOADING});
        const {data} = await api.createPost(post);

        history.push(`/posts/${data._id}`);

        dispatch({type:CREATE,payload:data});
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
       const {data} = await api.updatePost(id,post);

       dispatch({type:UPDATE,payload:data});
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({type:DELETE, payload:id});
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const {data} = await api.likePost(id);
        dispatch({type:LIKE, payload:data});
    } catch (error) {
        console.log(error);
    }
}