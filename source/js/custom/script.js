Wee.routes.map({
	'$root': 'common',
	'$any': function() {
		Wee.imageUpload.init({
			maxFileSize: 10,
			minImageHeight: 600,
			minImageWidth: 600,
			request: {
				url: '/upload.php',
				success: function(data) {
					console.log(data);
				}
			}
		});
	}
});

Wee.ready('routes:run');