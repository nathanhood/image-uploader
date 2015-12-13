Wee.fn.extend('upload', {}, {
	convertToBytes: function(value, unit) {
		unit = unit.toLowerCase();

		if (unit === 'kb') {
			value = value * 1000;
		} else if (unit === 'mb') {
			value = value * 1000000;
		}

		return value;
	},
	notify: function(message) {
		// TODO: Set styling classes based on success or failure (type) boolean
		$('ref:uploadNotify').text(message);
	}
});