
wedding = wedding || {};
wedding.modules = wedding.modules || {};

wedding.modules.Content = function() {

	var that = this;

	var timeOfEvent = wedding.constants.Main.TIME_OF_EVENT;

	var backgrounds = wedding.constants.Main.BACKGROUNDS;

	var populateNavigation = function() {
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

	this.showSectionsBackground = function(subject) {
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

	this.hideSectionsBackground = function() {
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

