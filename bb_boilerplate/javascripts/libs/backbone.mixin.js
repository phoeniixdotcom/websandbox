Backbone.mixin = function (obj, mixin) {
	if (!obj)
		throw new Error('Backbone.mixin: The backbone component specified is undefined.');
	
	if (!mixin)
		throw new Error('Backbone.mixin: The mixin specified is undefined.');

	var source = obj.prototype || obj;

	// merge all properties in the mixin into the view's prototype
	_.defaults(source, mixin);
	
	// merge object literal properties (ensure's events, bindings, and channels)
	_.each(['events', 'bindings', 'attributes'], function (key) {
		if (mixin[key]) {
			if (source[key]) {
				_.defaults(source[key], mixin[key]);
			} else {
				source[key] = mixin[key];
			}
		}
	});

	_.each(['tagName'], function (key) {
		if (mixin[key] && mixin[key] != Backbone.View.prototype[key] && source[key] == Backbone.View.prototype[key]) {
			source[key] = mixin[key];
		}
	});
	
	// setup render chain
	if (mixin.render) {
		var oldRender = source.render;
		source.render = function () {
			mixin.render.apply(this, arguments);
			var retVal = oldRender.apply(this, arguments);
			if (retVal) {
				return retVal;
			}

			return this;
		};
	}

	// setup initialize chain
	if (mixin.initialize) {
		var oldInitialize = source.initialize;
		
		source.initialize = function () {
			mixin.initialize.apply(this, arguments);
			oldInitialize.apply(this, arguments);
		};
	}

	// setup post-initialize chain
	if (mixin.postInitialize) {
		oldInitialize = source.initialize;
		source.initialize = function () {
			oldInitialize.apply(this, arguments);
			mixin.postInitialize.apply(this, arguments);
		};
	}
	
	// setup remove chain
	if (mixin.remove) {
		var oldRemove = source.remove;
		source.remove = function () {
			mixin.remove.apply(this, arguments);
			oldRemove.apply(this, arguments);
		};
	}

	// setup post-remove chain
	if (mixin.postRemove) {
		oldRemove = source.remove;
		source.remove = function () {
			oldRemove.apply(this, arguments);
			mixin.postRemove.apply(this, arguments);
		};
	}
}