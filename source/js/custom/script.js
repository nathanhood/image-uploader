Wee.routes.map({
	'$root': 'common',
	'$any': function() {
		Wee.upload.init({
			maxFileSize: 10,
			minImageHeight: 600,
			minImageWidth: 600
		});
	}
});

Wee.ready('routes:run');