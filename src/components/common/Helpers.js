const roundOf = (amount) => {
	return Math.round(amount);
};

const getSlideTime = (itemCount) => {
	let time = 10;
	switch(itemCount){
		case 1:
			time = 3;
			break;
		case 2: 
			time = 4;
			break;
		case 3:
		case 4:
		case 5:
			time = 6;
			break;
		case 6:
			time = 8;
			break;
		default:
			time = 10;
			break;
	}
	return time*1000;
	debugger;
}

export {
	roundOf,
	getSlideTime
};