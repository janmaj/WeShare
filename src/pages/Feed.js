import React, {useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {Redirect} from 'react-router-dom';

import PostList from '../components/PostList';
import NewPost from '../components/NewPost';
import * as actions from '../store/actions';

const useStyles = makeStyles(theme => ({
	feedTitle: {
		color: theme.palette.common.darkBlue
	},
	snackBar:{
    backgroundColor: theme.palette.error.main
  }
}));

const Feed = ({logout, isAuth, error, clearError, posts, loadingFeed, fetchPosts, ...props})=>{
	const classes = useStyles();
	const history = useHistory();
	const [snackbarOpen, setSnackbarOpen] = useState(false);

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
				<Grid container spacing={4}>
					<Grid item lg={12}>
						<Typography variant="h1" className={classes.feedTitle}>
							Your Feed
						</Typography>
					</Grid>
					<Grid item container lg={7} direction="column">
						<Grid item>
							{loadingFeed ? <CircularProgress /> : <PostList posts={posts}/>}
						</Grid>
					</Grid>
					<Grid item lg={5}>
						<NewPost style={{position: "fixed"}} onSubmit={post => props.submitPost(post)} loading={props.loadingSubmit}/>
					</Grid>
				</Grid>
			</Container>
			<Snackbar classes={{root: classes.snackBar}} open={snackbarOpen} onClose={() => setSnackbarOpen(false)}>
        <SnackbarContent message={"Something went wrong. Try again later"} classes={{root: classes.snackBar}}/>
      </Snackbar>
		</React.Fragment>
	);
};

const mapStateToProps = state => {
	return {
		isAuth: state.auth.isAuth,
		error: state.feed.error,
		loadingSubmit: state.feed.loadingSubmit,
		posts: state.feed.posts,
		loadingFeed: state.feed.loadingFeed
	};
};

const mapDispatchToProps = dispatch => {
	return {
		logout: () => dispatch(actions.logout()),
		submitPost: post => dispatch(actions.addPost(post)),
		clearError: () => dispatch(actions.clearError()),
		fetchPosts: () => dispatch(actions.fetchPosts())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);