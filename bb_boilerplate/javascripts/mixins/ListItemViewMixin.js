(function (Mixins) {
	Mixins.ListItemViewMixin = {
		tagName: 'tr',
		highlightClass: 'warning',
		inEditMode: false,
		
		events: {
			'click .edit': 'edit',
			'click .remove': 'removeItem',
		},

		initialize: function () {
			_.bindAll(this);

			if (this.options.template) {
				this.template = _.isFunction(this.options.template)
					? this.options.template
					: _.template($(this.options.template).html());
			} else if (this.template) {
				this.template = _.isFunction(this.template)
					? this.template
					: _.template($(this.template).html());
			}
			
			if (this.options.formView) {
				this.formView = this.options.formView;
			}

			if (this.options.highlightClass) {
				this.highlightClass = this.option.highlightClass;
			}

			this.listenTo(this.model, 'destroy', this.destroy);
			this.listenTo(this.model.collection, 'reset', this.destroy);
			this.bindSubscriptions();
		},

		render: function () {
			if (!this.inEditMode) {
				if (!this.template)
					throw new Backbone.Error('The template must be specified.', this);
				this.$el.html(this.template(this.model.attributes));
				this.delegateEvents();
				if (this.bindings) {
					this.stickit();
				}

				if (this.postRender && _.isFunction(this.postRender)) {
					this.postRender();
				}

				return this;
			}
		},

		edit: function (e) {
			e.preventDefault();
			if (!this.formView)
				throw new Backbone.Error('The formView must be specified.', this);
			
			this.$el.addClass(this.highlightClass);

			if (Backbone.View.prototype.Create)
				this.form = Backbone.View.Create(this.formView, {
					el: this.$el,
					model: this.model
				});
			else
				this.form = new this.formView({
					el: this.$el,
					model: this.model
				});

			this.inEditMode = true;
			this.listenTo(this.form, 'edit.complete', this.completeEdit);
		},

		completeEdit: function () {
			this.stopListening(this.form);
			this.form.destroy('soft');
			this.form = undefined;
			this.inEditMode = false;
			this.render();
			this.$el.removeClass(this.highlightClass);
		},

		removeItem: function (e) {
			e.preventDefault();

			this.$el.addClass(this.highlightClass);
			if (confirm('Remove this item?')) {
				this.model.destroy();

				if (this.postRemoveItem && _.isFunction(this.postRemoveItem)) {
				    this.postRemoveItem();
				}

            } else {
				this.$el.removeClass(this.highlightClass);
			}
		}
	};
})(module('Mixins'));