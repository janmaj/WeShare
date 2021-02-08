import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import useMediaquery from '@material-ui/core/useMediaQuery';
import {Link} from 'react-router-dom';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import cx from 'classnames';

const useStyles = makeStyles(theme=>({
	appBar: {
		zIndex: theme.zIndex.modal + 1,
	},
	toolbar: {
		height: 80,
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
	},
	menuButton:{
		marginLeft: "auto",
		color: theme.palette.common.lightBlue,
	},
	menuIcon: {
		fontSize: "1.25em"
	},
	drawer: {
		backgroundColor: theme.palette.common.blue,
		width: "10em",
	},
	drawerItem: {
		...theme.typography.button,
		color: theme.palette.common.lightBlue,
		textAlign: "center",
		'&:hover':{
			textDecoration: "underline"
		},
	},
	drawerItemSelected: {
		backgroundColor: "red",
		textDecoration: "underLine"
	},
	logoutDrawerItem: {
		backgroundColor: theme.palette.secondary.main,
		'&:hover':{
			backgroundColor: theme.palette.secondary.dark,
			textDecoration: "none"
		}
	}
}));

const Navbar = ({activeTab, authenticated, handleLogout})=>{
	const classes = useStyles();
	const theme = useTheme();
	const matchesXS = useMediaquery(theme.breakpoints.down('xs'));
	const [drawerOpen, setDrawerOpen] = useState(false);

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

	const menuButton = (
		<IconButton className={classes.menuButton} disableRipple onClick={() => setDrawerOpen(!drawerOpen)}>
			<MenuIcon className={classes.menuIcon}/>
		</IconButton>
	);

	let  drawer = (
		<Drawer classes={{paper: classes.drawer}} open={drawerOpen} onClose={() => setDrawerOpen(false)}>
			<div className={classes.toolbarMargin}/>
			<List>
				<ListItem button classes={{root:classes.drawerItem, selected: classes.drawerItemSelected}} selected={activeTab===0} component={Link} to="/signup">
					<ListItemText primary="Signup"/>
				</ListItem>
				<ListItem button classes={{root:classes.drawerItem, selected: classes.drawerItemSelected}} selected={activeTab===1} component={Link} to="/login">
					<ListItemText primary="Login"/>
				</ListItem>
				<ListItem button classes={{root:classes.drawerItem, selected: classes.drawerItemSelected}} selected={activeTab===2} component={Link} to="/home">
					<ListItemText primary="Home"/>
				</ListItem>
			</List>
		</Drawer>
	);

	if(authenticated){
		drawer = (
		<Drawer classes={{paper: classes.drawer}} open={drawerOpen} onClose={() => setDrawerOpen(false)}>
			<div className={classes.toolbarMargin}/>
			<List>
				<ListItem button classes={{root:classes.drawerItem, selected: classes.drawerItemSelected}} selected={activeTab===0} component={Link} to="/">
					<ListItemText primary="Feed"/>
				</ListItem>
				<ListItem button onClick={handleLogout} className={cx(classes.drawerItem, classes.logoutDrawerItem)}>
					<ListItemText primary="Log out"/>
				</ListItem>
			</List>
		</Drawer>
		);
	}

	return (
		<React.Fragment>
			<AppBar className={classes.appBar}>
				<Toolbar className={classes.toolbar}>
					<Box className={classes.logo}>
						<PeopleAltIcon className={classes.logoIcon}/>
						WeShare
					</Box>
					{matchesXS ? menuButton : tabs}
				</Toolbar>
			</AppBar>
			<div className={classes.toolbarMargin} />
			{matchesXS && drawer}
		</React.Fragment>
	);
};

export default Navbar;