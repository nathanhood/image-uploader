/* global Darkroom */

Wee.fn.extend('upload', {
	init: function(options) {
		var conf = Wee.$extend(true, {
			maxFileSize: 3,
			maxFileSizeUnit: 'mb',
			minImageHeight: 300,
			minImageWidth: 300,
			$dropZone: $('ref:dropZone'),
			$cancelUpload: $('ref:cancelUpload'),
			request: {
				method: 'post',
				processData: false,
				type: false
			}
		}, options);

		this.$private.image = {};
		this.$private.conf = conf;
		this.$private.validate = new Wee.fn.imageValidation();
		this.$private.validate.init(conf);
		this.$private.bindEvents();
	}
}, {
	bindEvents: function() {
		Wee.events.on({
			'ref:dropZone': {
				dragover: this.hoverDropZone,
				dragleave: this.leaveDropZone,
				drop: this.load,
				click: this.openFileDialog
			},
			'ref:dropZoneInput': {
				change: this.load
			},
			'ref:cancelUpload': {
				click: this.destroyImage
			}
		});
	},

	// Event callbacks
	hoverDropZone: function(e) {
		var scope = Wee.upload.$private;

		// Stop default behaviors for file drag and drop
		e.stopPropagation();
		e.preventDefault();

		scope.conf.$dropZone.addClass('-hover');
	},
	leaveDropZone: function() {
		var scope = Wee.upload.$private;

		scope.conf.$dropZone.removeClass('-hover');
	},
	load: function(e) {
		var scope = Wee.upload.$private,
			files = e.target.files || e.dataTransfer.files;

		// Stop browser from loading image as new url
		e.stopPropagation();
		e.preventDefault();

		// Remove hover styling
		scope.leaveDropZone();

		scope.image.file = files[0];
		scope.parseFile(files[0]);
	},
	openFileDialog: function() {
		$(this).siblings('ref:dropZoneInput')[0].click();
	},
	destroyImage: function() {
		var scope = Wee.upload.$private,
			$dropZone = scope.conf.$dropZone,
			$cancel = scope.conf.$cancelUpload;

		if (scope.editor) {
			scope.editor.selfDestroy();
		}

		$dropZone.siblings('img').remove();
		$dropZone.activate();
		$cancel.deactivate();
	},

	// Image processing
	parseFile: function(file) {
		var isValid = this.validate.type(file),
			reader;

		// Ensure that file is an image
		if (isValid !== true) {
			this.notify(isValid, 'error');

			return false;
		}

		reader = new FileReader();
		reader.onload = this.processImage;
		reader.readAsDataURL(file);
	},
	processImage: function(e) {
		var scope = Wee.upload.$private,
			fileSize = e.loaded,
			image = new Image();

		// Set properties on new image
		image.className = 'upload__image';
		image.dataset.ref = 'uploadedImage';

		image.onload = function() {
			var isValid = scope.validateImage(fileSize, this.width, this.height);

			if (isValid !== true) {
				// TODO: Clarify how error notifications should be implemented
				scope.notify(isValid, 'error');
			}

			scope.image.width = this.width;
			scope.image.height = this.height;

			scope.initImageEditor(this);
		};

		// Load new image
		image.src = e.target.result;
	},
	initImageEditor: function(image) {
		var scope = this,
			$dropZone = this.conf.$dropZone,
			$cancel = this.conf.$cancelUpload;

		// Hide drop zone/show cancel button
		$dropZone.deactivate();
		$dropZone.after(image);
		$cancel.activate();

		this.editor = new Darkroom(image, {
			// Canvas initialization size
			maxWidth: 500,
			maxHeight: 500,
			plugins: {
				crop: {
					// TODO: Calculate minWidth dimensions based on rendered width of canvas / minWidth config param
					// TODO: Show actual pixel dimensions on corner of crop container?
					minWidth: 50,
					// TODO: Figure out how to modify ratio after initialization
					ratio: 1
				},
				save: {
					callback: function() {
						// TODO: Finish save callback method
						//this.darkroom.selfDestroy();
						//console.log(this.darkroom.sourceImage.toDataURL());
						//console.log(this.darkroom.containerElement);
						//$.remove(this.darkroom.containerElement);

						// TODO: Validate changes - min width
						// TODO: How to post image over AJAX when submitted?
						// TODO: Show preview size of image with loader showing progress
						// TODO: Give ability to edit again?
						scope.save();
					}
				}
			}
		});
	},
	save: function() {
		var data = new FormData();

		data.append('file-0', this.image.file);
		data.append('width', this.image.width);
		data.append('height', this.image.height);

		this.conf.request.data = data;

		Wee.data.request(this.conf.request);
	}
});