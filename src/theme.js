import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const darkBlue = '#050831';
const blue = '#133072';
const lightblue = '#d5e6f7';
const lightPurple = '#d5adfb';
const crimson = '#f90052';

const theme = createMuiTheme({
	palette: {
		common: {
			darkBlue,
			blue,
			lightblue,
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

	}
});

export default theme;