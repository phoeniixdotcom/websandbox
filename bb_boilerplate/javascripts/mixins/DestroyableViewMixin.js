(function (Mixins) {
	Mixins.DestroyableViewMixin = {
		destroy: function (soft) {
			if (Backbone.Validation) Backbone.Validation.unbind(this);
			if (_.isFunction(this.unbindSubscriptions)) this.unbindSubscriptions();

			this.undelegateEvents();
			this.$el.removeData().unbind();

			// soft destroy removes all handlers and empties el without removing it
			if (soft) {
				this.$el.empty();
			} else {
				this.remove();
				Backbone.View.prototype.remove.call(this);
			}
		}
	};
})(module('Mixins'));