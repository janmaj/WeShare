import React from "react";
import Navbar from "../components/Navbar";
import { Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import heroBackground from "../assets/home-hero.jpg";
import ctaBackground from "../assets/home-cta.jpg";

const useStyles = makeStyles((theme) => ({
  heroSection: {
    background: `url(${heroBackground})`,
    backgroundSize: "cover",
    backgroundPosition: "left",
    padding: "2em 1em",
    minHeight: "30em",
    height: "calc(100vh - 80px)",
  },
  heroContainer: {
    maxWidth: 1280,
    height: "100%",
  },
  heroTitle: {
    color: "white",
    lineHeight: "100%",
    fontSize: "3rem",
    "@media (min-width: 450px)": {
      fontSize: "4rem",
    },
  },
  infoSection: {
    boxShadow: "inset 2px 2px 2px rgba(0,0,0,.25)",
    padding: "2em 1em",
  },
  infoTitle: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "2.5rem",
    lineHeight: "100%",
    color: "#050831",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#050831",
  },
  paragraph: {
    color: "#133072",
    lineHeight: "160%",
    maxWidth: "50ch",
  },
  ctaSection: {
    padding: "2em 1em",
    background: `url(${ctaBackground})`,
    backgroundColor: "rgba(255,255,255,0.5)",
    backgroundBlendMode: "lighten",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
  },
  ctaTitle: {
    lineHeight: "100%",
    color: "#050831",
    fontSize: "3rem",
    "@media (min-width: 450px)": {
      fontSize: "4rem",
    },
  },
  footer: {
    backgroundColor: "#050831",
    color: "white",
    textAlign: "center",
  },
  button: {},
}));

const Home = (props) => {
  const classes = useStyles();

  return (
    <>
      <Navbar isAuth={false} activeTab={2} />
      <section className={classes.heroSection}>
        <Grid
          container
          className={classes.heroContainer}
          spacing={4}
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <Typography
              variant="h1"
              className={classes.heroTitle}
              align="center"
            >
              Social Media
              <br />
              Done Right
            </Typography>
          </Grid>
          <Grid
            item
            container
            direction="column"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                size="large"
              >
                Sign up now
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                className={classes.button}
                color="secondary"
                size="large"
              >
                Learn more
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </section>
      <section className={classes.infoSection}>
        <Grid
          container
          className={classes.infoContainer}
          spacing="4"
          justify="center"
        >
          <Grid item>
            <Typography
              variant="h2"
              className={classes.infoTitle}
              align="center"
            >
              What makes WeShare special?
            </Typography>
          </Grid>
          <Grid
            item
            container
            direction="column"
            alignItems="center"
            spacing="1"
          >
            <Grid item>
              <Typography
                variant="h3"
                className={classes.heading}
                align="center"
              >
                No Price Tag
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="body1"
                className={classes.paragraph}
                align="center"
              >
                WeShare is - and always will be - completely free of charge. You
                don’t need to spend a single dime to use the platform. But wait,
                there’s more: Ads are nonexistent too!
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="column"
            alignItems="center"
            spacing="1"
          >
            <Grid item>
              <Typography
                variant="h3"
                className={classes.heading}
                align="center"
              >
                Simplicity
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="body1"
                className={classes.paragraph}
                align="center"
              >
                WeShare was made with simplicity in mind. You no longer need to
                find your way througn an abundance of pages and menus. Just jump
                in and have a great time.
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="column"
            alignItems="center"
            spacing="1"
          >
            <Grid item>
              <Typography
                variant="h3"
                className={classes.heading}
                align="center"
              >
                Anonymity
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="body1"
                className={classes.paragraph}
                align="center"
              >
                Are you tired of having your data stolen and sold by corporate
                giants? We decided to put an end to this. You can use WeShare
                without worrying about your privacy. Just how it shoul always be
                done.
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="column"
            alignItems="center"
            spacing="1"
          >
            <Grid item>
              <Typography
                variant="h3"
                className={classes.heading}
                align="center"
              >
                Freedom of Speech
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="body1"
                className={classes.paragraph}
                align="center"
              >
                In a world of political correctness, a platform that allows you
                to freely axpress yourself is a true bliss. Say no to
                censorship. Say yes to WeShare.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </section>
      <section className={classes.ctaSection}>
        <Grid
          container
          className={classes.ctaContainer}
          direction="column"
          alignItems="center"
          spacing={4}
        >
          <Grid item>
            <Typography
              variant="h2"
              align="center"
              className={classes.ctaTitle}
            >
              Are you
              <br /> excited <br />
              yet?
            </Typography>
          </Grid>
          <Grid item>
            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
              size="large"
            >
              Join the community
            </Button>
          </Grid>
        </Grid>
      </section>
      <footer className={classes.footer}>
        Copyright &copy; {new Date().getFullYear()} Jan Majchrzak
      </footer>
    </>
  );
};

export default Home;
