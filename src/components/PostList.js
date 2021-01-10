import React from 'react';
import Grid from '@material-ui/core/Grid';

import Post from './Post';

const comp = ({posts})=>{
	return (
		<Grid container direction="column" spacing={3}>
			<Grid item xs={12}>
				<Post />
			</Grid>
			<Grid item xs={12}>
				<Post />
			</Grid>
			<Grid item xs={12}>
				<Post />
			</Grid>
			<Grid item xs={12}>
				<Post />
			</Grid>
			<Grid item xs={12}>
				<Post />
			</Grid>
			<Grid item xs={12}>
				<Post />
			</Grid>
		</Grid>
	);
};

export default comp;