
var main = {
	timeOfEvent : new Date("2016/10/16 16:00:00 GMT-0700 (PDT)"),

	secondsUntilEvent : function() {
		var curr = new Date();
		if(curr.getTime() < main.timeOfEvent.getTime()) {
			return Math.floor((main.timeOfEvent.getTime() - curr.getTime()) / 1000);
		}

		return 0;
	},

	populateNavigation : function() {
		var ul = $("div.header ul.sections");
		var sections = $("div.content div.sections > div");
		for(var i = 0, len = sections.length; i < len; i++) {
			var words = $(sections[i]).attr('name').split('_');
			var capitalized = [];
			for(var j = 0, count = words.length; j < count; j++) {
				capitalized[j] = words[j].charAt(0).toUpperCase() + words[j].slice(1);
			}
			var title = capitalized.join(' ');
			$(ul).append($('<li />').attr('name', $(sections[i]).attr('name')).html(title));
		}

		$(ul).click(function(e) {
			if($(e.target).is('li')) {
				var name = $(e.target).attr('name');
				var subject = $('div.content div.sections > div[name*="' + name + '"]');
				var bkgr = $('div.content div.sections');
				if(subject && $(subject).is('div')) {
					// Subject is found, we should show this.
					if($(subject).css('display') == 'none') {
						$('div.content div.sections > div').css('display','none');
						if($(bkgr).css('display') == 'none') {
							$(bkgr).css('width','700px').css('height','1px').css('display','block').animate({
								height: '400px'
							}, 1000, function() {
								$(subject).css('display','block');
							});
						} else {
							$(subject).css('display','block');
						}
					}
				} else {
					$('div.content div.sections > div').css('display','none');
					if($(bkgr).css('display') == 'block') {
						$(bkgr).animate({
							height: '1px'
						}, 1000, function() {
							$(bkgr).css('display','none');
						});
					}
				}
			}
		});
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

	main.populateNavigation();
});