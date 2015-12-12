Wee.fn.extend('upload', {
	init: function(options) {
		var conf = Wee.$extend({
			maxFileSize: 3,
			maxFileSizeUnit: 'mb',
			minImageHeight: 300,
			minImageWidth: 300
		}, options);

		this.$private.conf = conf;

		// Bind all events
		Wee.events.on({
			'ref:dropZone': {
				dragover: this.$private.hoverDropZone,
				dragleave: this.$private.leaveDropZone,
				drop: this.$private.dropFile
			}
		});
	}
}, {
	_construct: function() {
		this.$dropZone = $('ref:dropZone');
	},
	hoverDropZone: function(e) {
		var scope = Wee.upload.$private;

		// Stop default behaviors for file drag and drop
		e.stopPropagation();
		e.preventDefault();

		scope.$dropZone.addClass('-hover');
	},
	leaveDropZone: function() {
		var scope = Wee.upload.$private;

		scope.$dropZone.removeClass('-hover');
	},
	dropFile: function(e) {
		var scope = Wee.upload.$private,
			files = e.target.files || e.dataTransfer.files;

		// Stop default behaviors for file drag and drop
		e.stopPropagation();
		e.preventDefault();

		// Remove hover styling
		scope.leaveDropZone();

		// Process all File objects
		for (var i = 0; i < files.length; i++) {
			scope.parseFile(files[i]);
		}
	},
	parseFile: function(file) {
		var isValid = this.validateType(file),
			reader;

		// Ensure that file is an image
		if (isValid !== true) {
			this.notify(isValid, 'error');

			return false;
		}

		reader = new FileReader();
		reader.onload = this.fileReaderOnload;

		// Load image
		reader.readAsDataURL(file);
	},
	fileReaderOnload: function(e) {
		var scope = Wee.upload.$private,
			image = new Image();

		image.className = 'upload__image';
		image.dataset.ref = 'uploadedImage';

		image.onload = function() {
			// TODO: May want to consolidate all validation together
			var isValid = scope.validateDimensions(this.width, this.height);

			if (isValid === true) {
				$('ref:uploadDetails').append(this);
			} else {
				scope.notify(isValid, 'error');
			}
		};

		image.src = e.target.result;
	},
	notify: function(message) {
		// TODO: Set styling classes based on success or failure (type) boolean
		$('ref:uploadNotify').text(message);
	}
});