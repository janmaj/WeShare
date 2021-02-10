import React, {useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import Fab from '@material-ui/core/Fab';
import Hidden from '@material-ui/core/Hidden';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {Redirect} from 'react-router-dom';

import PostList from '../components/PostList';
import NewPost from '../components/NewPost';
import NewPostDialog from '../components/NewPostDialog';
import * as actions from '../store/actions';

const useStyles = makeStyles(theme => ({
	feedTitle: {
		color: theme.palette.common.darkBlue,
		[theme.breakpoints.down('sm')]:{
			lineHeight: "100%"
		}
	},
	snackBar:{
    backgroundColor: theme.palette.error.main
  },
	fab: {
		position: "fixed",
		bottom: theme.spacing(4),
		right: theme.spacing(4),
		width: 80,
		height: 80,
		opacity: 0,
		pointerEvents: "none",
		[theme.breakpoints.down('xs')]: {
			opacity: 1,
			pointerEvents: "all"
		}
	},
	fabIcon: {
		fontSize: "3rem"
	}
}));

const Feed = ({logout, isAuth, error, clearError, posts, loadingFeed, fetchPosts, expandedPost, onExpandPost, ...props})=>{
	const classes = useStyles();
	const history = useHistory();
	const theme = useTheme();
	const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);

	useEffect(()=>{
		fetchPosts();
	}, [fetchPosts]);
	
	useEffect(() =>{
		if(error){
			setSnackbarOpen(true);
			clearError();
		}
	}, [error, setSnackbarOpen, clearError]);

	const handleLogout = () => {
		logout();
		history.push('/login');
	}
	
	return (
		<React.Fragment>
			{!isAuth && <Redirect to="/login"/>}
			<Navbar authenticated activeTab={0} handleLogout={handleLogout}/>
			<Container>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<Typography variant="h1" className={classes.feedTitle} align={matchesSM ? "center" : "right"}>
							Your Feed
						</Typography>
					</Grid>
					<Hidden xsDown>
						<Grid item md={5} sm={12}>
							<NewPost style={{position: matchesSM ? undefined : "sticky", top: 80}} onSubmit={post => props.submitPost(post)} loading={props.loadingSubmit}/>
						</Grid>
					</Hidden>
					<Grid item container md={7} sm={12}direction="column">
						<Grid item>
							{loadingFeed ? <CircularProgress /> : <PostList posts={posts} expanded={expandedPost} onExpand={onExpandPost}/>}
						</Grid>
					</Grid>
				</Grid>
			</Container>
			<Snackbar classes={{root: classes.snackBar}} open={snackbarOpen} onClose={() => setSnackbarOpen(false)}>
        <SnackbarContent message={"Something went wrong. Try again later"} classes={{root: classes.snackBar}}/>
      </Snackbar>
			<Fab color="secondary" className={classes.fab} onClick={() => setDialogOpen(true)}>
				<AddIcon className={classes.fabIcon}/>
			</Fab>
			<NewPostDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onSubmit={post => props.submitPost(post)} loading={props.loadingSubmit}/>
		</React.Fragment>
	);
};

const mapStateToProps = state => {
	return {
		isAuth: state.auth.isAuth,
		error: state.feed.error,
		loadingSubmit: state.feed.loadingSubmit,
		posts: state.feed.posts,
		loadingFeed: state.feed.loadingFeed,
		expandedPost: state.feed.expandedPost
	};
};

const mapDispatchToProps = dispatch => {
	return {
		logout: () => dispatch(actions.logout()),
		submitPost: post => dispatch(actions.addPost(post)),
		clearError: () => dispatch(actions.clearError()),
		fetchPosts: () => dispatch(actions.fetchPosts()),
		onExpandPost: id => dispatch(actions.expandPost(id))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);