import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const Comment = props=>{
	return (
		<React.Fragment>
			<Grid container spacing={1}>
				<Grid item>
					<Typography variant="subtitle2">
						Author
					</Typography>
					<Typography variant="caption">
						24h ago
					</Typography>
				</Grid>
				<Grid item>
					<Typography variant="body1">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit corporis quam culpa non consectetur odit omnis, recusandae magni harum incidunt sit repellendus quos veniam commodi a aliquid voluptas eligendi sapiente.
					</Typography>
				</Grid>
			</Grid>
			<Divider />
		</React.Fragment>
	);
};

export default Comment;