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
		// load: function( includeKey, url ){
		load: function( chapterID ){
			var that = this;

			if( chapterID === undefined ) return;

			that.reset();
			
			// that.showCurtain(true);
			APP.loading(true);

			// that.setIncludeKey(includeKey);

			that.view.addClass('active');
			// that.view.addClass(includeKey);
			that.setViewState(1);
			// that.minimize(false);

			that.say('includeViewOpened');

			var chapter;
			APP.getDataManager().getChapterFromWisdom(chapterID, function(data){
				chapter = data;
				loadComplete();
			});

			function loadComplete(){

				// fill mustaches with values
        // var filledHtml = that.fillMustaches(that.scrollContainer.html());
        // that.scrollContainer.html(filledHtml);

        // set url
	      APP.getRouter().setUrl('chapter', chapter.id + '/' + APP.getRouter().slugify(chapter.title), null);

        // set heading
        that.heading.empty().append(chapter.title);

				// make URLs a link
				// var content = APP.getUtility().urlify(chapter.content);

      	that.scrollContainer.empty().append(chapter.content);

        // catch all links and handle internal ones separately
        that.scrollContainer.find('a').click(function(e){
          e.preventDefault();
          var url = $(this).attr('href');

          // load chapter
          if (url.indexOf('afeefa://chapter:') > -1 ) {
            var referredChapterID = url.split(':')[2];
            if(referredChapterID) that.load(referredChapterID);
          }
          else if (url.indexOf('afeefa://orga:') > -1 ) {
            var referredOrgaID = url.split(':')[2];
            var orga = APP.getDataManager().getOrgaById(referredOrgaID);

            if (orga) {
	            if( orga.location.length > 0 && orga.location[0].lat )
	              APP.getMapView().selectMarkerFromLink(orga);
	            else
	              APP.getDetailView().load(orga);
            }
          }
          // load afeefa view
          else if(url.indexOf('https://afeefa.de') > -1 ){
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
			// _.each(that.getIncludes(), function(value, key){
			// 	that.view.removeClass(value);
			// });
			
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