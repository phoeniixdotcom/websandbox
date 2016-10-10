(function (Mixins) {
	// For use with https://github.com/thedersen/backbone.validation
    Mixins.ValidatingTooltipViewMixin = {
        postInitialize: function() {
            if (this.model || this.collection)
                this.bindValidation();
        },

        bindValidation: function() {
            Backbone.Validation.unbind(this);
            Backbone.Validation.bind(this, {
                forceUpdate: true,
                valid: this.valid,
                invalid: this.invalid
            });
        },
        
        valid: function(view, attr, selector) {
            var $el = view.$('[' + selector + '~="' + attr + '"]');
            
        	  // special handling for ckeditor instances
            if ($el.is('textarea') && !$el.is(':visible') && typeof $el.data('ckeditorInstance') != 'undefined') {
              $('#cke_' + attr).removeClass('invalid').removeAttr('data-original-title').removeAttr('data-error');
              $('#cke_' + attr).tooltip('destroy');
              return;
            }

            if ($el.hasClass('tooltip-in-table-cell')) {
                $el.parent().removeClass('invalid').removeAttr('data-original-title').removeAttr('data-error');
                $el.removeClass('invalid').removeAttr('data-original-title').removeAttr('data-error').tooltip('destroy');
                return;
            }

            if (!$el.length) { // This might be called if we moved a DOM element outside of our Backbone view (e.g. to make a modal not constrained by its container)
                $el = $('.modal-wrapper [' + selector + '~="' + attr + '"]');
            }

            if ($el.length) {
                if ($el.is('select')) {
                    var select2Data = $el.data('select2');
                    var select2Container = $(select2Data.containerSelector);
                    select2Container.removeAttr('data-original-title').tooltip('destroy');
                    select2Container.children('.select2-choice').removeClass('invalid');
                } else {
                    $el.removeClass('invalid').removeAttr('data-original-title').removeAttr('data-error');
                    $el.tooltip('destroy');
                }
            } else { // It's not a form input, it's a validation error element.  Set html based on id
                $el = view.$('#' + attr);
                if ($el.hasClass('validation-error')) {
                    $el.hide();
                }
            }
        },
        
        invalid: function(view, attr, error, selector) {
            var $el = view.$('[' + selector + '~="' + attr + '"]');
            
			      // special handling for ckeditor instances
            if ($el.is('textarea') && !$el.is(':visible') && typeof $el.data('ckeditorInstance') != 'undefined') {
                $('#cke_'+attr).addClass('invalid').attr('data-original-title', error).attr('data-error', error).tooltip();
            	return;
            }

            if ($el.hasClass('tooltip-in-table-cell')) {
                $el.parent().addClass('invalid').attr('data-original-title', error).attr('data-error', error);
                $el.addClass('invalid').attr('data-original-title', error).attr('data-error', error).tooltip();
                return;
            }

            if (!$el.length) { // This might be called if we moved a DOM element outside of our Backbone view (e.g. to make a modal not constrained by its container)
                $el = $('.modal-wrapper [' + selector + '~="' + attr + '"]');
            }
            
            if ($el.length) {
                if ($el.is('select')) {
                    var select2Data = $el.data('select2');
                    var select2Container = $(select2Data.containerSelector);
                    select2Container.attr('data-original-title', error).tooltip();
                    select2Container.children('.select2-choice').addClass('invalid');
                } else {
                    $el.addClass('invalid').attr('data-original-title', error).attr('data-error', error).tooltip();
                }
            } else { // It's not a form input, it's a validation error element.  Set html based on id
                $el = view.$('#' + attr);
                if ($el.hasClass('validation-error')) {
                    $el.html(error).show();
                }
            }
        }
    };
})(module('Mixins'));