
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
				if(subject && $(subject).is('div')) {
					// Subject is found, we should show this.
					main.showSectionsBackground(subject);
				} else {
					main.hideSectionsBackground();
				}
			}
		});
	},

	idealOpacity: 0.9,

	showSectionsBackground : function(subject) {
		var bkgr = $('div.content div.sections');
		if($(bkgr).css('opacity') == main.idealOpacity && $(bkgr).css('display') == 'block') {
			if($(subject).css('display') != 'block') {
				$('div.content div.sections > div').css('display', 'none');
				$(subject).css('display', 'block');
			}
		} else {
			$('div.content div.sections > div').css('display', 'none');
			$(bkgr).css('opacity', 0).css('display', 'block').animate({
				opacity: main.idealOpacity
			}, 1000, function() {
				$(subject).css('display', 'block');
			});
		}
	},

	hideSectionsBackground : function() {
		$('div.content div.sections > div').css('display','none');
		$('div.content div.sections').css('opacity', main.idealOpacity).animate({
			opacity: 0
		}, 1000, function() {
		
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

	main.populateNavigation();
});