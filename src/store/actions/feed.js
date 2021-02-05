import firebase from 'firebase';
import 'firebase/firestore';

import * as actionTypes from './actionTypes';

firebase.initializeApp({
	apiKey: "AIzaSyB3b_Y9pmVLPn2KyiAxQ7NitJ2obeYRSm0",
	authDomain: "weshare-8c49d.firebaseapp.com",
	projectId: "weshare-8c49d"
});

const db = firebase.firestore();

export const addPost = post => {
	return async dispatch => {
		try{
			dispatch(addPostStart());
			const docRef = await db.collection('posts').add(post);
			dispatch(addPostSuccess(post, docRef));
		}catch(error){
			dispatch(addPostFail(error));
		}
	}
};

const addPostStart = () =>{
	return {
		type: actionTypes.ADD_POST_START
	};
};

const addPostSuccess = (post, docRef) =>{
	return {
		type: actionTypes.ADD_POST_SUCCESS,
		post,
		docRef
	};
};

const addPostFail = (error) =>{
	return {
		type: actionTypes.ADD_POST_FAIL,
		error
	};
};

export const resetClearInput = () => {
	return {
		type: actionTypes.RESET_CLEAR_INPUT
	};
};

export const fetchPosts = () => {
	return async dispatch => {
		dispatch(fetchPostsStart());
		try{
			const querySnapshot = await db.collection("posts").get();
			const posts = querySnapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data()
			}));
			dispatch(fetchPostsSuccess(posts));
		}catch(error){
			dispatch(fetchPostsFail(error));
		}
	};
};

const fetchPostsStart = () => {
	return {
		type: actionTypes.FETCH_POSTS_START
	};
};

const fetchPostsSuccess = posts => {
	return {
		type: actionTypes.FETCH_POSTS_SUCCESS,
		posts
	};
};

const fetchPostsFail = error => {
	console.log(error);
	return {
		type: actionTypes.FETCH_POSTS_FAIL,
		error
	};
};
