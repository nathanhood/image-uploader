Wee.routes.map({
	'$root': 'common',
	'$any': function() {
		Wee.upload.init({
			maxFileSize: 6000,
			minImageHeight: 1500,
			minImageWidth: 2000
		});
	}
});

Wee.ready('routes:run');