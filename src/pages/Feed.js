import React from 'react';
import Navbar from '../components/Navbar';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';

import PostList from '../components/PostList';

const useStyles = makeStyles(theme => ({
	feedTitle: {
		color: theme.palette.common.darkBlue
	}
}));

const Feed = props=>{
	const classes = useStyles();
	
	return (
		<React.Fragment>
			<Navbar authenticated activeTab={0}/>
			<Container>
				<Grid container>
					<Grid item container lg={8} direction="column">
						<Grid item>
							<Typography variant="h1" className={classes.feedTitle}>
								Your Feed
							</Typography>
						</Grid>
						<Grid item>
							<PostList />
						</Grid>
					</Grid>
				</Grid>
			</Container>
		</React.Fragment>
	);
};

export default Feed;