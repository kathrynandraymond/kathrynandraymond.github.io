
var main = {
	timeOfEvent : new Date("2016/10/16 16:00:00 GMT-0700 (PDT)"),

	secondsUntilEvent : function() {
		var curr = new Date();
		if(curr.getTime() < main.timeOfEvent.getTime()) {
			return Math.floor((main.timeOfEvent.getTime() - curr.getTime()) / 1000);
		}

		return 0;
	}
};

$(document).ready(function() {
	$('.countdown').hide();
	setInterval(function() {
		var currently = new Date();
		var secondsRemaining = main.secondsUntilEvent();
		if(secondsRemaining > 0) {
			$('.countdown').show();
			var secondsRemaining = main.timeOfEvent.getSeconds() - currently.getSeconds();
			var minutesRemaining = main.timeOfEvent.getMinutes() - currently.getMinutes();
			var hoursRemaining = main.timeOfEvent.getHours() - currently.getHours();
			var monthsRemaining = main.timeOfEvent.getMonth() - currently.getMonth();
			var yearDiff = main.timeOfEvent.getFullYear() > currently.getFullYear();
			var daysRemaining = main.timeOfEvent.getDate() - currently.getDate();
			if(yearDiff > 0) {
				monthsRemaining += (12 * yearDiff);
			}
			if(daysRemaining < 0) {
				monthsRemaining--;
				if(currently.getMonth() == 0 || currently.getMonth() == 2 || currently.getMonth() == 4 || currently.getMonth() == 6 ||
						currently.getMonth() == 7 || currently.getMonth() == 9 || currently.getMonth() == 11) {
					daysRemaining += 31;
				} else if(currently.getMonth() == 1) {
					daysRemaining += 28;
					if(currently.getYear() % 4 == 0) {
						daysRemaining++;
					}
				} else {
					daysRemaining += 30;
				}
			}

			if(hoursRemaining < 0) {
				daysRemaining--;
				hoursRemaining += 24;
			}

			if(minutesRemaining < 0) {
				hoursRemaining--;
				minutesRemaining += 60;
			}

			if(secondsRemaining < 0) {
				minutesRemaining--;
				secondsRemaining += 60;
			}

			if(monthsRemaining > 1) {
				$('.countdown .month').show();
				if($.trim($('.countdown .month > div').html()) != monthsRemaining) {
					$('.countdown .month > div').html(monthsRemaining);
				}
			} else {
				$('.countdown .month').hide();
			}

			if($.trim($('.countdown .day > div').html()) != daysRemaining) {
				$('.countdown .day > div').html(daysRemaining);
			}

			if($.trim($('.countdown .hour > div').html()) != hoursRemaining) {
				$('.countdown .hour > div').html(hoursRemaining);
			}

			if($.trim($('.countdown .minute > div').html()) != minutesRemaining) {
				$('.countdown .minute > div').html(minutesRemaining);
			}

			if($.trim($('.countdown .second > div').html()) != secondsRemaining) {
				$('.countdown .second > div').html(secondsRemaining);
			}
		}
	}, 1000);
});