import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import gray from '@material-ui/core/colors/grey';

const darkBlue = '#050831';
const blue = '#133072';
const lightBlue = '#d5e6f7';
const lightPurple = '#d5adfb';
const crimson = '#f90052';

const theme = createMuiTheme({
	palette: {
		common: {
			darkBlue,
			blue,
			lightBlue,
			lightPurple,
			crimson,
		},
		primary: {
			main: blue
		},
		secondary: {
			main: crimson
		}
	},
	typography: {
		h1:{
			fontFamily: "Lobster",
			fontSize: "5rem",
			lineHeight: 1.5
		},
		h2:{
			fontFamily: "Lobster",
			fontSize: "3rem",
		},
		subtitle1:{
			color: blue
		},
		subtitle2:{
			color: blue
		},
		caption: {
			color: darkBlue
		}
	},
	overrides:{
		MuiTab: {
			root:{
				fontWeight: "600",
				letterSpacing: 1.25,
				fontSize: "0.95rem"
			},
		},
		MuiFilledInput: {
			root: {
				backgroundColor: gray[100]
			}
		},
	},
	props: {
		MuiTabs:{
			TabIndicatorProps: {
				style: {
					backgroundColor: "transparent"
				}
			}
		},
	}
});

export default theme;