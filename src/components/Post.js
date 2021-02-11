import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MessageIcon from '@material-ui/icons/Message';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import {connect} from 'react-redux';
import {v4 as uuidv4} from 'uuid';

import {calculatePostAge} from '../utils';
import * as actions from '../store/actions';
import Comment from './Comment';

const MAX_COMMENT_LENGTH = 500;

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
	trashIcon: {
		color: theme.palette.common.crimson
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
    width: 100,
		[theme.breakpoints.down('md')]:{
			width: "100%"
		}
	}
}));

const Post = ({id, author, createdAt, content, likes, comments, updatePost, username, expanded, onExpand, localId, deletePost, ...props})=>{
	const classes = useStyles();
	const [commentContents, setCommentContents] = useState('');
	
	const handleLike = () => {
		console.log('post liked');
		const updatedPost = {author, content, createdAt, comments, id};
		let updatedLikes;
		if(likes.includes(localId)){
			updatedLikes = likes.filter(like => like !== localId);
		}else{
			updatedLikes = [...likes, localId];
		}
		updatedPost.likes = updatedLikes;
		updatePost(id, updatedPost);
	};

	const handleComment = () => {
		const milliseconds = new Date().getTime();
		const seconds = Math.round(milliseconds/1000);
		const nanoseconds = (milliseconds%1000) * 1000;
		const createdAt = {seconds, nanoseconds};
		const comment = {contents: commentContents, author: {name: username, id:localId}, createdAt};
		const newComments = [...comments, comment];
		const updatedPost = {author, content, createdAt, comments: newComments, id, likes};
		updatePost(id, updatedPost);
	};

	const handleKeyDown = event => {
    if(event.keyCode === 13 && commentContents.length > 1){
      event.preventDefault();
      handleComment();
    }
  }

	const trashIcon = (
		<Box style={{marginLeft: "auto"}}>
			<IconButton onClick={() => deletePost(id)}>
				<DeleteForeverIcon className={classes.trashIcon}/>
			</IconButton>
		</Box>
	);

	const commentSection = comments.length > 0 &&(
		<CardContent className={classes.commentsList}>
			<Grid container direction="column" spacing={2} >
				{comments.map(({author, contents, createdAT})=>(
					<Grid item key={uuidv4()}>
						<Comment author={author} contents={contents} createdAt={createdAt}/>
					</Grid>
				))}
			</Grid>
		</CardContent>
	);

	const commentInputField = (
		<CardActions>
			<Grid container alignItems="center" spacing={2}>
				<Grid item xs={9} sm={10}>
					<TextField 
					variant="filled" 
					fullWidth 
					size="small" 
					placeholder="Spark a discussion!" 
					multiline
					autoFocus
					onKeyDown={handleKeyDown}
					rowsMax={5}
					helperText={`${commentContents.length}/${MAX_COMMENT_LENGTH}`} 
					value={commentContents} 
					onChange={e => setCommentContents(e.target.value.slice(0, MAX_COMMENT_LENGTH))}/>
				</Grid>
				<Grid item xs={3} sm={2} container justify="center">
					<Grid item>
						<Button variant="contained" color="secondary" className={classes.submitButton} disabled={commentContents.length === 0} onClick={handleComment}>Submit</Button>
					</Grid>
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
							{author.name}
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
					{likes.includes(localId) ? <FavoriteIcon className={classes.heartIcon}/> : <FavoriteBorderIcon className={classes.heartIcon}/>}
				</IconButton>
				<Typography variant="subtitle1" onClick={handleLike}>
					{likes.length} <Hidden xsDown>{likes.length === 1 ? "like" : "likes"}</Hidden>
				</Typography>
				<IconButton edge="end" onClick={() => onExpand(id)}>
					<MessageIcon className={classes.commentIcon}/>
				</IconButton>
				<Typography variant="subtitle1">
					{comments.length} <Hidden xsDown>{comments.length === 1 ? "comment" : "comments"}</Hidden>
				</Typography>
				{author.id === localId && trashIcon}
			</CardActions>
			{expanded && commentSection}
			{expanded && commentInputField}
		</Card>
	);
};

const mapStateToProps = state => {
	return {
		username: state.auth.displayName,
		localId: state.auth.localId
	};
};

const mapDispatchToProps = dispatch => {
	return {
		updatePost: (id, postData) => dispatch(actions.updatePost(id, postData)),
		deletePost: id => dispatch(actions.deletePost(id)),
	};
};

export default connect(mapStateToProps , mapDispatchToProps)(Post);