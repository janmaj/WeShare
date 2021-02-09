import React, {useState, useEffect} from 'react';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';

import * as actions from '../store/actions';

const useStyles = makeStyles(theme => ({
	dialog:{
		margin: 15,
		width: "100%",
		maxWidth: "40em",
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
	},
	textField: {

	},
	submitButton: {
		margin: "auto",
		borderRadius: 30,
    width: 100
	}
}));

const NewPostDialog = props =>{
	const classes = useStyles();
	const [postContents, setPostContents] = useState("");

	useEffect(() => {
		if(props.clearInput){
			setPostContents("");
			props.onClose();
			props.resetClearInput();
		}
	}, [setPostContents, props]);

	const handleSubmit = () => {
    const post = {
      content: postContents,
      author: props.userName,
      createdAt: new Date(),
      likes: [],
      comments: []
    };
    props.onSubmit(post);
  };
	
	return (
    <Dialog open={props.open} onClose={props.onClose} PaperProps={{classes: {root: classes.dialog}}}>
      <DialogTitle>
        <Typography variant="h2" align="center">Create a new post</Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container justify="center" alignItems="stretch">
					<Grid item xs={12}>
						<TextField
							fullWidth={true}
							placeholder="Share your thoughts with the world"
							variant="filled"
							className={classes.textField}
							multiline
							rows={4}
							rowsMax={10}
							value={postContents}
							onChange={e => setPostContents(e.target.value)}
						/>
					</Grid>
				</Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="secondary"
					className={classes.submitButton}
					disabled={postContents.length === 0}
					onClick={handleSubmit}
        >
          {props.loading ? <CircularProgress size={20}/> : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = state => {
  return {
    userName: state.auth.displayName,
    clearInput: state.feed.clearInput
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetClearInput: () => dispatch(actions.resetClearInput())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPostDialog);