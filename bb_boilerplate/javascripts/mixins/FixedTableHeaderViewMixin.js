(function (Mixins) {
    Mixins.FixedHeaderTableViewMixin = {
        fixFooter: false,
        fixHeight: 600,
        minRows: 20,

        resetTable: function () {
            if (!this.$rows || this.$rows.length <= this.minRows) {
                return;
            }

            var $tfoot = $(this.$("tbody tr", this.grid)[this.$rows.length - 1]);

            // reset table to default
            this.$("thead tr", this.grid).css({ display: "table-row", float: "none", "overflow-y": "hidden" });
            this.$("tbody tr", this.grid).css({ display: "table-row", float: "none" });
            this.$("tbody", this.grid).css({ display: "table-row-group", float: "none", "overflow-y": "hidden", height: "auto" });
            this.grid.css('height', 'auto');
            $tfoot.css({ position: "relative", "overflow-y": "none", top: "auto" });

            clearTimeout(this.resetTableTimer);
            this.resetTableTimer = setTimeout(this.fixTableHeader, 200);
        },

        fixTableHeader: function () {
            this.grid = this.$('.grid');
            this.$rows = this.$("tbody tr", this.grid);
            var $tfoot = $(this.$("tbody tr", this.grid)[this.$rows.length - 1]);

            if (!this.$rows || this.$rows.length <= this.minRows) {
                return;
            }

            // set up table for calculation
            this.grid.css({ "overflow-y": "scroll", position: 'relative' });
            this.grid.addClass('fix-header');

            // get all necessary variables
            var tbodyFixedHeight = this.fixHeight;
            var tbodyHeight = this.$("tbody", this.grid).height();
            var theadHeight = this.$("thead", this.grid).height();
            var tfootHeight = $tfoot.height();

            // create dynamic style definition
            var css = '';

            this.$("thead th", this.grid).each(function (idx) {
                var $th = $(this);
                var w = $th.width();
                css += '.fixheader-style-col-' + idx + ' { width: ' + w + 'px; } .fix-header td { padding: 5px; } .fix-header th { padding: 5px; }';
            });

            $('head style#fixheader-style-css').remove();
            $('<style id="fixheader-style-css" type="text/css">' + css + '</style>').appendTo("head");

            // calculate
            var self = this;
            this.$("thead th", this.grid).each(function (idx) {
                var th = this;
                $(th).addClass('fixheader-style-col-' + idx);

                self.$("tbody tr", self.grid).each(function () {
                    $($('td', $(this))[idx]).addClass('fixheader-style-col-' + idx);
                })
            });

            // set up table to fix tbody part
            this.grid.css({ "overflow-y": "hidden" });
            this.$("thead tr", this.grid).css({ display: "block", float: "left", "overflow-y": "scroll" });
            this.$("tbody", this.grid).css({ display: "block", float: "left", "overflow-y": "scroll", height: tbodyFixedHeight + "px" });

            if (this.fixFooter) {
                this.grid.height(theadHeight + tbodyFixedHeight + tfootHeight);
                $tfoot.css({ position: "absolute", "overflow-y": "scroll", top: (tbodyFixedHeight + theadHeight) + "px" });
            }
            else {
                this.grid.height(theadHeight + tbodyFixedHeight);
            }
        }

	};
})(module('Mixins'));