Backbone.puree = function (config) {
	var mix = function (prototype, mixins) {
		mixins.unshift(prototype);
		_.extend.apply(_, mixins);
	};

	if (config.all) {
		config.view = config.view || [];
		config.collection = config.collection || [];
		config.model = config.model || [];

		config.view = config.view.concat(config.all);
		config.collection = config.collection.concat(config.all);
		config.model = config.model.concat(config.all);
	}

	_.each(config.view, function (mixin) {
		Backbone.mixin(Backbone.View, mixin);
	});

	_.each(config.collection, function (mixin) {
		Backbone.mixin(Backbone.Collection, mixin);
	});

	_.each(config.model, function (mixin) {
		Backbone.mixin(Backbone.Model, mixin);
		if (Backbone.DeepModel) {
			Backbone.mixin(Backbone.DeepModel, mixin);
		}
	});
};