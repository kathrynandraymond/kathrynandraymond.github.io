
var main = {
	timeOfEvent : new Date('2016/10/16 16:00:00 GMT-0700 (PDT)'),

	backgrounds : [
		'img/his_hers_original_scale.jpg',
		'img/kathryn_and_me_bigsur.jpg',
		'img/rocky_mountain_natl_park.jpg'
	],


	populateNavigation : function() {
		var ul = $('div.header ul.sections');
		var sections = $('div.content div.sections > div');
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
		var bkgr = $('div.content div.sections');
		$('div.content div.sections > div').css('display','none');
		if($(bkgr).css('display') == 'block' || parseFloat($(bkgr).css('opacity')) > 0) {
			$('div.content div.sections').animate({
				opacity: 0
			}, 1000, function() {
				$(bkgr).css('display', 'none');
			});
		}
	}
};

$(document).ready(function() {
	$('.countdown').hide();
	setInterval(function() {
		var currently = new Date();

		/********************************************************************************
				2016/10/16 16:00:00
			 -  YYYY/MM/DD HH:MI:SS
			 ______________________
			 ?
		 ********************************************************************************/

		if(currently.getTime() < main.timeOfEvent.getTime()) {
			var secondsRemaining = main.timeOfEvent.getSeconds() - currently.getSeconds();
			var minutesRemaining = main.timeOfEvent.getMinutes() - currently.getMinutes();
			var hoursRemaining = main.timeOfEvent.getHours() - currently.getHours();
			var daysRemaining = main.timeOfEvent.getDate() - currently.getDate();
			var monthsRemaining = main.timeOfEvent.getMonth() - currently.getMonth();

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
			var yearDiff = main.timeOfEvent.getFullYear() > currently.getFullYear();
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

	main.populateNavigation();

	var changeBackground = setInterval(function() {

		var currentBkgr = $('.content').css('backgroundImage');
		var currentIndex = -1;
		for(var i = 0, len = main.backgrounds.length; i < len; i++) {
			if(currentBkgr.indexOf(main.backgrounds[i]) > 0) {
				currentIndex = i;
				break;
			}
		}
		var switchTo = currentIndex;
		while(switchTo == currentIndex) {
			switchTo = Math.floor(Math.random() * main.backgrounds.length);
		}

		var differentBackground = 'url("' + main.backgrounds[switchTo] + '")';
		$('.content').animate({
			backgroundImage: differentBackground
		}, 2000 );
	}, 8000);

	if(main.backgrounds.length <= 1) {
		cancelInterval(changeBackground);
	}
});