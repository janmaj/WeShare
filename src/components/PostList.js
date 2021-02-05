import React from 'react';
import Grid from '@material-ui/core/Grid';
import {v4 as uuidv4} from 'uuid';

import Post from './Post';

const comp = ({posts})=>{
	return (
		<Grid container direction="column" spacing={3}>
			{posts.map(postData=>{
				return (
					<Grid item xs={12} key={uuidv4()}>
						<Post {...postData} />
					</Grid>
				);
			})}
		</Grid>
	);
};

export default comp;