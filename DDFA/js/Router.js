qx.Class.define("Router", {
	
	extend : Daddy	,
	type: "singleton",
	
	properties : {
		// urlParams: {},
		// renderedViews: {}	
	},

	construct: function(){
		var that = this;

		// that.registerHashChange();
		that.detectUrl();
	},

	members : {

		registerHashChange: function(){
			var that = this;

			window.onhashchange = function(){
				that.detectUrl();
			};
		},

		detectUrl: function(){
			var that = this;

			that.urlParams = [];

			var params = window.location.hash.split('#');
			params = _.without(params, '');

			_.each(params, function( param ){
				param = param.split('=');
				var paramObj = {
					key: param[0],
					value: (param.length > 1)? param[1] : null
				}
				that.urlParams.push(paramObj);
			});

			console.debug(that.urlParams);

			// that.navigate();
		},

		initialNavigate: function(){
			var that = this;

			that.addEvents();

			var userDevice = APP.getUserDevice();

			if( userDevice === 'mobile' ) {
				APP.setDetailView( new DetailViewMobile() );
			}
			else {
				APP.setDetailView( new DetailView() );
			}
			
			APP.setLanguageView( new LanguageView() );
			APP.setMapView( new MapView() );
			APP.setSearchView( new SearchView() );
			APP.setEventView( new EventView() );
			APP.setMenuView( new MenuView() );
			APP.setLegendView( new LegendView() );
			APP.setPlusView( new PlusView() );
			APP.setFormView( new FormView() );
			APP.setIncludeView( new IncludeView() );
			APP.setMessageView( new MessageView() );
			APP.setIntroView( new IntroView() );
			
			// render the views
			APP.getMapView().render();
			APP.getSearchView().render();
			APP.getEventView().render();
			APP.getDetailView().render();
			APP.getPlusView().render();
			APP.getLanguageView().render();
			APP.getMenuView().render();
			APP.getLegendView().render();
			APP.getFormView().render();
			APP.getIncludeView().render();
			APP.getMessageView().render();
			APP.getIntroView().render();
		},

		navigate: function( path ){
			var that = this;

			// currentPath is now urlParams
			if(!path) var path = that.currentPath;
			else that.currentPath = path;
			
			console.log('navigate to: ' + path);

			if(that.currentPath.length > 0){
				APP.getMapView().selectMarkerById( that.currentPath );
			}
			
			

			// console.log('navigate to: ' + path);

	  //   	var firstLevel = path[0];
			
	  //   	// define which (and where) views should exist on a certain route
	  //   	var routes = {
			//     undefined: [
			// 		{ view: new StartView(), layoutArea: DL.settings.layoutAreas.mainColumn },
			// 		{ view: new RunnersSmallView(), layoutArea: DL.settings.layoutAreas.rightColumn }
			// 	],
			//     'info': [
			// 		{ view: new InfoView(), layoutArea: DL.settings.layoutAreas.mainColumn },
			// 		{ view: new RunnersSmallView(), layoutArea: DL.settings.layoutAreas.rightColumn }
			// 	],
			//     'laeufer': [
			// 		{ view: new RunnersView(), layoutArea: DL.settings.layoutAreas.mainColumn },
			// 		{ view: new RunnersSmallView(), layoutArea: DL.settings.layoutAreas.rightColumn }
			// 	],
			//     'anmeldung': [
			// 		{ view: new RegistrationView(), layoutArea: DL.settings.layoutAreas.mainColumn },
			// 		{ view: new RunnersSmallView(), layoutArea: DL.settings.layoutAreas.rightColumn }
			// 	],
			//     'impressum': [
			// 		{ view: new ImprintView(), layoutArea: DL.settings.layoutAreas.mainColumn },
			// 		{ view: new RunnersSmallView(), layoutArea: DL.settings.layoutAreas.rightColumn }
			// 	],
			//     'kontakt': [
			// 		{ view: new ContactView(), layoutArea: DL.settings.layoutAreas.mainColumn },
			// 		{ view: new RunnersSmallView(), layoutArea: DL.settings.layoutAreas.rightColumn }
			// 	]
			// };

			// // render desired views
			// var wishlist = routes[firstLevel]? routes[firstLevel] : routes[undefined];

		 //    wishlist.each(function( wish ){

			// 	// render views only if not already rendered
			// 	var newLayoutViewObject = { layoutArea: wish.layoutArea, view: wish.view };
			// 	var rendered = _.find( that.renderedViews, function( layoutViewObject ){
			// 		return ( layoutViewObject.layoutArea == newLayoutViewObject.layoutArea && layoutViewObject.view.get('name') == newLayoutViewObject.view.get('name') );
			// 	});

			// 	if(!rendered){
			// 		// remove all memorized views for the certain layoutArea
			// 		that.renderedViews = _.reject(that.renderedViews, function( layoutViewObject ){
			// 			if( layoutViewObject.layoutArea == newLayoutViewObject.layoutArea ){
			// 				if(layoutViewObject.view.die) layoutViewObject.view.die();
			// 				return true;
			// 			} else {
			// 				return false;
			// 			}
			// 			// return layoutViewObject.layoutArea == newLayoutViewObject.layoutArea;
			// 		});
			// 		newLayoutViewObject.view.render(newLayoutViewObject.layoutArea);
			// 		that.renderedViews.push( newLayoutViewObject );
			// 	}
			// });

		 //    // set new hash if navigate() was invoked manually and not because of a hash change
		 //    var newHash = '#' + path.join('#')
	  //   	if( window.location.hash != newHash) window.location.hash = newHash;

		 //    that.updateNavigation();
		},

		updateNavigation: function(){
			var that = this;

			var firstLevel = that.currentPath[0];
			
			d3.selectAll('nav a').each(function(){
				var aSel = d3.select(this);
				if(aSel.attr('href') == '#'+firstLevel)
					aSel.classed('active', true);
				else
					aSel.classed('active', false);
			});
		},

		addEvents: function(){
			var that = this;

			that.listen('fetchedAllData', function(){
				
				if(that.urlParams && that.urlParams.length > 0){
					that.loadFromUrl();
				}
				else {
					// if(APP.getUserDevice() == 'mobile') {
					// 	APP.getIncludeView().load( APP.getIncludeView().getIncludes().intro );
					// }
					// else {
						// start intro?
						if( !localStorage.getItem("introIsKnown") ){
							if( !sessionStorage.getItem("languageFrozen") ){
								APP.getLanguageView().open(function(){
									APP.getIntroView().start();
								});
							}
							else {
								APP.getIntroView().start();
							}
						}
						// open search view
						else {
							if( !sessionStorage.getItem("languageFrozen") ){
								// APP.getSearchView().hide();
								APP.getLanguageView().open(function(){
									APP.getSearchView().show();
								});
							}
							else {
								// APP.getSearchView().load();
							}
						}
					// }
				}
			});

			that.listen('detailViewClosed', function(){
				that.resetUrl();
			});

			that.listen('eventViewOpened', function(){
				that.setUrl('events');
			});

			that.listen('dashboardLoaded', function(){
				that.resetUrl();
			});

			that.listen('filterSet', function(e){
				var filterObj = e.customData;
				
				if(filterObj === undefined) return;

				if(filterObj.category) that.setUrl('cat', filterObj.category);
				else if (filterObj.subCategory) that.setUrl('subcat', filterObj.subCategory);
			});
		},

		setUrl: function(key, value){
			var that = this;

			if(value){
				window.location.hash = key + '=' + value;
			} else {
				window.location.hash = key;
			}
		},

		resetUrl: function(){
			window.location.hash = '';
		},

		loadFromUrl: function(){
			var that = this;

			_.each(that.urlParams, function(param){
				switch(param.key) {
			    case 'entry':
			    	APP.getMapView().loadEntryById(param.value, {setView: true});
			    	break;
			    case 'area':
						APP.getMapView().setViewToArea(param.value);
		        break;
					case 'cat':
	          APP.getLegendView().setFilter( {category: param.value} );
						break;
					case 'subcat':
	          APP.getLegendView().setFilter( {subCategory: param.value} );
						break;
					case 'tag':
	          APP.getLegendView().setFilter( {tags: param.vaule} );
						break;
					case 'search':
						APP.getSearchView().inputField.val( param.value ).trigger( "input" );
						break;
					// short Urls like afeefa.de/#events
					case 'add':
            APP.getFormView().load( 'newEntry' );
						break;
					case 'events':
            APP.getEventView().load();
						break;
					case 'iwgr':
	          APP.getLegendView().setFilter( {tags: 'iwgr'} );
						break;
					// deprecated, but possible: entry URLs like afeefa.de/#591c98dcbd6b8
					default:
			    	APP.getMapView().loadEntryById(param.value, {setView: true});
				}
			});
		}
	}
});