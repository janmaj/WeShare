import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MessageIcon from '@material-ui/icons/Message';
import IconButton from '@material-ui/core/IconButton';
import {connect} from 'react-redux';

import {calculatePostAge} from '../utils';
import * as actions from '../store/actions';

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
	}
}));

const Post = ({id, author, createdAt, content, likes, comments, updatePost, username, ...props})=>{
	const classes = useStyles();
	
	const handleLike = () => {
		console.log('post liked');
		const updatedPost = {author, content, createdAt, comments};
		let updatedLikes;
		if(likes.includes(username)){
			updatedLikes = likes.filter(like => like !== username);
		}else{
			updatedLikes = [...likes, username];
		}
		updatedPost.likes = updatedLikes;
		updatePost(id, updatedPost);
	}

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
				<IconButton edge="end">
					<MessageIcon className={classes.commentIcon}/>
				</IconButton>
				<Typography variant="subtitle1">
					0 comments
				</Typography>
			</CardActions>
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