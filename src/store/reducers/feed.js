import * as actionTypes from '../actions/actionTypes';

const defaultState = {
	posts: [],
	loadingSubmit: false,
	loadingFeed: false,
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
		case actionTypes.FETCH_POSTS_START: 
			return{
				...state,
				loadingFeed: true
			};
		case actionTypes.FETCH_POSTS_SUCCESS:
			return {
				...state,
				loadingFeed: false,
				posts: action.posts,
				clearInput: true
			};
		case actionTypes.FETCH_POSTS_FAIL:
			return {
				...state,
				loadingFeed: false,
				error: action.error
			};
		case actionTypes.UPDATE_POST_SUCCESS:
			const newPosts = state.posts.map(post => {
				if(post.id === action.id){
					return action.post
				}
				return post
			});
			return {
				...state,
				posts: newPosts
			}
		case actionTypes.UPDATE_POST_FAIL:
			return {
				error: action.error
			}
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