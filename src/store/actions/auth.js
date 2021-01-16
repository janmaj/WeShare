import axios from 'axios';
import * as actionTypes from './actionTypes';

const API_KEY = 'AIzaSyB3b_Y9pmVLPn2KyiAxQ7NitJ2obeYRSm0';

export const registerUser = (email, password, username) => {
	return async dispatch => {
		dispatch(registerStart());
		try{
			console.log({username});
			const authData = {
        email,
        password,
        returnSecureToken: true,
      };
			let response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, authData);
			authData.idToken = response.data.idToken;
			authData.displayName = username;
			await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`, authData);
			dispatch(resgisterSuccess(response.data));
		}catch(error){
			console.log(error)
			dispatch(registerFail(error));
		}
	}
}

const registerStart = () => {
	return {
		type: actionTypes.REGISTER_START
	};
};

const resgisterSuccess = data => {
	return {
		type: actionTypes.REGISTER_SUCCESS,
		...data
	};
};

const registerFail = error => {
	return {
		type: actionTypes.REGISTER_FAIL,
		error
	};
};

export const loginUser = (email, password) => {
	return async dispatch => {
		dispatch(loginStart());
		try{
			const authData = {
        email,
        password,
        returnSecureToken: true,
      };
			const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, authData);
			const idToken = response.data.idToken;
			const data = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`, {idToken});
			console.log(data.data);
			//response.data.displayName = displayName;
			dispatch(loginSuccess(response.data));
		}catch(error){
			console.log(error.response.data.error.message)
			error.message = error.response.data.error.message
			dispatch(loginFail(error));
		}
	}
}

const loginStart = () => {
	return {
		type: actionTypes.LOGIN_START
	};
};

const loginSuccess = data => {
	return {
		type: actionTypes.LOGIN_SUCCESS,
		...data
	};
};

const loginFail = error => {
	return {
		type: actionTypes.LOGIN_FAIL,
		error
	};
};

export const logout = () => {
	return {
		type: actionTypes.LOGOUT
	};
};

export const clearError = () => {
	return{
		type: actionTypes.CLEAR_ERROR
	};
};