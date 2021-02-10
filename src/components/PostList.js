import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {v4 as uuidv4} from 'uuid';

import Post from './Post';

const comp = ({posts, expanded, onExpand})=>{
	const postElements = (
	<Grid container direction="column" spacing={3}>
	{posts.map(postData=>{
		return (
			<Grid item xs={12} key={uuidv4()}>
				<Post {...postData} expanded={postData.id === expanded} onExpand={onExpand}/>
			</Grid>
		);
	})}
</Grid>);
	
	return (
		posts.length > 0 ? postElements : <Typography variant="h4" align="right">No posts are currently available</Typography>
	);
};

export default comp;