import {FETCH_ALL,FETCH_BY_SEARCH,CREATE,UPDATE,DELETE,LIKE} from '../constants/actionTypes';
import * as api from '../api';

// Action Creators (i.e function which returns an action)

// firstly we make api reuests i.e make changes in the database and then return it
// then we dispatch the respective action to change the state (by calling the reducers) => this is for frontend
export const getPosts = () => async (dispatch) => {
    try {
        const {data} = await api.fetchPosts();

        // dispatch the action
        dispatch({type:FETCH_ALL,payload:data}); //it will go to posts reducer (FETCH_ALL is action)
    } catch (error) {
        console.log(error);
    }
}

export const getPostBySearch = (searchQuery) => async (dispatch) => {
    try {
        const {data:{data} } = await api.fetchPostBySearch(searchQuery);

        dispatch({type:FETCH_BY_SEARCH,payload:data});
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const {data} = await api.createPost(post);

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