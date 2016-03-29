
var objectInitializer = function(parentElement) {
	var wrappers = $(parentElement).find('[package]');
	for(var i = 0, len = wrappers.length; i < len; i++) {
		var packageName = $(wrappers[i]).attr('package');
		var className = $(wrappers[i]).attr('class');
		var objectName = packageName + '.' + className;
		var object = null;
		eval('object = ' + objectName + ';');
		if(object != null) {
			(function(wrapper, objectName) {
				$.ajax({
					url: 'templates/' + objectName.replace(/\./g,'/') + '.html'
				}).done(function(dom) {
					$(wrapper).html(dom);
					objectInitializer($(wrapper));
				});
			})(wrappers[i], objectName);
		}
	}
};

$(document).ready(function() {
	// Load modules and widgets
	objectInitializer($('body'));
});

