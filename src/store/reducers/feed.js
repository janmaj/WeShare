import * as actionTypes from '../actions/actionTypes';

const defaultState = {
	posts: [],
	loadingSubmit: false,
	error: null,
	clearInput: false
};

const reducer = (state = defaultState, action) => {
	switch(action.type){
		case actionTypes.ADD_POST_START: 
			return{
				...state,
				loadingSubmit: true
			};
		case actionTypes.ADD_POST_SUCCESS:
			return {
				...state,
				loadingSubmit: false,
				posts: [...state.posts, action.post],
				clearInput: true
			};
		case actionTypes.ADD_POST_FAIL:
			return {
				...state,
				loadingSubmit: false,
				error: action.error
			};
		case actionTypes.RESET_CLEAR_INPUT:
			return {
				...state,
				clearInput: false
			};
		case actionTypes.CLEAR_ERROR:
			return {
				...state,
				error: null
			};
		default: return state;
	}
};

export default reducer;