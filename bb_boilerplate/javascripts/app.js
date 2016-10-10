var App = {},
    initializers = [];

// any app initialization tasks we need to do on every page load occur here.
// app.start() is called in our server side layout.
App.start = function () {
	// change lodash's template delimiters to {{interpolated}} & [[evaluated]]
	_.templateSettings = {
		interpolate: /\{\{(.+?)\}\}/g,
		evaluate: /\[\[(.+?)\]\]/g
	};

	// merge global mixins to native backbone types
	Backbone.puree({
		all: [],
		model: [ Backbone.Validation.mixin ],
		view: [],
		collection: []
	});

	// This handler is in place to make Backbone.Stickit's two way data binding work with placeholder.js for IE 8 & 9
	Backbone.Stickit.addHandler({
		selector: 'textarea, input',
		update: function ($el, val) {
			// because many of our inputs don't specify a type, we need to include the plain "input" selector. this will cause
			// checkboxes and radio buttons to be improperly handled here, so we want to skip executing this code for them, and
			// run their standard update methods instead.
			if ($el.is(':checkbox')) {
				_.findWhere(Backbone.Stickit._handlers,
					function (handler) { return handler.selector === 'input[type="checkbox"]'; }).update($el, val);
				return;
			}
			
			if ($el.is(':radio')) {
				_.findWhere(Backbone.Stickit._handlers,
					function (handler) { return handler.selector === 'input[type="radio"]'; }).update($el, val);
				return;
			}
			
			// Placeholder.js will set the $el's val == to the value of the placeholder attibute for IE 8 & 9.
			// This check prevents two way data binding from overriding the placeholder value when the bound property is empty or undefined.
			// Conditionizr will add the lt-ie10 class to the body tag for IE 8 & 9.
			// Further, we only run this code if the $el in question has a placeholder attribute defined.
			// Lastly, we only want to update the $el's value if the bound property on the model is defined and has a value
			if ($('body.lt-ie10').length && $el.attr('placeholder') && (val === '' || val === undefined)) {
				// we've determined that the browser is IE 8 or 9, a placeholder is defined, and the model's 
				// bound property has no value or is undefined, so we return and don't update the $el's val
				// so that the placeholder remains in place.
				return;
			}
			
			// set the el's value as normal.
			$el.val(val);
		},
		getVal: function ($el) {
			// because many of our inputs don't specify a type, we need to include the plain "input" selector. this will cause
			// checkboxes and radio buttons to be improperly handled here, so we want to skip executing this code for them, and
			// run their standard update methods instead.
			if ($el.is(':checkbox')) {
				return _.findWhere(Backbone.Stickit._handlers, function (handler) {
					return handler.selector === 'input[type="checkbox"]';
				}).getVal($el);
			}

			if ($el.is(':radio')) {
				return _.findWhere(Backbone.Stickit._handlers, function (handler) {
					return handler.selector === 'input[type="radio"]';
				}).getVal($el);
			}

			// This prevents the bound model property from being updated if the $el's val is equal to the $el's placeholder val.
			return $el.val() == $el.attr('placeholder') ? '' : $el.val();
		}
	});

	$(function () {
		_.each(initializers, function (initializer) {
			initializer();
		});
	});
}

App.addInitializer = function(initializer) {
	if (_.isFunction(initializer))
		initializers.push(initializer);
};