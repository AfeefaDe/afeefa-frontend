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

		// detectUrl: function(){
		// 	var that = this;

		// 	that.urlParams = [];

		// 	var params = window.location.hash.split('#');
		// 	params = _.without(params, '');

		// 	_.each(params, function( param ){
		// 		param = param.split('=');
		// 		var paramObj = {
		// 			key: param[0],
		// 			value: (param.length > 1)? param[1] : null
		// 		}
		// 		that.urlParams.push(paramObj);
		// 	});

		// 	console.debug(that.urlParams);

		// 	// that.navigate();
		// },

		detectUrl: function(){
			var that = this;

			that.urlParams = window.location.pathname.split('/');
			that.urlParams = _.without(that.urlParams, '');
			console.debug(that.urlParams);
		},

		// setUrl: function(key, value){
		// 	var that = this;

		// 	if(value){
		// 		window.location.hash = key + '=' + value;
		// 	} else {
		// 		window.location.hash = key;
		// 	}
		// },

		setUrl: function(key, value, name){
			var that = this;

			if(name === undefined) {
				name = document.title;
			} else {
				name += ' | Afeefa.de';
			}

			if(value){
				history.pushState(null, name, '/' + key + '/' + value);
				APP.setOpenGraphMetaProperties({
					url: window.location.origin + '/' + key + '/' + value
				});
			} else {
				history.pushState(null, name, '/' + key);
				APP.setOpenGraphMetaProperties({
					url: window.location.origin + '/' + key
				});
			}
		},

		// resetUrl: function(){
		// 	window.location.hash = '';
		// },

		resetUrl: function(){
			history.pushState(null,null, '/');
			APP.setOpenGraphMetaProperties({
				url: null
			});
		},

		loadFromUrl: function(){
			var that = this;

			_.each(that.urlParams, function(param, i){
				// switch(param.key) {
				switch(param) {
			    case 'project':
			    	var orga = APP.getDataManager().getOrgaById(that.urlParams[i+1]);
			    	if(orga) APP.getMapView().loadEntry(orga, {setView: true});
			    	break;
			    case 'event':
			    	var event = APP.getDataManager().getEventById(that.urlParams[i+1]);
			    	if(event) APP.getMapView().loadEntry(event, {setView: true});
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
	          APP.getLegendView().setFilter( {tags: that.urlParams[i+1]} );
						break;
					case 'search':
						APP.getSearchView().inputField.val( that.urlParams[i+1] ).trigger( "input" );
						break;
					// short Urls like afeefa.de/#events
					case 'add':
            APP.getFormView().load( 'newEntry' );
						break;
					case 'feedback':
            APP.getFormView().load( 'feedback' );
						break;
					case 'events':
            APP.getEventView().load();
						break;
					case 'iwgr':
	          APP.getLegendView().setFilter( {tags: 'iwgr'} );
						break;
					default:
			    	// APP.getMapView().loadEntryById(param.key, {setView: true});
				}
			});
		}
	}
});