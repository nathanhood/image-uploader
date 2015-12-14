Wee.fn.make('extensions', {
	_construct: function() {
		Wee.$chain({
			activate: this.activate,
			deactivate: this.deactivate,
			active: this.active,
			isActive: this.isActive,
			makeNew: this.makeNew
		});
	},
	activate: function() {
		this.addClass('-is-active');

		return this;
	},
	deactivate: function() {
		this.removeClass('-is-active');

		return this;
	},
	active: function() {
		return $.filter(this, '.-is-active');
	},
	isActive: function() {
		return this.hasClass('-is-active');
	}
});