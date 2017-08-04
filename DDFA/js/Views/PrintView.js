qx.Class.define("PrintView", {
	
	extend : View,
	type: "singleton",

	construct: function(){
		var that = this;

		that.setViewId('printView');
	},

	members : {
		
		render: function(){
			var that = this;

			// view container
			that.view = $("<div />")
				.attr('id', that.getViewId());

			$('#main-container').append(that.view);

			this.base(arguments);
		},

		load: function(layout, data){
			var that = this;

			if(layout === undefined || data === undefined) return;
						
			that.reset();

			var pageTitle = prompt("Give it a name?", data.title);
			if(!pageTitle) pageTitle = data.title;

			that.view.append(
				$("<h1 />")
				.append(pageTitle)
			);

			that.view.append(
				$("<p />")
				.addClass('subtitle')
				.append('Auszug der Afeefa Datenbank vom ' + moment().format('LL'))
			);

			that.view.append( $("<hr />") );

			if(layout == 'bookmarks'){

				var groupedEntries = _.groupBy(data.entries, function(e){
					return e.category.name;
				});

      	_.each( groupedEntries, function(group, key){
					
					var $cat = $("<p />")
						.addClass('category')
						.append(that.getWording('cat.'+key));					
					that.view.append($cat);

      		_.each( group, function(entry, key){

						var $entry = $("<div />")
							.addClass('entry');
						
						var entryTitle = $("<p />")
							.addClass('title')
							.append(entry.name);
						$entry.append(entryTitle);

						$entry.append(
							$("<p />")
								.addClass('sub-category')
								.append(that.getWording('cat.'+entry.subCategory))
						);

						var entryDescription = $("<p />")
							.addClass('description')
							.append(entry.descriptionShort);
						$entry.append(entryDescription);

						if(entry.location[0]){
							$entry.append(
								$("<p />")
									.addClass('address')
									.append(entry.location[0].placename + ', ' + entry.location[0].street + ', ' + entry.location[0].zip + ' ' + entry.location[0].city)
							);
						}

						$entry.append(
							$("<p />")
								.addClass('contact')
							.append(entry.phone + ' | ' + entry.mail)
						);

						$entry.append(
							$("<a />")
								.addClass('entry-url')
								.attr('href', 'https://afeefa.de/' + (entry.entryType == 'orga'? 'project/' : 'event/') + entry.id)
								.append('afeefa.de/' + (entry.entryType == 'orga'? 'project/' : 'event/') + entry.id)
						);
						
						that.view.append($entry);
					});
				});
			}

			that.open();
		},

		open: function( cb ){
			var that = this;

			that.isActive(true);
			that.view.addClass('active');

			window.print();
			that.close();
		},

		addEvents: function(){
			var that = this;

			// call superclass
			this.base(arguments);
		},

		reset: function(){
			var that = this;

			that.view.empty();
		},

		changeLanguage: function(){
			var that = this;
		},

		close: function(){
			var that = this;
			
			that.reset();
			that.view.removeClass('active');
			that.isActive(false);
		}
	}
});