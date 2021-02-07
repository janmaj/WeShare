import axios from 'axios';
import * as actionTypes from './actionTypes';

const API_KEY = 'AIzaSyB3b_Y9pmVLPn2KyiAxQ7NitJ2obeYRSm0';
const MILLISECONDS_IN_SECOND = 1000;

export const registerUser = (email, password, username) => {
	return async dispatch => {
		dispatch(registerStart());
		try{
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
			const {data} = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, authData);
			const {idToken, expiresIn, refreshToken, localId} = data;
			localStorage.setItem("idToken", idToken);
			localStorage.setItem("refreshToken", refreshToken);
			localStorage.setItem("expirationDate", (new Date().getTime() + parseInt(expiresIn)*MILLISECONDS_IN_SECOND));
			localStorage.setItem("email", email);
			localStorage.setItem("localId", localId);
			await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`, {idToken});
			dispatch(loginSuccess(data));
		}catch(error){
			error.message = error.response.data.error.message;
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

export const autoLogin = () => {
	return dispatch => {
		const idToken = localStorage.getItem("idToken");
		if(!idToken){
			return dispatch(logout());
		}
		const refreshToken = localStorage.getItem("refreshToken");
		const expirationDate = new Date(parseInt(localStorage.getItem("expirationDate")));
		const email = localStorage.getItem("email");
		const localId = localStorage.getItem("localId");
		const currentTime = new Date();
		if(currentTime.getTime() < expirationDate.getTime()){
			const expiresIn = (expirationDate.getTime() - currentTime.getTime()) / MILLISECONDS_IN_SECOND;
			const data = {refreshToken, idToken, expiresIn, email, localId};
			dispatch(loginSuccess(data));
			return dispatch(setupTokenRefresh(expiresIn));
		}
		return dispatch(logout());
	};
};

const setupTokenRefresh = (timeout) => {
	return async dispatch => {
		setTimeout(async () => {
			const refreshToken = localStorage.getItem("refreshToken");
			if(!refreshToken){
				return dispatch(logout());
			}
			const {data} = await axios.post(`https://securetoken.googleapis.com/v1/token?key=${API_KEY}`, {'grant_type': 'refresh_token', 'refresh_token': refreshToken});
			const expiresIn = data['expires_in'];
			const idToken = data['id_token'];
			const newRefreshToken = data['refresh_token'];
			dispatch(authRefresh(idToken, newRefreshToken, expiresIn));
			dispatch(logout());
		}, timeout*MILLISECONDS_IN_SECOND)
	};
};

const authRefresh = (idToken, refreshToken, expiresIn) => {
	return {
		type: actionTypes.AUTH_REFRESH,
		idToken, 
		refreshToken,
		expiresIn
	};
};