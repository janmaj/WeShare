import React from 'react';
import Navbar from '../components/Navbar';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
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
	}
}));

const Feed = ({logout, isAuth, ...props})=>{
	const classes = useStyles();
	const history = useHistory();

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
							<PostList />
						</Grid>
					</Grid>
					<Grid item lg={5}>
						<NewPost style={{position: "fixed"}}/>
					</Grid>
				</Grid>
			</Container>
		</React.Fragment>
	);
};

const mapStateToProps = state => {
	return {
		isAuth: state.auth.isAuth
	};
};

const mapDispatchToProps = dispatch => {
	return {
		logout: () => dispatch(actions.logout())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);