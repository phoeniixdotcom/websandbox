(function (Mixins) {
	// For use with https://github.com/thedersen/backbone.validation
	Mixins.ValidatingViewMixin = {
		postInitialize: function () {
			if (this.model || this.colelction)
				this.bindValidation();
		},

		bindValidation: function () {
			Backbone.Validation.unbind(this);
			Backbone.Validation.bind(this, {
				forceUpdate: true,
				valid: this.valid,
				invalid: this.invalid
			});
		},

		valid: function (view, attr) {
			var $field = this.$("[name='" + attr + "']"),
				$error = this.$("[data-valmsg-for='" + attr + "']");

			if ($field.length) {
				if ($field.hasClass('dropdown-select2'))
					$field = $field.select2('container');
				$field.removeClass('input-validation-error');
			}
			if ($error.length)
				$error
					.removeClass('field-validation-error')
					.addClass('field-validation-valid')
					.html('')
					.hide();
		},

		invalid: function (view, attr, error) {
			var $field = this.$("[name='" + attr + "']"),
				$error = this.$("[data-valmsg-for='" + attr + "']");

			
			if ($field.length) {
				if ($field.hasClass('dropdown-select2'))
					$field = $field.select2('container');
				$field.addClass('input-validation-error');
			}
			if ($error.length)
				$error
					.removeClass('field-validation-valid')
					.addClass('field-validation-error')
					.html(error)
					.show();
		}
	};
})(module('Mixins'));