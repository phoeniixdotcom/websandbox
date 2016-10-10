(function (Mixins) {
	Mixins.ShowHideViewMixin = {
		show: function (e) {
			if (e) e.preventDefault();
			this.$el.show();
		},

		hide: function (e) {
			if (e) e.preventDefault();
			this.$el.hide();
		}
	};
})(module('Mixins'))