import qx from 'qooxdoo/qx-oo.js';
 
import PerfectScrollbar from 'perfect-scrollbar';
 

 

export default qx.Class.define("IncludeView", {
	
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
		that.wpPath = 'wissensportal';
		
		that.setIncludes({
			wissensportal: {
				de: {
					url: that.getBaseUrl() + that.wpPath + '/leitfaden-fuer-asylsuchende/ article .entry-content'
					// url: that.getBaseUrl() + that.wpPath
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
				url: that.getBaseUrl() + 'presse/ article .entry-content'
			},
			about: {
				url: that.getBaseUrl() + ' article .entry-content'
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

			if( APP.getUserDevice() == 'desktop') that.ps = new PerfectScrollbar(that.scrollContainer[0])

			that.setViewState(0);

			this.base(arguments);
		},

		// TODO option: modal
		load: function( includeKey, url ){
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


			// set url
      if(includeKey == 'wissensportal'){
	      APP.getRouter().setUrl('wissensportal', null, null);
      }
      else if(url !== undefined){
	      var pos = url.indexOf(that.wpPath) + that.wpPath.length + 1;
	      var articleSlug = url.substr(pos);
	      APP.getRouter().setUrl(that.wpPath, articleSlug, null);
      }

			if(url !== undefined){
				that.scrollContainer.load( url + ' article .entry-content', function( response, status, xhr ) {
					loadComplete();
				});
			}
			else if( that.getIncludes()[includeKey].translatable ) {
				var include = that.getIncludes()[includeKey][APP.getLM().getCurrentLang()];
				if(!include) include = that.getIncludes()[includeKey].de;
				that.scrollContainer.load( include.url, function( response, status, xhr ) {
					loadComplete();
				});
			}
			else {
				that.scrollContainer.load( that.getIncludes()[includeKey].url, function( response, status, xhr ) {
					loadComplete();
				});
			}

			function loadComplete(){

				// fill mustaches with values
        var filledHtml = that.fillMustaches(that.scrollContainer.html());
        that.scrollContainer.html(filledHtml);

        // catch all links and handle internal ones separately
        $('a').click(function(e){
          e.preventDefault();
          var url = $(this).attr('href');

          // load afeefa view
          if(url.indexOf('https://afeefa.de') > -1 ){
            APP.getRouter().loadFromUrl(url);
          }
          // load article
          else if(url.indexOf('//about.afeefa.de/' + that.wpPath) > -1 ){
            that.load(null, url);
          }
          // open external link
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