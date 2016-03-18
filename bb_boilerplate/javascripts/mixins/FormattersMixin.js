(function (Mixins) {
	Mixins.FormattersMixin = {
		formatCurrency: function (value) {
			return parseFloat(value).toFixed(2);
		},

		formatDate: function (val) {
			return moment(new Date(val)).format('MM/DD/YYYY');
		}
	};
})(module('Mixins'));