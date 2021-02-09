import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MessageIcon from '@material-ui/icons/Message';
import IconButton from '@material-ui/core/IconButton';
import {connect} from 'react-redux';

import {calculatePostAge} from '../utils';
import * as actions from '../store/actions';
import Comment from './Comment';

const useStyles = makeStyles(theme => ({
	avatar:{
		width: 60,
		height: 60
	},
	authorName:{
		fontWeight: 600,
		fontSize: "1.1rem",
		color: theme.palette.primary.main,
	},
	content: {
		marginTop: theme.spacing(2),
		marginLeft: theme.spacing(2)
	},
	heartIcon:{
		color: theme.palette.common.crimson
	},
	commentIcon: {
		color: theme.palette.common.blue
	},
	commentsList: {
		maxHeight: "15em",
		overflow: "auto",
		borderTop: "2px solid lightgrey",
		borderBottom: "2px solid lightgrey",
	},
	submitButton: {
		margin: "auto",
		borderRadius: 30,
    width: 100
	}
}));

const Post = ({id, author, createdAt, content, likes, comments, updatePost, username, expanded, onExpand, ...props})=>{
	const classes = useStyles();
	
	const handleLike = () => {
		console.log('post liked');
		const updatedPost = {author, content, createdAt, comments, id};
		let updatedLikes;
		if(likes.includes(username)){
			updatedLikes = likes.filter(like => like !== username);
		}else{
			updatedLikes = [...likes, username];
		}
		updatedPost.likes = updatedLikes;
		updatePost(id, updatedPost);
	}

	const commentSection = (
		<CardContent className={classes.commentsList}>
			<Grid container direction="column" spacing={2} >
				<Grid item lg={12}>
					<Comment />
				</Grid>
				<Grid item lg={12}>
					<Comment />
				</Grid>
				<Grid item lg={12}>
					<Comment />
				</Grid>
			</Grid>
		</CardContent>
	);

	const commentInputField = (
		<CardActions>
			<Grid container alignItems="center" spacing={2}>
				<Grid item md={10}>
					<TextField variant="filled" fullWidth size="small"/>
				</Grid>
				<Grid item md={2}>
					<Button variant="contained" color="secondary" className={classes.submitButton}>Submit</Button>
				</Grid>
			</Grid>
		</CardActions>
	);

	return (
		<Card elevation={8}>
			<CardContent>
				<Grid container alignItems="center" spacing={2}>
					<Grid item>
						<Avatar className={classes.avatar}/>
					</Grid>
					<Grid item>
						<Typography variant="subtitle1" className={classes.authorName}>
							{author}
						</Typography>
						<Typography variant="caption">
							{calculatePostAge(createdAt)}
						</Typography>
					</Grid>
				</Grid>
				<Typography className={classes.content}>
					{content}
				</Typography>
			</CardContent>
			<CardActions>
				<IconButton edge="end" onClick={handleLike}>
					{likes.includes(username) ? <FavoriteIcon className={classes.heartIcon}/> : <FavoriteBorderIcon className={classes.heartIcon}/>}
				</IconButton>
				<Typography variant="subtitle1">
					{likes.length} {likes.length === 1 ? "like" : "likes"}
				</Typography>
				<IconButton edge="end" onClick={() => onExpand(id)}>
					<MessageIcon className={classes.commentIcon}/>
				</IconButton>
				<Typography variant="subtitle1">
					0 comments
				</Typography>
			</CardActions>
			{expanded && commentSection}
			{expanded && commentInputField}
		</Card>
	);
};

const mapStateToProps = state => {
	return {
		username: state.auth.displayName
	};
};

const mapDispatchToProps = dispatch => {
	return {
		updatePost: (id, postData) => dispatch(actions.updatePost(id, postData))
	};
};

export default connect(mapStateToProps , mapDispatchToProps)(Post);