import * as actionTypes from '../actions/actionTypes';

const defaultState = {
	posts: [],
	expandedPost: null,
	loadingSubmit: false,
	loadingFeed: false,
	error: null,
	clearInput: false
};

const reducer = (state = defaultState, action) => {
	let newPosts;
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
				posts: [action.post, ...state.posts],
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
			newPosts = state.posts.map(post => {
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
				...state,
				error: action.error
			}
		case actionTypes.DELETE_POST_SUCCESS:
			newPosts = state.posts.filter(({id})=> id !== action.id);
			return {
				...state,
				posts: newPosts
			}
		case actionTypes.DELETE_POST_FAIL:
			return {
				...state,
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
		case actionTypes.EXPAND_POST: {
			return {
				...state,
				expandedPost: action.id === state.expandedPost ? null : action.id // Shrinks post if it's already expanded
			}
		}
		default: return state;
	}
};

export default reducer;