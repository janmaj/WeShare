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

