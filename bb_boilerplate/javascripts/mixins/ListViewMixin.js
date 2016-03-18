(function (Mixins) {
	// usage: 
	//     var MyListView = Backbone.View.extend({
	//         listItemView: MyListItemView,
	//
	//         // optional: Causes list item views to be appended to this.$(this.dataSelector + ' ' + this.containerSelector) 
	//		   // instead of this.$(this.dataSelector)
	//         // This is useful for setting $el to a table and appending to the tbody
	//         containerSelector: 'tbody', 
	//     });
	//     
	//     Backbone.mixin(MyView, ListViewMixin);

	Mixins.ListViewMixin = {
		insertMethod: 'append', // DOM insertion method. valid values are 'append' or 'prepend'
		listSelector: '.list', // selector for entire list. required if scrollableList is true.
		loadingSelector: '.loading', // selector for the element that contains the loading indicator.
		contentSelector: '.content', // selector for container of .data and .no-data elements.
		dataSelector: '.data', // selector for the element where data will be appended
		noDataSelector: '.no-data', // selector for the element stating no data to show
		scrollableList: false, // contains list in a scrollable area. must have an element matching listSelector to use this.
		hideLoadingOnInitialize: true, // hides loading on view init
		
		initialize: function () {
			if (!this.collection) {
				throw new Backbone.Error('ListView: A collection must be specified', this);
			}
			
			this.listenTo(this.collection, 'remove', this.setVisibility);
			this.listenTo(this.collection, 'reset', this.setVisibility);
			this.listenTo(this.collection, 'reset', this.render);
			this.listenTo(this.collection, 'sync', this.render);
			this.listenTo(this.collection, 'add', this.renderItem);

			if (this.hideLoadingOnInitialize)
				this.toggleLoading('hide');
		},
		
		render: function () {
			var self = this;

			self.toggleLoading('hide');

			if (self.collection.length === 0) {
				self.toggleContent('show');
				self.toggleNoData('show');
				return self.toggleData('hide');
			}

			if (self.scrollableList) {
				if (self.$(self.dataSelector).is('table')) {
					self.$(self.dataSelector).scrollTableBody({ rowsToDisplay: 3 });
				} else {
					self.$(self.listSelector).addClass('scrollable-content');
				}
			}

			if (self.preRender && _.isFunction(self.preRender)) {
				self.preRender();
			}

			self.getDataElement().empty();
			
			self.collection.each(function (model, index) {
			    model.set({ loopRenderIndex: index });
				self.renderItem(model);
			});
			
			if (self.postRender && _.isFunction(self.postRender)) {
				self.postRender();
			}
			
			return self;
		},

		renderItem: function (model, viewOptions) {
			var view;
			this._itemViews = this._itemViews || [];

			if (!this.listItemView) throw new Backbone.Error('listItemView property must be set.', this);

			if (viewOptions && viewOptions._prepareModel) viewOptions = {};
			viewOptions = _.extend({ model: model }, viewOptions || {});

			view = new this.listItemView(viewOptions);

			view.list = this;
			this._itemViews.push(view);
			
			this.getDataElement()[this.insertMethod](view.render().el);

			this.setVisibility();
			this.toggleNoData('hide');
			this.toggleData('show');
			this.toggleContent('show');
		},
		
		toggleLoading: function (method) {
			this.$(this.loadingSelector)[method]();
			return this;
		},
		
		toggleContent: function (method) {
			this.$(this.contentSelector)[method]();
			return this;
		},

		toggleNoData: function (method) {
			this.$(this.noDataSelector)[method]();
			return this;
		},
		
		toggleData: function (method) {
			this.$(this.dataSelector)[method]();
			return this;
		},

		toggleList: function (method) {
			this.$(this.listSelector)[method]();
			return this;
		},

		setVisibility: function () {
			if (this.autoHide) {
				if (this.collection.length === 0) {
					this.$el.hide();
				} else {
					this.$el.show();
				}
			}
		},
		
		remove: function () {
			_.each(this._itemViews, function (view) {
				view.remove();
			});
			Backbone.View.prototype.remove.call(this);
		},

		getDataElement: function () {
			if (this.containerSelector) {
				if (this.dataSelector)
					return this.$(this.dataSelector + ' ' + this.containerSelector);
				else
					return this.$(this.containerSelector);
			} else if (this.dataSelector) {
				return this.$(this.dataSelector);
			} else {
				return this.$el;
			}
		}
	};
})(module('Mixins'));