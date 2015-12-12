Wee.fn.extend('upload', {}, {
	validateType: function(file) {
		var maxFileSize = this.convertToBytes(this.conf.maxFileSize, this.conf.maxFileSizeUnit);

		// Validate file type
		if (file.type.indexOf('image') === -1) {
			return 'File is not an image.';
		}

		// Validate image size
		if (file.size > maxFileSize) {
			return 'This file is too large. Maximimum file size is ' + this.conf.maxFileSize + 'Mb';
		}

		return true;
	},
	validateDimensions: function(width, height) {
		var minHeight = this.conf.minImageHeight,
			minWidth = this.conf.minImageWidth;

		if (width < minWidth || height < minHeight) {
			return 'Image must be at least ' + minWidth + ' x ' + minHeight + ' pixels';
		}

		return true;
	}
});