import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MessageIcon from '@material-ui/icons/Message';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
	avatar:{
		width: 60,
		height: 60
	},
	authorName:{
		fontWeight: 600,
		fontSize: "1.1rem",
		color: theme.palette.primary.main
	},
	content: {
		marginTop: theme.spacing(2)
	},
	heartIcon:{
		color: theme.palette.common.crimson
	},
	commentIcon: {
		color: theme.palette.common.blue
	}
}));

const Post = ({author, createdAt, content, likes, comments})=>{
	const classes = useStyles();
	
	return (
		<Card elevation={8}>
			<CardContent>
				<Grid container alignItems="center" spacing={2}>
					<Grid item>
						<Avatar className={classes.avatar}/>
					</Grid>
					<Grid item>
						<Typography variant="subtitle1" className={classes.authorName}>
							Author
						</Typography>
						<Typography variant="caption">
							3h ago
						</Typography>
					</Grid>
				</Grid>
				<Typography className={classes.content}>
					Hi, this is my first post please don't be too mean. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates nihil asperiores reiciendis provident quas vero?
				</Typography>
			</CardContent>
			<CardActions>
				<IconButton edge="end">
					<FavoriteBorderIcon className={classes.heartIcon}/>
				</IconButton>
				<Typography variant="subtitle1">
					0 likes
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

export default Post;