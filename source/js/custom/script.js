// Add custom JavaScript here
// Route documentation available at https://www.weepower.com/script/routes

Wee.routes.map({
	'$root': 'common',
	'$any': 'upload'
});

Wee.ready('routes:run');