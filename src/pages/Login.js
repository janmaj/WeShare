import React, {useState, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link, Redirect } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import {connect} from 'react-redux';

import Navbar from "../components/Navbar";
import login from "../assets/login-hero.jpg";
import * as actions from '../store/actions';

const useStyles = makeStyles((theme) => ({
  loginHero: {
    width: "100%",
    height: "20em",
    background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${login})`,
    backgroundPosition: "center",
    color: "white",
    [theme.breakpoints.down('sm')]:{
      height: "15em",
    },
    [theme.breakpoints.down('xs')]:{
      height: "10em",
    }
  },
  formContainer: {
    margin: "auto",
    width: "30em",
    padding: "3em 2em",
    marginTop: "2em",
    [theme.breakpoints.down('xs')]:{
      width: "100%",
      padding: "1em"
    }
  },
  formInput: {
    minWidth: "20em",
    [theme.breakpoints.down('xs')]:{
      width: "100%",
      minWidth: "15em"
    }
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
  snackBar:{
    backgroundColor: theme.palette.error.main
  },
  pageTitle:{
    [theme.breakpoints.down('sm')]: {
      fontSize: "4rem"
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: "3rem"
    }
  },
  pageSubtitle:{
    [theme.breakpoints.down('sm')]: {
      fontSize: "2rem"
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: "1.25rem"
    }
  }
}));

const Login = ({redirectPath, loading, error, handleLogin, clearError, ...props}) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    if(error){
      if(error.message === 'INVALID_PASSWORD'){
        setSnackbarMessage('Invalid email or password');
      }else{
        setSnackbarMessage('Something went wrong. Try again later');
      }
      setSnackbarOpen(true);
      clearError();
    }
  }, [error, setSnackbarOpen, setSnackbarMessage, clearError]);

  return (
    <React.Fragment>
      {redirectPath && <Redirect to={redirectPath} />}
      <Navbar activeTab={1} />
      <Grid
        container
        className={classes.loginHero}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Typography variant="h1" className={classes.pageTitle}>Jump Back In!</Typography>
        <Typography variant="h2" className={classes.pageSubtitle}>It's great to see You again</Typography>
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
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              className={classes.formInput}
              variant="filled"
              id="password"
              label="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              className={classes.loginButton}
              onClick={() => handleLogin(email, password)}
              disabled={loading}
            >
              {loading ? <CircularProgress /> : "Log In"}
            </Button>
            <Typography variant="subtitle2">
              Don't have an account yet?
              <br /> <Link to ="/signup">Click here to sign up.</Link>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <Snackbar classes={{root: classes.snackBar}} open={snackbarOpen} onClose={() => setSnackbarOpen(false)}>
        <SnackbarContent message={snackbarMessage} classes={{root: classes.snackBar}}/>
      </Snackbar>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    redirectPath: state.auth.redirectPath,
    loading: state.auth.loading,
    error: state.auth.error,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    handleLogin: (email, password) => dispatch(actions.loginUser(email, password)),
    clearError: () => dispatch(actions.clearError())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
