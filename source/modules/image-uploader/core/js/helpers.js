Wee.fn.extend('upload', {}, {
	validateImage: function(size, width, height) {
		var sizeIsValid = this.validate.fileSize(size),
			dimIsValid = this.validate.dimensions(width, height);

		if (! sizeIsValid) {
			return sizeIsValid;
		} else if (! dimIsValid) {
			return dimIsValid;
		}

		return true;
	},
	notify: function(message) {
		// TODO: Set styling classes based on success or failure (type) boolean
		$('ref:uploadNotify').text(message);
	}
});