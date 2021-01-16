import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import {makeStyles} from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles(theme=>({
	toolbar: {
		height: 80
	},
	logo:{
		fontSize: "1.5rem",
		color: theme.palette.common.lightBlue,
		marginRight: "1em",
		fontFamily: "Lobster",
		marginTop: -5
	},
	navTab: {
		minWidth: 100,
	},
	navTabSelected: {
		textDecoration: "underline"
	},
	toolbarMargin:{
		height: 80
	},
	logoutButton:{
		borderRadius: 20,
	}
}));

const Navbar = ({activeTab, authenticated, handleLogout})=>{
	const classes = useStyles();
	let tabs = (
    <Tabs value={activeTab}>
      <Tab
        classes={{ root: classes.navTab, selected: classes.navTabSelected }}
        label="Signup"
        component={Link}
        to="/signup"
        disableRipple
        selected={true}
      />
      <Tab
        classes={{ root: classes.navTab, selected: classes.navTabSelected }}
        label="Login"
        component={Link}
        to="/login"
        disableRipple
      />
      <Tab
        classes={{ root: classes.navTab, selected: classes.navTabSelected }}
        label="Home"
        component={Link}
        to="/"
        disableRipple
      />
    </Tabs>
	);
	
	if(authenticated){
		tabs = (
			<React.Fragment>
				<Tabs value={activeTab}>
					<Tab
						classes={{ root: classes.navTab, selected: classes.navTabSelected }}
						label="Feed"
						component={Link}
						to="/"
						disableRipple
						selected={true}
					/>
				</Tabs>
				<Button variant="contained" color="secondary" className={classes.logoutButton} endIcon={<ExitToAppIcon/>} onClick={handleLogout}>
					Log Out
				</Button>
			</React.Fragment>
		)
	}

	return (
		<React.Fragment>
			<AppBar>
				<Toolbar className={classes.toolbar}>
					<Box className={classes.logo}>
						<PeopleAltIcon className={classes.logoIcon}/>
						WeShare
					</Box>
					{tabs}
				</Toolbar>
			</AppBar>
			<div className={classes.toolbarMargin} />
		</React.Fragment>
	);
};

export default Navbar;