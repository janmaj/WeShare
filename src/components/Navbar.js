import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Link} from 'react-router-dom';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import {makeStyles} from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

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
	}
}));

const Navbar = ({activeTab})=>{
	const classes = useStyles();
	
	return (
		<React.Fragment>
			<AppBar>
				<Toolbar className={classes.toolbar}>
					<Box className={classes.logo}>
						<PeopleAltIcon className={classes.logoIcon}/>
						WeShare
					</Box>
					<Tabs value={activeTab}>
						<Tab classes={{root: classes.navTab, selected: classes.navTabSelected}} label="Signup" component={Link} to="/signup" disableRipple selected={true}/>
						<Tab classes={{root: classes.navTab, selected: classes.navTabSelected}} label="Login" component={Link} to="/login" disableRipple/>
						<Tab classes={{root: classes.navTab, selected: classes.navTabSelected}} label="Home" component={Link} to="/" disableRipple/>
					</Tabs>
				</Toolbar>
			</AppBar>
			<div className={classes.toolbarMargin} />
		</React.Fragment>
	);
};

export default Navbar;