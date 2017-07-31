qx.Class.define("IncludeView", {
	
	extend : View,
	type: "singleton",

	properties: {
		includes: {},
		baseUrl: {},
		includeKey: {init: null}
	},

	construct: function(){
		var that = this;

		that.setBaseUrl( APP.getConfig().includePathForHtmlFiles );
		
		that.setIncludes({
			refugeeGuide: {
				de: {
					url: that.getBaseUrl() + 'wissensportal/guide-de/ article .entry-content',
				},
				translatable: true
			},
			supporterGuide: {
				url: that.getBaseUrl() + 'supporterGuide',
				translatable: true
			},
			imprint: {
				url: that.getBaseUrl() + 'impressum/ article .entry-content'
			},
			press: {
				url: that.getBaseUrl() + 'press.html',
			},
			about: {
				url: 'https://about.afeefa.de article .entry-content'
			},
		});
		
		that.setViewId('includeView');
		that.setLoadable(true);
	},

	members : {
		
		render: function(){
			var that = this;

			// view container
			that.view = $("<div />");
			that.view.attr('id', that.getViewId());

			// heading
			that.headingContainer = $("<div />").addClass('heading');
			that.heading = $("<h1 />");
			that.headingContainer.append(that.heading);
			that.view.append(that.headingContainer);

			// back button
			that.createBackBtn(function(){
				that.close();
			});

			// scrollable content container
			that.scrollContainer  = $("<div />");
			that.scrollContainer.addClass('scroll-container');
			that.view.append(that.scrollContainer);

			$('#main-container').append(that.view);

			if( APP.getUserDevice() == 'desktop') that.scrollContainer.perfectScrollbar();

			that.setViewState(0);

			this.base(arguments);
		},

		// TODO option: modal
		load: function( includeKey ){
			var that = this;

			that.reset();
			
			// that.showCurtain(true);
			APP.loading(true);

			that.setIncludeKey(includeKey);

			that.view.addClass('active');
			that.view.addClass(includeKey);
			that.setViewState(1);
			// that.minimize(false);

			that.say('includeViewOpened');

			if( that.getIncludes()[includeKey].translatable ) {
				that.scrollContainer.load( that.getIncludes()[includeKey][APP.getLM().getCurrentLang()].url, function( response, status, xhr ) {

					if ( status == "error" ) {

						that.scrollContainer.load( that.getIncludes()[includeKey].url + '_en.html', function( response, status, xhr ) {
							
							if ( status == "error" ) {

								that.scrollContainer.load( that.getIncludes()[includeKey].url + '_de.html', function( response, status, xhr ) {
									loadComplete();
								});

							}

							loadComplete();

						});

					}

					loadComplete();

				});
			} else {
				that.scrollContainer.load( that.getIncludes()[includeKey].url, function( response, status, xhr ) {
					loadComplete();
				});
			}

			function loadComplete(){

				// fill mustaches with values
        var filledHtml = that.fillMustaches(that.scrollContainer.html());
        that.scrollContainer.html(filledHtml);

        // catch links
        $('a').click(function(e){
            e.preventDefault();
        		var url = $(this).attr('href');

            if(url.indexOf('https://afeefa.de') > -1 ){
            	// load appropriate afeefa content
            	var pos = url.indexOf('afeefa.de/') + 'afeefa.de/'.length;
							var parameters = url.substr(pos).split('/');

							APP.getRouter().loadFromUrl(url);
							// switch(parameters[0]){
							// 	case 'project':
							// 		alert('load project with id ' + parameters[1]);
							// 		break;
							// 	case 'event':
							// 		alert('load event with id ' + parameters[1]);
							// 		break;
							// }
            }
            else {
            	window.open(url);
            }
        });

				APP.loading(false);
			}
		},

		reset: function(){
			var that = this;

			that.setIncludeKey(null);

			// that.view.find('h1').remove();
			that.scrollContainer.empty();
		},

		minimize: function(bool){
			var that = this;

			// only min/max if view is active
			if( that.getViewState() === 0 ) return false;

			if( bool ) {
				that.showCurtain(false);
				that.view.addClass('min')
				that.setViewState(2);
			}
			else {
				that.showCurtain(true);
				that.view.removeClass('min')  
				that.setViewState(1);
			}
		},

		addEvents: function(){
			var that = this;

			// call superclass
			this.base(arguments);
			
			// that.view.click(function(){
			// 	that.say('includeViewClicked', {viewState: that.getViewState()} );
			// });

			that.listen('detailViewOpened', function(){
				// that.minimize(true);
				that.hide();
			});

			that.listen('detailViewClosed', function(){
				// that.minimize(false);
				that.show();
			});

			that.listen('searchResultsLoaded', function(){
				// that.minimize(true);
			});

			// that.listen('detailViewMobileMaximized', function(){
			//     that.minimize(true);
			// });

			// that.listen('detailViewMobileMinimized', function(){
			//     that.minimize(true);
			// });

			// that.listen('searchFieldFocused', function(){
			// 	that.close();
			// });

			// that.menuBtn.click(function(){
			//     $('#main-container').addClass('shifted-left');
			// });

			// that.listen('curtainclicked', function(){
			//     $('#main-container').removeClass('shifted-left');
			// });
			
		},

		close: function(){
			var that = this;

			that.view.removeClass('active');
			_.each(that.getIncludes(), function(value, key){
				that.view.removeClass(value);
			});
			
			that.setViewState(0);
			that.setIncludeKey(null);

			// that.showCurtain(false);

			that.say('includeViewClosed');
		},

		changeLanguage: function(){
			var that = this;

			if( that.getIncludeKey() !== null ) that.load( that.getIncludeKey() );
		}
	}

});