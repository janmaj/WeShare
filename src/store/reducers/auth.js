import * as actionTypes from '../actions/actionTypes';

const defaultState = {
	isAuth: false,
	idToken: null,
	email: null,
	refreshToken: null,
	expiresIn: null,
	localId: null,
	loading: false,
	error: null,
	redirectPath: null,
	displayName: null
};

const reducer = (state = defaultState, action) => {
	switch(action.type){
		case actionTypes.LOGIN_START:
		case actionTypes.REGISTER_START: 
			return {
				...state,
				error: false,
				loading: true
			}
		case actionTypes.LOGIN_FAIL:
		case actionTypes.REGISTER_FAIL:
			return {
				...state,
				error: action.error,
				loading: false
			}
		case actionTypes.REGISTER_SUCCESS:
			return {
				...state,
				redirectPath: '/login',
				loading: false
			}
		case actionTypes.LOGIN_SUCCESS:
			console.log(action)
			return {
				...state,
				redirectPath: '/',
				email: action.email,
				expiresIn: action.expiresIn,
				idToken: action.idToken,
				localId: action.localId,
				refreshToken: action.refreshToken,
				displayName: action.displayName,
				isAuth: true,
				loading: false
			}
		case actionTypes.LOGOUT:
			return {
				isAuth: false,
				idToken: null,
				email: null,
				refreshToken: null,
				expiresIn: null,
				localId: null,
				displayName: null
			}
		case actionTypes.CLEAR_ERROR:
			return {
				...state,
				error: null
			}
		default: return state
	}
};

export default reducer;