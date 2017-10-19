qx.Class.define("DetailView", {
	
	extend : View,
	type: "singleton",

	properties: {
	},

	construct: function(){
		var that = this;

		that.setViewId('detailView');
		// that.setLoadable(true);

		that.record = null;
	},

	members : {
		
		render: function(){
			var that = this;

			// view container
			that.view = $("<div />");
			that.view.attr('id', that.getViewId());

			// TODO: remove this IE css hack when possible
			if( L.Browser.ie ) that.view.css('overflow', 'auto');

			// heading
			that.headingContainer = $("<div />").addClass('heading');
			that.heading = $("<h1 />");
			that.headingContainer.append(that.heading);
			that.view.append(that.headingContainer);

			// back button
			that.createBackBtn(function(){
				if( that.view.hasClass('active-large') ) {
					that.resize(1);
          that.say('detailViewMobileMinimized');
				}
				else {
					that.close();
				}
			});

			// scrollable content container
			that.scrollContainer = $("<div />").addClass('scroll-container');
			that.view.append(that.scrollContainer);
			if( APP.getUserDevice() == 'desktop') that.scrollContainer.perfectScrollbar();

			// certificate badge
			var thePopper;
			that.certificateBadge = $("<div />")
				.addClass('badge badge-certificate')
				.hover(
					function(){
					  thePopper = new Popper(
						    that.certificateBadge,
						    {
						        content: that.getWording('tooltip.certificate'),
						        contentType: 'html'
						    },
						    {
					        placement: 'right',
									removeOnDestroy: true
						    }
						);
					},
					function(){
						thePopper.destroy();
					}
				);
		  that.scrollContainer.append(that.certificateBadge);

		  // message button
			that.messageBtn = $("<div />")
				.addClass('message-btn')
				.click(function(){
		   		APP.getFormView().load( 'contact', { entry: that.record, mustaches: { recipient: that.record.name } } );
				});
		  that.view.append(that.messageBtn);

		  that.bookmarkBtn = $("<div />")
				.addClass('bookmark-btn')
				.click(function(){
		   		if( APP.getUser().bookmark(that.record) )
		   			$(this).addClass('active');
		   		else
		   			$(this).removeClass('active');
				});
		  that.view.append(that.bookmarkBtn);

			////////////////////
			// image property //
			////////////////////
			that.imageContainer = $("<div />").addClass('image-container');
			that.scrollContainer.append(that.imageContainer);
			
			//////////////////////
			// other properties //
			//////////////////////
			
			// generic
			var properties = ['category', 'times', 'descriptionShort', 'supportWantedDetail', 'description', 'speakerPublic', 'spokenLanguages', 'location', 'arrival', 'openingHours', 'phone', 'mail', 'web', 'facebook'];
			_.each(properties, function(prop){

				that['propertyContainer'+prop] = $("<div />").addClass('property ' + prop);
				
				that['propertyIcon'+prop] = $("<div />").addClass('property-icon');
				that['propertyContainer'+prop].append(that['propertyIcon'+prop]);
				
				var catText = $("<div />").addClass('property-text');
				that['propertyName'+prop] = $("<p />").addClass('property-name');
				that['propertyValue'+prop] = $("<p />").addClass('property-value');
				catText.append(that['propertyName'+prop]);
				catText.append(that['propertyValue'+prop]);
				that['propertyContainer'+prop].append(catText);
				
				// navigation hook
				if(prop == 'location'){
					var $link = $("<a />").css('display', 'none').attr('target', '_blank');
					that.scrollContainer.append($link);
					that['propertyContainer'+prop].click(function(){
						if( that.record.location[0] ){
							var userLocation = APP.getMapView().getUserLocation();
							if ( userLocation )
							   // $link.attr('href', 'http://maps.google.com/?saddr=' + userLocation.lat + ',' + userLocation.lon + '&daddr=' + that.record.location[0].lat + ',' + that.record.location[0].lon);
							   $link.attr('href', 'https://www.google.com/maps/dir/'+userLocation.lat+','+userLocation.lon+'/'+that.record.location[0].lat+','+that.record.location[0].lon+'/data=!4m2!4m1!3e3');
							else
							   // $link.attr('href', 'http://maps.google.com/?daddr=' + that.record.location[0].lat + ',' + that.record.location[0].lon);
							   $link.attr('href', 'https://www.google.com/maps/dir//'+that.record.location[0].lat+','+that.record.location[0].lon+'/data=!4m2!4m1!3e3');

							$link[0].click();
						}
					});
				}
				else if(prop == 'descriptionShort'){
					that['propertyContainer'+prop].click(function(){
						if( that.record.description ) that.toggleLongDescription();
					});
				}

				that.scrollContainer.append(that['propertyContainer'+prop]);

			});

			////////////////////
			// link to parent //
			////////////////////
			that.linkedEntriesContainer = $("<div />").addClass('property linkedentries');
			that.scrollContainer.append(that.linkedEntriesContainer);

			//////////////////
			// share button //
			//////////////////
			that.shareButton = $("<div />").addClass('fb-share');
			that.scrollContainer.append(that.shareButton);					

			////////////////
			// timestamps //
			////////////////
			that.timestampContainer = $("<div />")
				.addClass('property timestamp')
				.on('contextmenu', function(e){
          window.open('https://backend.afeefa.de/' + that.record.entryType + 's/' + that.record.id);
				});
			that.scrollContainer.append(that.timestampContainer);

			$('#main-container').append(that.view);

			this.base(arguments);
		},

		toggleLongDescription: function(){
			var that = this;

			var short = that['propertyContainer'+'descriptionShort'];
			var long = that['propertyContainer'+'description'];
			if( long.hasClass('hidden') ) {
				long.removeClass('hidden');
				short.removeClass('read-more');
			}
			else {
				long.addClass('hidden');
				short.addClass('read-more');
			}

			
		},

		load: function( record ){
			var that = this;
			
			// get parent orga
			that.parent = null;
			if(record.parentOrgaId) that.parent = APP.getDataManager().getOrgaById(record.parentOrgaId);

			// set URL
			that.currentEntryType = APP.isOrga(record)? 'project' : record.entryType;
			APP.getRouter().setUrl(that.currentEntryType, record.id, record.name);
			APP.setOpenGraphMetaProperties({
				title: record.name.slice(0,50) + '...',
				description: record.descriptionShort? record.descriptionShort.slice(0,150) + '...' : null
			});

			if(that.record) {
				that.reset();
			}

			// set current record
			that.record = record;

			// view
			that.setViewState(1);
			that.view.addClass('type-' + record.type);
			if(record.category) that.view.addClass('cat-' + record.category.name);

			// scroll
			that.scrollContainer.scrollTop(0);
			that.scrollContainer.perfectScrollbar('update');

			// heading
			that.heading.append(record.name ? record.name : '');
			if(record.category) that.headingContainer.addClass('cat-' + record.category.name);

			// certificate badge
			if(record.certified) that.certificateBadge.show();

			// bookmark button
 			if(APP.getUser().hasBookmark(record)) that.bookmarkBtn.addClass('active');

			// message button
			if(record.mail) that.messageBtn.show();

			////////////////////
			// image property //
			////////////////////
			var imageType = record.imageType? record.imageType : 'image';
			if( imageType && record.image ) {
				
				switch(imageType){
					case 'youtube':
						// supposed, yt link is as 'https://www.youtube.com/watch?v=RURToWXI6QM'
						var ytid = record.image.substr(32);
						var ytEmbed = $( '<iframe width="100%" src="https://www.youtube.com/embed/' + ytid + '?rel=0&amp;showinfo=0' + '" frameborder="0" allowfullscreen></iframe>');
						that.imageContainer.append(ytEmbed);
						break;
					case 'image':
						var image = $( '<img src="' + record.image + '"/>');
						that.imageContainer.append(image);
						break;
				}

				that.imageContainer.addClass('active');
			}

			// dont show read more link if there is no long description
			if( !record.description ) that['propertyContainer'+'descriptionShort'].removeClass('read-more');

			//////////////////////
			// other properties //
			//////////////////////
			
			// category
			var prop = 'category';
			var propName = record[prop] ? record[prop].name : null;
			that['propertyIcon'+prop].addClass('cat-' + propName);
			// TODO dirty code for subcategory, but hey ;)
			that['propertyIcon'+prop].addClass('subcat-' + record.subCategory);
			that['propertyIcon'+prop].addClass('type-' + record.type);
			that['propertyName'+prop].append( record.subCategory ? that.getWording('cat.' + record.subCategory) : that.getWording('cat.' + propName) );

			// var createEntityLabel = { 0: that.getWording('entity_orga'), 1: that.getWording('entity_market'), 2: that.getWording('entity_event') };
			function createEntityLabel( record ){
				switch( record.type ){
					case 0:
					return that.getWording('entity.orga');
					case 1: 
					return record.offer ? that.getWording('entity.market.offer') : that.getWording('entity.market.request');
					case 2:
					return that.getWording('entity.event');
				}
			}
			// var value = entityLabels[record.type];
			var value = createEntityLabel(record);
			that['propertyValue'+prop].append(value);
			// if(record.location.length) that['propertyValue'+prop].append('&nbsp;&nbsp;&nbsp;&nbsp;').append( $("<span />").addClass('glyphicon glyphicon-map-marker') );
			that['propertyContainer'+prop].show();

			// location
			var prop = 'location';
			that['propertyIcon'+prop].addClass('icon-' + prop);
			that['propertyName'+prop].append( that.getWording( 'prop.' + prop ) );
			
			var value = (record.location.length > 0) ? buildLocation(record) : that.getWording( 'prop.location.none' );
			function buildLocation(record){
				var location = '';
				if( record.location[0].placename ) location += record.location[0].placename + '<br>';
				if( record.location[0].street ) location += record.location[0].street + '<br>';
				if( record.location[0].zip && record.location[0].city) location += record.location[0].zip + ' ' + record.location[0].city + '<br>';
				else if( record.location[0].city ) location += record.location[0].city + '<br>';
				return location;
			}
			if( value.length > 0 ) {
				that['propertyValue'+prop].append(value);
				that['propertyContainer'+prop].show();
			}

			// time information
			var prop = 'times';
			that['propertyIcon'+prop].addClass('icon-' + prop);
			that['propertyName'+prop].append( that.getWording( 'prop.' + prop ) );
			
			var value = APP.getUtility().buildTimeString(record);

			if( value.length > 0 ) {
				that['propertyValue'+prop].append(value);
				that['propertyContainer'+prop].show();
			}

			// generic
			var properties = APP.getConfig().simpleProperties;
			_.each(properties, function(prop){

				var propValue = record[prop];

				if(propValue == '') propValue = null;

				// only render property if available
				if( propValue ) {
					
					that['propertyIcon'+prop].addClass('icon-' + prop);
					that['propertyName'+prop].append( that.getWording( 'prop.' + prop ) );
					
					// may create link
					if( _.contains( ['web', 'facebook'], prop) ){
						that['propertyValue'+prop].append('<a target="_blank" href="' + propValue + '">' + propValue + '</a>');
					}
					else if( _.contains( ['phone'], prop) ){
						that['propertyValue'+prop].append('<a target="_blank" href="tel:' + propValue.replace(/\D/g, "") + '">' + propValue + '</a>');
					}
					else if( _.contains( ['description', 'descriptionShort', 'supportWantedDetail'], prop) ){
						that['propertyValue'+prop].append(propValue.replace(/(?:\r\n|\r|\n)/g, '<br />'));

						if(record.descriptionShort) that['propertyContainer'+'description'].addClass('hidden');
					}
					else if( _.contains( ['spokenLanguages'], prop) ){
						_.each( propValue.split(',') , function( langCode ){
							const span = $('<span />')
								.addClass('multiselect-value')
								.append( that.getWording('lan.' + langCode) );
							that['propertyValue'+prop].append( span );
						});
					}
					else {
						that['propertyValue'+prop].append(propValue);
					}

					that['propertyContainer'+prop].show();
				}
				else if( record.location[0] && record.location[0][prop] ) {
					
					that['propertyIcon'+prop].addClass('icon-' + prop);
					that['propertyName'+prop].append( that.getWording( 'prop.' + prop ) );

					if( _.contains( ['arrival'], prop) ){
						that['propertyValue'+prop].append(record.location[0][prop].replace(/(?:\r\n|\r|\n)/g, '<br />'));
					} 
					else if( _.contains( ['openingHours'], prop) ){
						that['propertyValue'+prop].append(record.location[0][prop].replace(/(?:\r\n|\r|\n)/g, '<br />'));
					}
					else {
						that['propertyValue'+prop].append(record.location[0][prop]);
					}
					
					that['propertyContainer'+prop].show();
				}

			});

			if(that.parent){
				
				var propertyText = $('<div />').addClass("property-text");
				that.linkedEntriesContainer.append(propertyText);
				
				// property name
				var name = $("<p />")
					.addClass('property-name')
					.append(function(){
						return APP.isOrga(record)? that.getWording('term.parent.orga') : that.getWording('term.parent.organiser');
					}());
				propertyText.append(name);
				
				// property value
				var value = $("<p />")
					.addClass('property-value')
					.append(that.parent.name)
					.click(function(e){
						e.preventDefault();
			    	APP.getMapView().loadEntry(that.parent, {setView: true});
					});
				propertyText.append(value);
				
				that.linkedEntriesContainer.show();
			}

			if(record.updated_at){
				that.timestampContainer.append(that.getWording('prop.updated') + ' ' + moment(record.updated_at).format('DD.MM.YYYY'));
				that.timestampContainer.show();
			}

			// that.shareButton.append('<iframe src="https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Fdev.afeefa.de%2F'+record.entryType+'%2F'+record.id+'&layout=button&size=large&mobile_iframe=true&width=73&height=28&appId" width="73" height="28" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>');
			// that.shareButton.append('<div class="btn fb-share-button" data-href="' +window.location.origin+ '/' +that.currentEntryType+ '/' +record.id+ '" data-layout="button" data-size="large" data-mobile-iframe="false"><a class="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2F' +window.location.hostname+ '%2F' +that.currentEntryType+ '%2F' +record.id+ '&amp;src=sdkpreparse">Teilen</a></div>');

			// show DetailView
			that.view.addClass('active');
      that.isActive(true);

			if( APP.getUserDevice() == 'desktop') that.scrollContainer.perfectScrollbar('update');

			that.say('detailViewOpened');
		},

		reset: function() {
			var that = this;

			// view
			that.view.removeClass('type-0 type-1 type-2 type-3');
			that.view.removeClass (function (index, css) {
				return (css.match (/(^|\s)cat-\S+/g) || []).join(' ');
			});

			// heading
			that.heading.empty();
			that.headingContainer.removeClass (function (index, css) {
				return (css.match (/(^|\s)cat-\S+/g) || []).join(' ');
			});

			that.certificateBadge.hide();
			that.messageBtn.hide();
 			that.bookmarkBtn.removeClass('active');

			// image property
			that.imageContainer.empty();
			that.imageContainer.removeClass('active image youtube');

			// entry icon
			that['propertyIconcategory'].removeClass('type-0 type-1 type-2 type-3');
			that['propertyIconcategory'].removeClass (function (index, css) {
				return (css.match (/(^|\s)cat-\S+/g) || []).join(' ');
			});
			that['propertyIconcategory'].removeClass (function (index, css) {
				return (css.match (/(^|\s)subcat-\S+/g) || []).join(' ');
			});
			
			// description toggling
			that['propertyContainer'+'descriptionShort'].addClass('read-more');
			that['propertyContainer'+'description'].removeClass('hidden');

			// generic
			var properties = _.union( ['category', 'location', 'times'], APP.getConfig().simpleProperties );
			
			_.each(properties, function(prop){
				that['propertyIcon'+prop].removeClass (function (index, css) {
					return (css.match (/(^|\s)icon-\S+/g) || []).join(' ');
				});
				that['propertyName'+prop].empty();
				that['propertyValue'+prop].empty();
				that['propertyContainer'+prop].hide();
			});

			// timestamp
			that.timestampContainer.empty().hide();
			
			// linked entries
			that.linkedEntriesContainer.empty().hide();

			that.shareButton.empty();
			
			// delete current record
			that.record = null;
		},

		close: function() {
			var that = this;
			
			// only close if active
			if(!that.getViewState()) return;

			that.view.removeClass('active');
			that.reset();
			that.setViewState(0);
      that.isActive(false);
			that.say('detailViewClosed');
		},

		changeLanguage: function(){
			var that = this;
		},

		addEvents: function() {
			var that = this;

			this.base(arguments);

			that.listen('searchFieldFocused', function(){
				// if( APP.getUserDevice() === 'mobile' )
					that.close();
				// else
				// 	that.view.addClass('right');
			});

			that.listen('searchViewLoaded', function(){
				that.close();
			});

			that.listen('fetchedNewData', function(){
				if( that.record !== null) {
					// reload record
			    var newRecord = APP.getDataManager().getEntryByEntryId(that.record.entryId);
			    var newRecord = APP.isEvent(that.record)? APP.getDataManager().getEventById(that.record.id) : APP.getDataManager().getOrgaById(that.record.id);
			    that.reset();
			    that.load(newRecord);
				}
			});

			that.listen('includeViewOpened', function(){
				that.close();
			});

			that.listen('filterSet', function(){
				that.close();
			});

			that.listen('includeViewClosed', function(){
			});

			that.listen('mapMarkerDeselected', function(){
				that.close();
			});

			that.listen('mapclicked', function(){
				that.close();
			});

			that.headingContainer.click(function(){
				if( APP.getUserDevice() === 'desktop' || APP.getUserDevice() === 'tablet' )
					APP.getMapView().selectMarkerFromLink(that.record);
			});
		}

	}

});