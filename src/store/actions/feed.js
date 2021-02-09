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
			post.id = docRef.id;
			dispatch(addPostSuccess(post));
		}catch(error){
			console.log(error);
			dispatch(addPostFail(error));
		}
	}
};

const addPostStart = () =>{
	return {
		type: actionTypes.ADD_POST_START
	};
};

const addPostSuccess = (post) =>{
	return {
		type: actionTypes.ADD_POST_SUCCESS,
		post,
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

export const updatePost = (id, post) => {
	return async dispatch => {
		try{
			const batch = db.batch();
			const postRef = db.collection("posts").doc(id);
			batch.update(postRef, post);
			await batch.commit();
			dispatch(updatePostSuccess(id, post))
		}catch(error){
			console.log(error);
			dispatch(updatePostFail(error));
		}
	}
};

const updatePostSuccess  = (id, post) => {
	return {
		type: actionTypes.UPDATE_POST_SUCCESS,
		id, 
		post
	};
};

const updatePostFail = (error) => {
	return {
		type: actionTypes.UPDATE_POST_FAIL,
		error
	};
};

export const expandPost = id => {
	return {
		type: actionTypes.EXPAND_POST,
		id
	};
};
