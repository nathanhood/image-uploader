Wee.fn.make('imageValidation', {
	init: function(conf) {
		this.conf = conf;
	},
	type: function(file) {
		// Validate file type
		if (file.type.indexOf('image') === -1) {
			return 'File is not an image.';
		}

		return true;
	},
	fileSize: function(file) {
		var maxFileSize = this.convertToBytes(this.conf.maxFileSize, this.conf.maxFileSizeUnit);

		// Validate image size
		if (file.size > maxFileSize) {
			return 'This file is too large. Maximimum file size is ' + this.conf.maxFileSize + 'Mb';
		}

		return true;
	},
	dimensions: function(width, height) {
		var minHeight = this.conf.minImageHeight,
			minWidth = this.conf.minImageWidth;

		if (width < minWidth || height < minHeight) {
			return 'Image must be at least ' + minWidth + ' x ' + minHeight + ' pixels';
		}

		return true;
	},
	convertToBytes: function(value, unit) {
		unit = unit.toLowerCase();

		if (unit === 'kb') {
			value = value * 1000;
		} else if (unit === 'mb') {
			value = value * 1000000;
		}

		return value;
	}
});