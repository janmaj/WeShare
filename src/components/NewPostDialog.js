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

const MAX_POST_LENGTH = 1000;

const useStyles = makeStyles(theme => ({
	dialog:{
		margin: 15,
		width: "100%",
		maxWidth: "40em",
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
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
      author: {name: props.userName, id: props.localId},
      createdAt: new Date(),
      likes: [],
      comments: []
    };
    props.onSubmit(post);
  };

	const handleKeyDown = event => {
    if(event.keyCode === 13 && postContents.length > 1){
      event.preventDefault();
      handleSubmit();
    }
  }
	
	return (
    <Dialog open={props.open} onClose={props.onClose} PaperProps={{classes: {root: classes.dialog}}}>
      <DialogTitle disableTypography>
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
							helperText={`${postContents.length}/${MAX_POST_LENGTH}`}
							onKeyDown={e => handleKeyDown(e)}
							rows={4}
							rowsMax={10}
							value={postContents}
							onChange={e => setPostContents(e.target.value.slice(0, MAX_POST_LENGTH))}
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
    localId: state.auth.localId,
    clearInput: state.feed.clearInput
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetClearInput: () => dispatch(actions.resetClearInput())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPostDialog);