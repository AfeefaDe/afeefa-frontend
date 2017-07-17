qx.Class.define("AreaView", {
	
	extend : View,
	type: "singleton",

	construct: function(){
		var that = this;

		that.setViewId('areaView');
	},

	members : {
		
		render: function(){
			var that = this;

			// view container
			that.view = $("<div />")
				.attr('id', that.getViewId())
				.hover(
					function(){
						that.open();
					},
					function(){
						that.close();
					}
				);

			$('#main-container').append(that.view);

			this.base(arguments);
			
			that.load();
		},

		load: function(){
			var that = this;

			that.view.empty();

			// that.createTooltip(
   //      that.view,
   //      function(){
   //        return that.getWording('areaselection.button');
   //      }(),
   //      'hover',
   //      'top',
   //      'desktop'
   //    );

      _.each( APP.getData().areas, function(value, key){
				var item = $("<div />")
					.addClass('area-btn')
					.append(value.label)
					.click(function(){
						that.close();

						// sessionStorage.setItem("languageFrozen", 1);

						// change area if different from currently selected one
						if( value != APP.getArea() ){
							APP.setArea(value);
							that.say('areaChanged', APP.getArea());
							that.load();
						}
					});
				
				if( value == APP.getArea() ) item.addClass('active');

				that.view.append(item);
			});
		},

		open: function( cb ){
			var that = this;

			that.isActive(true);
			that.view.addClass('active');
		},

		addEvents: function(){
			var that = this;

			// call superclass
			this.base(arguments);
		},

		reset: function(){
			var that = this;
		},

		changeLanguage: function(){
			var that = this;
		},

		close: function(){
			var that = this;
			
			that.view.removeClass('active');
			that.isActive(false);
		}
	}

});