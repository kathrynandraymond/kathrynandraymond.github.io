
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
	setInterval(function() {
		var secondsRemaining = main.secondsUntilEvent();
		if(secondsRemaining > 0) {
			var daysRem = Math.floor(secondsRemaining / (24 * 60 * 60));
			secondsRemaining %= (24 * 60 * 60);
			if($.trim($(".timeunit.day").html()) != daysRem + '') {
				$('.timeunit.day').html(daysRem);
			}

			var hrsRem = Math.floor(secondsRemaining / (60 * 60));
			secondsRemaining %= (60 * 60);
			if($.trim($('.timeunit.hour').html()) != hrsRem) {
				$('.timeunit.hour').html(hrsRem);
			}

			minRem = Math.floor(secondsRemaining / 60);
			secondsRemaining %= 60;
			if($.trim($('.timeunit.minute').html()) != minRem) {
				$('.timeunit.minute').html(minRem);
			}

			if($.trim($('.timeunit.second').html()) != secondsRemaining) {
				$('.timeunit.second').html(secondsRemaining);
			}
		}
	}, 1000);
});