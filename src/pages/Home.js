import React from "react";
import Navbar from "../components/Navbar";
import { Button, Grid, Typography, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import heroBackground from "../assets/home-hero.jpg";
import ctaBackground from "../assets/home-cta.jpg";

const useStyles = makeStyles((theme) => ({
  heroSection: {
    background: `url(${heroBackground})`,
    backgroundSize: "cover",
    backgroundPosition: "left",
    backgroundAttachment: "fixed",
    padding: "2em 1em",
    minHeight: "30em",
    height: "calc(100vh - 80px)",
    display: "flex",
    alignItems: "center",
  },
  container: {
    maxWidth: 1280,
    width: "100%",
    margin: "auto",
  },
  heroTitle: {
    color: "white",
    lineHeight: "100%",
    fontSize: "3rem",
    "@media (min-width: 450px)": {
      fontSize: "4rem",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "6rem",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "8rem",
    },
  },
  infoSection: {
    padding: "2em 1em",
  },
  infoTitle: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "2.5rem",
    lineHeight: "100%",
    color: theme.palette.common.darkBlue,
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: theme.palette.common.darkBlue,
  },
  paragraph: {
    color: theme.palette.common.blue,
    lineHeight: "160%",
    maxWidth: "50ch",
  },
  ctaSection: {
    padding: "2em 2em",
    background: `url(${ctaBackground})`,
    backgroundColor: "rgba(255,255,255,0.6)",
    backgroundBlendMode: "lighten",
    backgroundSize: "1200px",
    backgroundPosition: "bottom -20em left",
    [theme.breakpoints.up("md")]: {
      backgroundSize: "cover",
      backgroundPosition: "center center",
    },
  },
  ctaTitle: {
    lineHeight: "100%",
    color: theme.palette.common.darkBlue,
    fontSize: "3rem",
    "@media (min-width: 500px)": {
      fontSize: "4rem",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "5rem",
    },
  },
  footer: {
    backgroundColor: theme.palette.common.darkBlue,
    color: "white",
    textAlign: "center",
    padding: 3,
  },
}));

const Home = () => {
  const classes = useStyles();
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      <Navbar isAuth={false} activeTab={2} />
      <section className={classes.heroSection}>
        <Grid
          container
          className={classes.container}
          spacing={4}
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <Typography
              variant="h1"
              className={classes.heroTitle}
              align={mdUp ? "left" : "center"}
            >
              Social Media
              <br />
              Done Right
            </Typography>
          </Grid>
          <Grid
            item
            container
            direction={mdUp ? "row" : "column"}
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                size="large"
                href="/signup"
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
                href="#info"
              >
                Learn more
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </section>
      <section className={classes.infoSection} id="info">
        <Grid
          container
          className={classes.container}
          spacing={mdUp ? 10 : 4}
          justify="space-between"
        >
          <Grid item xs={12}>
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
            spacing={1}
            md={5}
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
            spacing={1}
            md={5}
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
            spacing={1}
            md={5}
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
            spacing={1}
            md={5}
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
          className={classes.container}
          alignItems="center"
          spacing={4}
        >
          <Grid item xs={12} md={6}>
            <Typography
              variant="h2"
              align={mdUp ? "left" : "center"}
              className={classes.ctaTitle}
            >
              Are you
              <br /> excited <br />
              yet?
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            container
            justify={mdUp ? "flex-end" : "center"}
          >
            <Button
              className={classes.ctaButton}
              variant="contained"
              color="secondary"
              size="large"
              href="/signup"
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
