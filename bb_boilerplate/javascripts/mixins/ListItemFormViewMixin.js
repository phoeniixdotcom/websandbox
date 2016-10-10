(function (Mixins) {
	Mixins.ListItemFormViewMixin = {
		events: {
			'click .save': 'completeEdit',
			'click .cancel': 'cancel',
		},

		initialize: function () {
			if (this.options.template) {
				this.template = _.isFunction(this.options.template)
					? this.options.template
					: _.template($(this.options.template).html());
			} else if (this.template) {
				this.template = _.isFunction(this.template)
					? this.template
					: _.template($(this.template).html());
			}

			this.model.on('change:TransactionCode', this.setTransactionCodeLabel, this);
			this.model.on('change:PaymentCode', this.setPaymentCodeLabel, this);

			this.originalAttributes = this.model.toJSON();
			this.render();
		},

		render: function () {
			this.$el.empty().html(this.template(this.model.attributes));
			this.$('.dropdown-select2').select2();
			this.$('.date-picker').datepicker();
			this.$('.autonumeric').autoNumeric();
			this.stickit();
		},

		completeEdit: function (e) {
			e.preventDefault();
			this.trigger('edit.complete');
		},

		cancel: function (e) {
			this.model.set(this.originalAttributes);
			this.completeEdit(e);
		}
	};
})(module('Mixins'));