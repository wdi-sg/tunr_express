console.log('script is being served')

const visits = parseInt(document.querySelector('#visits').getAttribute('data-visits'));

const newBadge = document.createElement('img');
	newBadge.src = "https://image.flaticon.com/icons/svg/891/891448.svg";
	newBadge.width = 100;

const fiveBadge = document.createElement('img');
	fiveBadge.src = "https://www.flaticon.com/premium-icon/icons/svg/1910/1910584.svg";
	fiveBadge.width = 100;

const tenBadge = document.createElement('img');
	tenBadge.src = "https://image.flaticon.com/icons/svg/2471/2471722.svg";
	tenBadge.width = 100;

if (visits === 1) {
	document.querySelector('#visits').appendChild(newBadge);
} else if (visits > 1 && visits < 10) {
	document.querySelector('#visits').appendChild(fiveBadge);
} else if (visits >= 10) {
	document.querySelector('#visits').appendChild(tenBadge);
}
