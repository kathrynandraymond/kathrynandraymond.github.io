var Wedding = Wedding || {};
Wedding.widgets = Wedding.widgets || {};

Wedding.widgets.Countdown = function(timeOfEvent) {

	that = this;

	that.init = function() {
		setInterval(function() {
			var currently = new Date();
	
			/********************************************************************************
					2016/10/16 16:00:00
				 -  YYYY/MM/DD HH:MI:SS
				 ______________________
				 ?
			 ********************************************************************************/
	
			if(currently.getTime() < timeOfEvent.getTime()) {
				var secondsRemaining = timeOfEvent.getSeconds() - currently.getSeconds();
				var minutesRemaining = timeOfEvent.getMinutes() - currently.getMinutes();
				var hoursRemaining = timeOfEvent.getHours() - currently.getHours();
				var daysRemaining = timeOfEvent.getDate() - currently.getDate();
				var monthsRemaining = timeOfEvent.getMonth() - currently.getMonth();
	
				if(secondsRemaining < 0) {
					minutesRemaining--;
					secondsRemaining += 60;
				}
				if(minutesRemaining < 0) {
					hoursRemaining--;
					minutesRemaining += 60;
				}
				if(hoursRemaining < 0) {
					daysRemaining--;
					hoursRemaining += 24;
				}
				if(daysRemaining < 0) {
					monthsRemaining--;
					if(currently.getMonth() == 1) {
						daysRemaining += 28;
						if(currently.getYear() % 4 == 0) {
							daysRemaining++;
						}					
					} else if(currently.getMonth() == 3 || currently.getMonth() == 5 ||
						currently.getMonth() == 8 || currently.getMonth() == 10 || currently.getMonth() == 12) {
						daysRemaining += 30;
					} else {
						daysRemaining += 31;
					}
				}
				var yearDiff = timeOfEvent.getFullYear() > currently.getFullYear();
				if(yearDiff > 0) {
					monthsRemaining += (12 * yearDiff);
				}
	
				$('.countdown').show();
	
				var units = $('.countdown > div');
				for(var i = 0, len = units.length; i < len; i++) {
					var val = null;
					if($(units[i]).hasClass('month')) {
						val = monthsRemaining;
					} else if($(units[i]).hasClass('day')) {
						val = daysRemaining;
					} else if($(units[i]).hasClass('hour')) {
						val = hoursRemaining;
					} else if($(units[i]).hasClass('minute')) {
						val = minutesRemaining;
					} else if($(units[i]).hasClass('second')) {
						val = secondsRemaining;
					}
					if(val != null) {
						$(units[i]).find('div:first-child').html(val);
					}
				}
			}
		}, 1000);
	};
};