import qx from '../../node_modules/qooxdoo/qx-oo.js';
import Daddy from './Daddy.js';
import * as _ from '../../node_modules/underscore/underscore-min.js';
 

import DetailView from './Views/DetailView';
import AreaView from './Views/AreaView';
import DetailViewMobile from './Views/DetailViewMobile';
import EventView from './Views/EventView';
import FormView from './Views/FormView';
import IncludeView from './Views/IncludeView';
import IntroView from './Views/IntroView';
import LanguageView from './Views/LanguageView';
import LegendView from './Views/LegendView';
import MapView from './Views/MapView';
import MenuView from './Views/MenuView';
import MessageView from './Views/MessageView';
import PlusView from './Views/PlusView';
import PrintView from './Views/PrintView';
import SearchView from './Views/SearchView';

export default qx.Class.define("Router", {
	
	extend : Daddy	,
	type: "singleton",
	
	properties : {
	},

	construct: function(){
		var that = this;

		that.urlParams = that.detectUrlParameter();

		window.onpopstate = function(event) {
		  that.loadFromUrl(document.location.href);
		};
	},

	members : {

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
			APP.setAreaView( new AreaView() );
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
			APP.setPrintView( new PrintView() );
			
			// render the views
			APP.getMapView().render();
			APP.getSearchView().render();
			APP.getEventView().render();
			APP.getDetailView().render();
			APP.getPlusView().render();
			APP.getLanguageView().render();
			APP.getAreaView().render();
			APP.getMenuView().render();
			APP.getLegendView().render();
			APP.getFormView().render();
			APP.getIncludeView().render();
			APP.getMessageView().render();
			APP.getIntroView().render();
			APP.getPrintView().render();
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
							if( !localStorage.getItem("languageFrozen") ){
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
							if( !localStorage.getItem("languageFrozen") ){
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

		detectUrlParameter: function(url){
			var that = this;

			var urlParams;
			
			if(url !== undefined){
				if(url.indexOf(window.location.host) >= 0)
					var pos = url.indexOf(window.location.host) + window.location.host.length+1;
				else
					var pos = url.indexOf('//afeefa.de') + '//afeefa.de'.length+1;

				urlParams = url.substr(pos).split('/');
			}
			else {
				urlParams = window.location.pathname.split('/');
				urlParams = _.without(urlParams, '');
			}
			
			return urlParams;
		},

		setUrl: function(key, value, name){
			var that = this;

			if(name === undefined) {
				name = document.title;
			} else {
				name += ' | Afeefa.de';
			}

			key = key.toLowerCase();

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

		resetUrl: function(){
			history.pushState(null,null, '/');
			APP.setOpenGraphMetaProperties({
				url: null
			});
		},

    getFrontendUrlForEntry: function(entry, options){
  		var that = this;
      
      var entryType = (APP.isOrga(entry))? 'project' : entry.entryType;
      var path = entryType + '/' + entry.id + '-' + APP.getRouter().slugify(entry.name)
      
      return (options && options.absolute)? window.location.origin + '/' + path : path;
    },

		slugify: function(text){
			var that = this;

			return text.toString().toLowerCase()
		    .replace(/\s+/g, '-')           // Replace spaces with -
		    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
		    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
		    .replace(/^-+/, '')             // Trim - from start of text
		    .replace(/-+$/, '');            // Trim - from end of text
		},

		unslugify: function(slug){
			var that = this;

			// extract entry ID
			return slug.substring(0, slug.indexOf('-'));
		},

		loadFromUrl: function( url ){
			var that = this;

			var urlParams = that.urlParams;
			if(url !== undefined) urlParams = that.detectUrlParameter(url);

			switch(urlParams[0]) {
		    case 'project':
		    	var orga = APP.getDataManager().getOrgaById(that.unslugify(urlParams[1]));
		    	if(orga) APP.getMapView().loadEntry(orga, {setView: true});
		    	break;
		    case 'event':
		    	var event = APP.getDataManager().getEventById(that.unslugify(urlParams[1]));
		    	if(event) APP.getMapView().loadEntry(event, {setView: true});
		    	break;
				case 'cat':
          APP.getLegendView().setFilter( {category: param.value} );
					break;
				case 'subcat':
          APP.getLegendView().setFilter( {subCategory: param.value} );
					break;
				case 'tag':
          APP.getLegendView().setFilter( {tags: urlParams[1]} );
					break;
				case 'search':
					APP.getSearchView().inputField.val( decodeURI(urlParams[1]) ).trigger( "input" );
					break;
				case 'wissensportal':
					var iv = APP.getIncludeView();
					if(urlParams[1]){
						iv.load(null, iv.getBaseUrl() + iv.wpPath + '/' + urlParams[1] + ' article .entry-content');
					} else {
						iv.load('wissensportal');
					}
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
			}

			that.urlParams = null;
		}
	}
});