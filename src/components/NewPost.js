import React, {useState, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import {connect} from 'react-redux';

import * as actions from '../store//actions';

const useStyles = makeStyles((theme) => ({
  newPostContainer: {
    width: "inherit",
  },
  newPostPaper: {
    padding: theme.spacing(3),
	},
	inputField:{
		width: "25em"
	},
	submitButton:{
    borderRadius: 30,
    width: 100
	}
}));

const NewPost = ({onSubmit, loading, userName, clearInput, resetClearInput, ...props}) => {
  const classes = useStyles();
  const [postContents, setPostContents] = useState("");

  useEffect(() => {
    if(clearInput){
      setPostContents("");
      resetClearInput();
    }
  }, [clearInput, resetClearInput]);

  const handleSubmit = () => {
    const post = {
      text: postContents,
      author: userName
    };
    onSubmit(post);
  };

  return (
    <Grid
      container
      direction="column"
      className={classes.newPostContainer}
      {...props}
    >
      <Grid item>
        <Typography variant="h2">Create a new post</Typography>
      </Grid>
      <Grid item>
        <Paper elevation={8} className={classes.newPostPaper}>
          <Grid
            container
            justify="center"
            direction="column"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <TextField
                placeholder="Share your thoughts with the world"
                variant="filled"
                multiline
								rows={4}
								rowsMax={10}
                className={classes.inputField}
                value={postContents}
                onChange={e => setPostContents(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" color="secondary" className={classes.submitButton} disabled={postContents.trim().length === 0} onClick={handleSubmit}>
                {loading ? <CircularProgress size={20}/> : "Submit"}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
