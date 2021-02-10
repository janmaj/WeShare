import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import {calculatePostAge} from '../utils';

const Comment = ({contents, author, createdAt})=>{
	return (
		<React.Fragment>
			<Grid container spacing={1}>
				<Grid item>
					<Typography variant="subtitle2">
						{author.name}
					</Typography>
					<Typography variant="caption">
						{calculatePostAge(createdAt)}
					</Typography>
				</Grid>
				<Grid item>
					<Typography variant="body1">
						{contents}
					</Typography>
				</Grid>
			</Grid>
			<Divider />
		</React.Fragment>
	);
};

export default Comment;