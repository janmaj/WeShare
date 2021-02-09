export const calculatePostAge = (timestamp) => {
	const minutes = (new Date().getTime()/1000 - timestamp.seconds)/60;
	if(minutes < 60){
		return Math.ceil(minutes) + "min ago";
	}
	const hours = minutes / 60;
	if(hours < 24){
		return Math.ceil(hours) + "h ago";
	}
	const days = hours/24;
	if(days < 30){
		return Math.ceil(days) + "d ago";
	}
	const months = days / 30;
	if(months < 12){
		return Math.ceil(months) + "months ago";
	}
	const years = months / 12;
	return Math.ceil(years) + "y ago";
};