import React, {useState, useCallback, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link, Redirect } from "react-router-dom";
import emailValidator from 'email-validator';
import {connect} from 'react-redux';

import * as actions from '../store/actions';
import Navbar from "../components/Navbar";
import signup from "../assets/signup-hero.jpg";

const useStyles = makeStyles((theme) => ({
  signupHero: {
    width: "100%",
    height: "20em",
    background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${signup})`,
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
  signupButton: {
    borderRadius: 30,
    fontFamily: "Lobster",
    width: "8em",
    textTransform: "none",
    fontSize: "1.25em",
    marginTop: "1em",
    marginBottom: "1em",
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

const Signup = ({error, redirectPath, loading, handleRegister}) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [emailHelper, setEmailHelper] = useState('');
  
  const [username, setUsername] = useState("");
  const [usernameHelper, setUsernameHelper] = useState("");

  const [password, setPassword] = useState('');
  const [passwordHelper, setPasswordHelper] = useState('');
  
  const [repPassword, setRepPassword] = useState('');
  const [repPasswordHelper, setRepPasswordHelper] = useState('');

  const validateEmail = useCallback(() => {
    if(email.length > 0){
      if(emailValidator.validate(email)){
        setEmailHelper('');
      }else{
        setEmailHelper('invalid email');
      }
    }else{
      setEmailHelper('');
    }
  }, [email]);

  const validatePassword = useCallback(() => {
    if(password.length > 0){
      if(password.length < 8){
        setPasswordHelper('Password too short');
      }else if(password.trim() !== password){
        setPasswordHelper('Password cannot contain spaces');
      }else{
        setPasswordHelper('');
      }
    }else{
      setPasswordHelper('');
    }
  }, [password]);

  const validateUsername = useCallback(() => {
    if(username.length > 0){
      if(username.length < 3){
        setUsernameHelper('Password too short');
      }else if(username.trim() !== username){
        setUsernameHelper('Password cannot contain spaces');
      }else{
        setUsernameHelper('');
      }
    }else{
      setUsernameHelper('');
    }
  }, [username]);

  const validateRepPassword = useCallback(() => {
    if(password !== repPassword){
      setRepPasswordHelper("Password is not repeated correctly");
    }else{
      setRepPasswordHelper('');
    }
  }, [password, repPassword]);

  const validateForm = () =>{
    return (
      email.length > 0 &&
      password.length > 0 &&
      username.length > 0 &&
      emailHelper === "" &&
      passwordHelper === "" &&
      repPasswordHelper === "" &&
      usernameHelper === ""
    );
  }

  useEffect(() => {
    validateEmail();
    validatePassword();
    validateRepPassword();
    validateUsername();
  }, [email, password, repPassword, validateEmail, validatePassword, validateRepPassword, validateUsername]);

  return (
    <React.Fragment>
      {redirectPath && <Redirect to={redirectPath} />}
      <Navbar activeTab={0} />
      <Grid
        container
        className={classes.signupHero}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Typography variant="h1" className={classes.pageTitle}>Sign Up Now!</Typography>
        <Typography variant="h2" className={classes.pageSubtitle}>We can't wait to have You onboard</Typography>
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
              id="name"
              label="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              helperText={usernameHelper}
              error={usernameHelper.length > 0}
            />
          </Grid>
          <Grid item>
            <TextField
              className={classes.formInput}
              variant="filled"
              id="email"
              label="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              helperText={emailHelper}
              error={emailHelper!==''}
            />
          </Grid>
          <Grid item>
            <TextField
              className={classes.formInput}
              variant="filled"
              id="password"
              label="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              helperText={passwordHelper}
              error={passwordHelper!==''}
            />
          </Grid>
          <Grid item>
            <TextField
              className={classes.formInput}
              variant="filled"
              id="password-repeat"
              label="repeat password"
              value={repPassword}
              onChange={e => setRepPassword(e.target.value)}
              helperText={repPasswordHelper}
              error={repPasswordHelper!==''}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              className={classes.signupButton}
              disabled={!validateForm() || loading}
              onClick={() =>handleRegister(email, password, username)}
            >
              {loading ? <CircularProgress /> : "Sign Up"}
            </Button>
            <Typography variant="subtitle2">
              Already have an account?
              <br /> <Link to="/login">Click here to log in.</Link>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
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
    handleRegister: (email, password, username) => dispatch(actions.registerUser(email, password, username))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
