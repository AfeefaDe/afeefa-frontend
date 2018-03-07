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
      // that.currentUrlWasPopped = true;
      that.loadFromUrl(document.location.href, function(){
        // that.currentUrlWasPopped = false;
      });
    };
  },

  members : {

    initializeViews: function(){
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

      // this triggers the initial navigation
      that.listen('fetchedAllData', function(){
        
        that.loadFromUrl();
        APP.setPageTitle();
        
        if(that.urlParams && that.urlParams.length > 0){
        }
        else {
          // if(APP.getUserDevice() == 'mobile') {
          // 	APP.getIncludeView().load( APP.getIncludeView().getIncludes().intro );
          // }
          // else {
            // start intro?
            
            // dont start intro for IEs
            var isIE = function() { return navigator.userAgent.match(/Edge|MSIE|Trident/i); };

            if( !localStorage.getItem("introIsKnown") ){
              if( !localStorage.getItem("languageFrozen") ){
                APP.getLanguageView().open(function(){
                  if(!isIE() && APP.getUserDevice() != 'mobile') APP.getIntroView().start();
                });
              }
              else {
                if(!isIE() && APP.getUserDevice() != 'mobile') APP.getIntroView().start();
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

    /**
     * @param {object} options
     * 	@attr {string} route : url to set, e.g. 'events/today' makes 'afeefa.de/events/today'
     * 	@attr {string} name : title of the history object
     * 	@attr {object} data : custom data to save with the history state, e.g. view-specific state
     * 	@attr {bool} keyState : mark this state as important and jump right to this one instead of natively going back/ forward
     */
    setUrl: function(options){
      var that = this;

      if (options.keyState) {
        that.lastKeyState = options;
        that.lastKeyState_distance = 0;
      }
      that.lastKeyState_distance++;

      if (options === undefined) console.warn('missing info for setting history state');
      options.name = (options.name)? options.name : document.title;
      options.route = (options.route)? options.route.toLowerCase() : '';
      
      history.pushState(options.data, options.name, options.route);
      APP.setOpenGraphMetaProperties({
        url: window.location.origin + options.route
      });

      // fire a popstate event to trigger detection of URL change
      var popStateEvent = new PopStateEvent('popstate', { state: options.data });
      dispatchEvent(popStateEvent);
    },

    back: function() {
      history.back();
    },

    // not just jump one step back in history, but rather jump to the last important state like the user would expect
    backToLastKeyState: function () {
      var that = this;
      if ( that.lastKeyState && window.location.href.indexOf(that.lastKeyState.route) < 0 ) {
        that.setUrl( that.lastKeyState );
      } else {
        that.goToDashboard();
      }
    },

    goToDashboard: function() {
      var that = this;
      APP.route('/', null, null, true);
    },

    getFrontendUrlForEntry: function(entry, options){
      var that = this;
    
      var entryType = (APP.isOrga(entry))? 'project' : entry.entryType;
      var path = '/' + entryType + '/' + entry.id + '-' + APP.getRouter().slugify(entry.name)
      
      return (options && options.absolute)? window.location.origin + path : path;
    },

    slugify: function(text){
      var that = this;

      return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/\ä+/g, 'ae')
        .replace(/\ö+/g, 'oe')
        .replace(/\ü+/g, 'ue')
        .replace(/\ß+/g, 'ss')
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
    },

    unslugify: function(slug){
      var that = this;

      // extract entry ID, also read URL without slug like /project/4542
      var pos = slug.indexOf('-');
      return (pos > 0 )? slug.substring(0, pos) : slug;
    },

    loadFromUrl: function( url, cb ){
      var that = this;

      var urlParams = (that.urlParams != null)? that.urlParams : that.detectUrlParameter();
      if(url === null || url !== undefined) urlParams = that.detectUrlParameter(url);

      switch(urlParams[0]) {
        case 'project':
          var orga = APP.getDataManager().getOrgaById(that.unslugify(urlParams[1]));
          if(orga) APP.getMapView().loadEntry(orga);
          if(orga) APP.getDetailView().load(orga);
          if(cb) cb();
          if (orga) APP.setPageTitle(orga.name); // overwrite page title set in APP.route()
          break;
        case 'event':
          var event = APP.getDataManager().getEventById(that.unslugify(urlParams[1]));
          if(event) APP.getMapView().loadEntry(event);
          if(event) APP.getDetailView().load(event);
          if(cb) cb();
          if (event) APP.setPageTitle(event.name); // overwrite page title set in APP.route()
          break;
        // case 'cat':
        //   APP.getLegendView().setFilter( {category: param.value} );
        //   if(cb) cb();
        //   break;
        // case 'subcat':
        //   APP.getLegendView().setFilter( {subCategory: param.value} );
        //   if(cb) cb();
        //   break;
        // case 'tag':
        //   APP.getLegendView().setFilter( {tags: urlParams[1]} );
        //   if(cb) cb();
        //   break;
        case 'search':
          APP.getSearchView().inputField.val(decodeURI(urlParams[1]));
          APP.getSearchView().load( decodeURI(urlParams[1]) );
          if(cb) cb();
          break;
        case 'chapter':
          var iv = APP.getIncludeView();
          if(urlParams[1]){
            iv.load(urlParams[1], function(){
              if(cb) cb();
            });
          }
          break;
        case 'add':
          APP.getFormView().load( 'newEntry' );
          if(cb) cb();
          break;
        case 'feedback':
          APP.getFormView().load( 'feedback' );
          if(cb) cb();
          break;
        case 'events':
          APP.getEventView().load();
          if(cb) cb();
          break;
        case 'iwgr':
          APP.getLegendView().setFilter( {tags: 'iwgr'} );
          if(cb) cb();
          break;
        default:
          APP.getSearchView().load();
          APP.getMapView().loadNewData();
          if(cb) cb();
      }

      that.urlParams = null;
    }
  }
});