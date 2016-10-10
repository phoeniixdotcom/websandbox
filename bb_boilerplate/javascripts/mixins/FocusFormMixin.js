(function (Mixins) {
	Mixins.FocusFormViewMixin
	 = {
		postInitialize: function () {
			if (this.options.firstInput) this.firstInput = this.options.firstInput;

			if (this.firstInput && !this.firstInput.skipFocusOnInit) {
				this.focus();
			}
		},

		focus: function () {
			if (this.firstInput) {
				if (typeof this.firstInput === 'string') {
					this.firstInput = { selector: this.firstInput };
				}
				var input = this.$(this.firstInput.selector);
				if (input.is(':visible')) {
					var select2Data = input.data('select2');
					if (select2Data) {
						$(select2Data.containerSelector).find('input.select2-focusser').focus();

						// select2 likes to apply the active class to too many containers.
						// sanity check to remove it and make sure only the one we want has it.
						//$('.select2-container').removeClass('.select2-container-active');
						//$('s2id_' + input.attr('id')).addClass('.select2-container-active');
					} else {
						if (input.val()) {
							input.select();
						}
						input.focus();
					}
				}
			}
		}
	};
	
	if (Backbone.View.prototype.stickit) {
		var originalStickit = Backbone.View.prototype.stickit;
		Backbone.View.prototype.stickit = function () {
			originalStickit.apply(this, arguments);

			if (this.firstInput && !this.firstInput.skipFocusOnStickit && this.focus) {
				this.focus();
			}
		};
	}
})(module('Mixins'));