import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

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
		borderRadius: 30
	}
}));

const NewPost = (props) => {
  const classes = useStyles();

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
              />
            </Grid>
            <Grid item>
              <Button variant="contained" color="secondary" className={classes.submitButton}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default NewPost;
