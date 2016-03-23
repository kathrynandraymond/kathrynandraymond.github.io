$(document).ready(function() {
	$('.countdown').hide();

	main.populateNavigation();

	var changeBackground = setInterval(function() {

		var currentBkgr = $('.content').css('backgroundImage');
		var currentIndex = -1;
		for(var i = 0, len = backgrounds.length; i < len; i++) {
			if(currentBkgr.indexOf(backgrounds[i]) > 0) {
				currentIndex = i;
				break;
			}
		}
		var switchTo = currentIndex;
		while(switchTo == currentIndex) {
			switchTo = Math.floor(Math.random() * backgrounds.length);
		}

		var differentBackground = 'url("' + backgrounds[switchTo] + '")';
		$('.content').animate({
			backgroundImage: differentBackground
		}, 2000 );
	}, 8000);

	if(backgrounds.length <= 1) {
		cancelInterval(changeBackground);
	}
});