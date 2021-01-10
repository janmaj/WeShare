import React from "react";
import Navbar from "../components/Navbar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import login from "../assets/login-hero.jpg";

const useStyles = makeStyles((theme) => ({
  loginHero: {
    width: "100%",
    height: "20em",
    background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${login})`,
    backgroundPosition: "center",
    color: "white",
  },
  formContainer: {
    margin: "auto",
    maxWidth: "30em",
    padding: "3em 2em",
    marginTop: "2em",
  },
  formInput: {
    minWidth: "20em",
  },
  loginButton: {
    borderRadius: 30,
    fontFamily: "Lobster",
    width: "8em",
    textTransform: "none",
    fontSize: "1.25em",
    marginTop: "1em",
    marginBottom: "1em",
  },
}));

const Signup = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Navbar activeTab={1} />
      <Grid
        container
        className={classes.loginHero}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Typography variant="h1">Jump Back In!</Typography>
        <Typography variant="h2">It's great to see You again</Typography>
      </Grid>
      <Paper className={classes.formContainer} elevation={6}>
        <Grid
          container
          direction="column"
          align="center"
          justify="center"
          spacing={2}
        >
          <Grid item>
            <TextField
              className={classes.formInput}
              variant="filled"
              id="email"
              label="email"
            />
          </Grid>
          <Grid item>
            <TextField
              className={classes.formInput}
              variant="filled"
              id="password"
              label="password"
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              className={classes.loginButton}
            >
              Log In
            </Button>
            <Typography variant="subtitle2">
              Don't have an account yet?
              <br /> <Link to ="/signup">Click here to sign up.</Link>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
};

export default Signup;
