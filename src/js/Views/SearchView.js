import qx from 'qooxdoo/qx-oo.js';
 
import PerfectScrollbar from 'perfect-scrollbar';
 
 

 

export default qx.Class.define('SearchView', {
    
  extend : View,
  type: 'singleton',

  properties: {
  },

  construct: function(){
    var that = this;

    that.setViewId('searchView');
  },

  members : {
      
    render: function(){
      var that = this;

      // view container
      that.view = $('<div />');
      that.view.attr('id', that.getViewId());

      $('#main-container').append(that.view);

      // search bar
      that.searchBar = $('<div />')
        .attr('id', 'search-bar');
      that.view.append(that.searchBar);

      // add button
      that.addBtn = $('<div />')
        .addClass('button add-btn')
        .click(function(){
          APP.route('/add', that.getWording('search.label.addentry'), null);
        });
      that.searchBar.append(that.addBtn);

      // cancel button
      that.cancelBtn = $('<div />')
        .addClass('button cancel-btn')
        .click(function(){
          // if mobile: might be good to go back to last key state
          // APP.getRouter().backToLastKeyState();
          APP.getLegendView().resetFilter();
          APP.getRouter().goToDashboard();
        });
      that.searchBar.append(that.cancelBtn);

      // input field
      that.inputField = $('<input />')
        .attr('type', 'text');
      that.searchBar.append(that.inputField);

      // search tags
      that.searchTag = $('<span />')
        .click(function(){
          // that.reset();
          // that.loadDashboard();
          // APP.getLegendView().resetFilter();
          // that.inputField.focus();
          // that.inputField.trigger( 'click' );
          that.view.toggleClass('showLegend');
        });
      that.searchBar.append(that.searchTag);      

      // scrolling area
      that.scrollContainer = $('<div />')
        .addClass('scroll-container');
      if( APP.getUserDevice() == 'desktop') that.ps = new PerfectScrollbar(that.scrollContainer[0]);
      
      // render legend view into search view
      APP.getLegendView().render(that.scrollContainer);
      
      // results area
      // put dynamic elements like search results into an extra container, which is emptied and reloaded regularly
      // and keep a static area inside the view for fixed elements like legendView
      that.resultsContainer = $('<div />')
        .addClass('list-results');
      
      that.scrollContainer.append(that.resultsContainer);

      that.view.append(that.scrollContainer);

      this.base(arguments);
    },

    load: function(query){
      var that = this;

      if( query === undefined ) query = '';
      query = query.toLowerCase();
        
      if(query){
        that.resultsContainer.empty();
        that.loadResults(query);
      } else {
        that.reset();
        that.loadDashboard();
      }

      that.inputField
        .attr('placeholder', that.getWording('search.placeholder'))
        .show();

      that.isActive(true);
      that.view.addClass('active');
      that.say('searchViewLoaded');
        
      that.scrollContainer.scrollTop(0);

      return that;
    },

    loadDashboard: function(){
      var that = this;

      // highlights
      // that.createSectionHeader( that.getWording('search.label.highlights') );
      
      if(APP.getUser().getBookmarks().length > 0){
        // MY AFEEFA
        // that.createSectionHeader( that.getWording('search.section.user') );

        // user bookmarks
        var action = function(){
          APP.route('/search/user:bookmarks', that.getWording('search.tag.bookmarks'), null, true);
        };
        that.createListResult(
          {
            cssClass: 'first-child',
            iconClass: 'bookmark',
            label: that.getWording('search.tag.bookmarks'),
            subLabel: APP.getUser().getBookmarks().length,
            action: action,
            targetContainertEl: that.resultsContainer
          }
        );
      }
      
      // WISDOM
      // if (APP.getArea().wisdomRootId !== undefined) {
      //   that.createSectionHeader( '' );
        
      //   var action = function(){
      //     APP.route('/chapter/' + APP.getArea().wisdomRootId, null, null, true);
      //   };
        
      //   that.createListResult(
      //     {
      //       iconClass: 'wisdom',
      //       label: 'Wegweiser',
      //       subLabel: 'Praktisches Hintergrundwissen für Ehrenamtliche in der Integrationsarbeit',
      //       action: action,
      //       targetContainertEl: that.resultsContainer
      //     }
      //   );
      // }

      if (APP.getDataManager().getAllEvents().length > 0) {
        // today's events
        var eventsToday = APP.getDataManager().getAllEvents( {timeSpan: 'onlyAtDayX', atDate: moment()} );
        if(eventsToday.length == 0) eventsToday = APP.getDataManager().getAllEvents( {timeSpan: 'alsoToday', atDate: moment()} );
        
        if (eventsToday.length > 0) {
          that.createSectionHeader( that.getWording('search.label.eventstoday') );
          _.each(eventsToday.slice(0, 3), function(entry) {
            that.createEntryResult( {entry: entry, targetContainertEl: that.resultsContainer} );
          });
        } else {
          that.createSectionHeader( '' );
        }
                
        that.createButton(
          {
            label: that.getWording('search.button.events'),
            iconName: 'today',
            action: function(){
              APP.route('/events', that.getWording('search.button.events'), null, true);
            }
          }
        );
      }

      that.createSectionHeader( that.getWording('search.label.activity') );
     
      // add new entry
      var action = function(){
        APP.route('/add', that.getWording('search.label.addentry'), null);
      };
      that.createListResult(
        {
          iconClass: 'add-entry',
          label: that.getWording('search.label.addentry'),
          subLabel: that.getWording('search.sublabel.addentry'),
          action: action,
          targetContainertEl: that.resultsContainer
        }
      );

      var action = function(){
        APP.route('/feedback', that.getWording('form.heading.feedback'), null);
      };
      that.createListResult(
        {
          iconClass: 'feedback',
          label: that.getWording('form.heading.feedback'),
          subLabel: that.getWording('search.sublabel.feedback'),
          action: action,
          targetContainertEl: that.resultsContainer
        }
      );


      // that.createSectionHeader( that.getWording('search.label.newentries') );
      // var newProjects = APP.getDataManager().getNewestOffers(5);
      // _.each(newProjects, function(entry) {
      //   that.createEntryResult( {entry: entry, targetContainertEl: that.resultsContainer} );
      // });

      // that.createSectionHeader( that.getWording('search.label.lists') );

      // support wanted
      // var action = function(){
      //   that.inputField.val('prop:supportwanted').trigger( 'input' );
      // };
      // that.createListResult(
      //   {
      //     iconClass: 'support-wanted',
      //     label: that.getWording('search.label.supportwanted'),
      //     subLabel: that.getWording('search.sublabel.supportwanted'),
      //     action: action,
      //     targetContainertEl: that.resultsContainer
      //   }
      // );

      that.createSectionHeader( that.getWording('search.label.help') );
      
      // intro
      var action = function(){
        APP.getIntroView().start();
      };
      that.createListResult(
        {
          iconClass: 'start-intro',
          label: that.getWording('search.label.intro'),
          subLabel: that.getWording('search.sublabel.intro'),
          action: action,
          targetContainertEl: that.resultsContainer
        }
      );

      // all entries
      var action = function(){
        APP.route('/search/allentries', 'Gesamter Datenbestand', null, true);
      };
      that.createListResult(
        {
          label: 'Alle Einträge',
          subLabel: 'Gesamten Datenbestand laden',
          action: action,
          targetContainertEl: that.resultsContainer,
          href: '/search/allentries'
        }
      );

      // kolle
      var action = function(){
        window.open('https://kollektiv.afeefa.de', '_blank');
      };
      that.createListResult(
        {
          label: 'Dein Projekt braucht digitale Power?',
          subLabel: 'Das Afeefa Kollektiv könnte dabei unterstützen.',
          action: action,
          targetContainertEl: that.resultsContainer,
          href: 'https://kollektiv.afeefa.de'
        }
      );

      that.say('dashboardLoaded');
    },

    loadSuggestions: function( query ) {
      var that = this;

      // DEFINING
      var tags = ['asylum', 'homework', 'racism', 'women', 'youth'];
      var groups = ['women', 'children', 'men', 'refugees'];
      var lists = ['beratung-fur-refugees-in-dd', 'freizeit-fur-kinder', 'geselliger-abend'];
      var articles = ['Wie finde ich den richtigen Deutschkurs?', 'WOHNEN – WEGE AUS DER SAMMELUNTERKUNFT'];

      var suggestions = {
        tags: [],
        groups: [],
        lists: [],
        articles: [],
        addresses: []
      };
      
      // SEARCHING
      // if(query.length > 5){
      //   APP.getDataManager().findAddress(query, function(geo){
      //     if(geo.latitude && geo.longitude){
      //       suggestions.addresses = [geo];
      //       suggestAddress();
      //     }
      //   });
      // }

      suggestions.tags = _.filter(tags, function(tag){
        return ( that.getWording('tag.' + tag).toLowerCase().indexOf(query) >= 0 );
      });

      // DISPLAYING
      function createEntry(options){
        that.scrollContainer.prepend(
          $('<a />')
            .append(options.label)
            .addClass('suggestion ' + options.cssClass)
            .attr('href', options.url)
            .click(function(e){
              e.preventDefault();
              options.action();
            })
        );
      }

      _.each(suggestions.tags, function(s){
        createEntry({
          label: (that.getWording('tag.' + s + '.title'))? that.getWording('tag.' + s + '.title') : that.getWording('tag.' + s),
          cssClass: 'tag',
          url: '/search/tag:' + s,
          action: function(){
            that.inputField.val('tag:' + s).trigger( 'input' );
          }
        });
      });
      
      function suggestAddress(){
        that.scrollContainer.find('.address').remove();
        _.each(suggestions.addresses, function(s){
          createEntry({
            label: s.full_address,
            cssClass: 'address',
            url: '',
            action: function(){
              APP.getMapView().map.setView([s.latitude, s.longitude], 16);
              // that.reset();
              // that.loadDashboard();
            }
          });
        });
      }
    },

    loadResults: function( query ) {
      var that = this;

      that.view.addClass('active-search');
      that.view.removeClass('showLegend');

      const entries = APP.getData().entries;

      var entriesFiltered, blockSyncWithMap = false;

      // search type for individual result formatting
      that.currentSearchType = null;

      // info about why entry was found; for individual result formatting (e.g. needle highlighting)
      var foundCriteria = {};

      // predefined queries:
      if( query.indexOf('allentries') >= 0 ){
        entriesFiltered = entries;
      }
      else if( query.indexOf(':') >= 0 ){
        var operator = query.substring(0, query.indexOf(':'));
        var operationQuery = query.substring(operator.length+1);

        // type listing
        if(operator == 'type' ) {
          if(operationQuery == 2) {
            entriesFiltered = APP.getDataManager().getAllEvents();
          }
          else {
            entriesFiltered = _.filter( entries, function(entry){
              return (entry.type == operationQuery);
            });
          }

          that.setSearchTag('type-' + operationQuery, that.getWording('search.label.type.' + operationQuery));
          APP.setPageTitle( that.getWording('search.label.type.' + operationQuery) ); // overwrite page title set in APP.route()
        }

        // category listing
        if(operator == 'cat' ) {
          entriesFiltered = _.filter( entries, function(entry){
            return (entry.navigationId && entry.navigationId == operationQuery);
          });

          that.setSearchTag('cat-' + operationQuery, APP.getData().navigationById[operationQuery].name, APP.getData().navigationById[operationQuery].color);
          APP.setPageTitle( that.getWording('cat.' + operationQuery) ); // overwrite page title set in APP.route()
        }

        // sub category listing
        else if(operator == 'subcat' ) {
          entriesFiltered = _.filter( entries, function(entry){
            
            if( entry.subNavigationId && entry.subNavigationId == operationQuery ) {
              return true;
            }
          });
          
          that.setSearchTag('cat-' + operationQuery, APP.getData().navigationById[operationQuery].name, APP.getData().navigationById[operationQuery].color);
          APP.setPageTitle( that.getWording('cat.' + operationQuery) ); // overwrite page title set in APP.route()
        }

        // tag listing
        else if(operator == 'tag' ) {
          entriesFiltered = _.filter( entries, function(entry){
            return ( entry.tags && (entry.tags.indexOf(operationQuery) > -1) );
          });
          
          var tagLabel = that.getWording('tag.' + operationQuery) ? that.getWording('tag.' + operationQuery) : operationQuery;
          that.setSearchTag('tag-' + operationQuery, tagLabel);
        }
        
        // user bookmarks
        else if(operator == 'user' && operationQuery == 'bookmarks' ) {

          entriesFiltered = APP.getUser().getBookmarks();

          that.setSearchTag(null, that.getWording('search.tag.bookmarks'));
        }

        else if(operator == 'prop'){
          switch(operationQuery){
          case 'supportwanted':
            entriesFiltered = _.filter( entries, function(entry){
              return entry.supportWanted;
            });
            that.setSearchTag(null, that.getWording('search.tag.supportwanted'));
            APP.setPageTitle( that.getWording('search.tag.supportwanted') ); // overwrite page title set in APP.route()
            that.currentSearchType = 'support-search';
            break;
          case 'forchildren':
            entriesFiltered = _.filter( entries, function(entry){
              return entry.forChildren;
            });
            that.setSearchTag(null, that.getWording('prop.forChildren'));
            APP.setPageTitle( that.getWording('prop.forChildren') ); // overwrite page title set in APP.route()
            break;
          case 'certified':
            entriesFiltered = _.filter( entries, function(entry){
              return entry.certified;
            });
            that.setSearchTag(null, that.getWording('search.tag.certified'));
            APP.setPageTitle( that.getWording('search.tag.certified') ); // overwrite page title set in APP.route()
            break;
          }

        }
      }
      // free search
      else {

        // blockSyncWithMap = true;

        if(that.inputField.is(':focus')) that.loadSuggestions(query);

        that.currentSearchType = 'free-search';
        
        entriesFiltered = _.filter( entries, function(entry){
          // in name?
          if( entry.name && entry.name.toLowerCase().indexOf(query) >= 0 ) return true;
          // in category?
          if( entry.category ) {
            var cat = that.getWording('cat.' + entry.category.name);
            if( cat.toLowerCase().indexOf(query) >= 0 ) return true;
          }
          // in subCategory?
          if( entry.subCategory ) {
            var subcat = that.getWording('cat.' + entry.subCategory);
            if( subcat.toLowerCase().indexOf(query) >= 0 ) return true;
          }
          // in short description?
          if( entry.descriptionShort ) {
            var needlePos = entry.descriptionShort.toLowerCase().indexOf(query);
            if( needlePos >= 0 ){
              foundCriteria[entry.id] = {foundInAttribute: 'descriptionShort', pos: needlePos, length: query.length};
              return true;
            }
          }
          // in support details?
          if( entry.supportWantedDetail ) {
            var needlePos = entry.supportWantedDetail.toLowerCase().indexOf(query);
            if( needlePos >= 0 ){
              foundCriteria[entry.id] = {foundInAttribute: 'supportWantedDetail', pos: needlePos, length: query.length};
              return true;
            }
          }
          // in description?
          if( entry.description ) {
            var needlePos = entry.description.toLowerCase().indexOf(query);
            if( needlePos >= 0 ){
              foundCriteria[entry.id] = {foundInAttribute: 'description', pos: needlePos, length: query.length};
              return true;
            }
          }
          // in speakerPublic?
          if( entry.speakerPublic ) {
            if( entry.speakerPublic.toLowerCase().indexOf(query) >= 0 ) return true;
          }
          // in parent's title?
          if( entry.parentOrgaId ) {
            var parent = APP.getDataManager().getOrgaById(entry.parentOrgaId);
            console.log(parent);
            if( parent && parent.name && parent.name.toLowerCase().indexOf(query) >= 0 ) return true;
          }

          return false;
        });
      }

      _.each(entriesFiltered, function(entry) {
        that.createEntryResult({
          entry: entry,
          targetContainertEl: that.resultsContainer,
          type: that.currentSearchType,
          foundCriteria: foundCriteria[entry.id]
        });
      });

      // print list button
      if(entriesFiltered.length > 0){
        that.createButton(
          {
            label: that.getWording('search.button.printList'),
            iconName: 'print',
            action: function(){
              // var title = that.inputField.val();
              var title = that.searchTag.html();
              APP.getPrintView().load('bookmarks', {title: title, entries: entriesFiltered});
            }
          }
        );
      }
      
      // nothing found info
      if(!entriesFiltered.length) {
        var action = function(){
          that.close();
        };

        that.createListResult(
          {
            iconClass: null,
            label: that.getWording('search.label.nothingfound'),
            subLabel: that.getWording('search.sublabel.nothingfound'),
            action: action,
            targetContainertEl: that.resultsContainer
          }
        );
      }

      that.say('listResultsLoaded', {records: entriesFiltered, blockSyncWithMap: blockSyncWithMap} );
    },

    // generic function to create a section header
    createSectionHeader: function( label, action ) {
      var that = this;
      
      const sectionHeader = $('<div />')
        .addClass('section-header')
        .append(label);
      
      if(action) sectionHeader
        .addClass('with-action')
        .click(function(){ action(); });
      
      that.resultsContainer.append(sectionHeader);
    },

    // generic function to create a section header
    createButton: function( options ) {
      var that = this;
      
      const btn = $('<button />')
        .addClass('btn btn-center grey darken-3')
        .append(options.label);

      if(options.iconName) {
        const icon = $('<i />')
          .addClass('material-icons ' + (options.iconPosition? options.iconPosition : 'left') )
          .append(options.iconName);
        btn.append(icon);
      }
      
      if(options.action) btn
        .addClass('with-action')
        .click(function(){ options.action(); });
      
      that.resultsContainer.append(btn);
    },

    setSearchTag: function(cssClass, wording, color){
      var that = this;

      that.searchTag
        .empty()
        .removeClass()        
        .addClass('search-tag active ' + cssClass)
        .append(wording);
        
      if (color) that.searchTag.css('background-color', color);

      that.inputField.hide();
    },

    addEvents: function(){
      var that = this;

      // call superclass
      this.base(arguments);
      
      // that.inputField.on('click', function(e){
      //   var val = that.inputField.val();
      //   if (val.length < 1) APP.getLegendView().show(true);
      //   that.view.addClass('active-search');
      // });

      that.inputField.on('input', function(e){
        var val = that.inputField.val();
        
        if (val === undefined || val.length < 1) APP.getLegendView().show(true);

        // stop timer that may exist from previous input
        if(that.timeout) clearTimeout(that.timeout);
        
        // triggered by keyboard input (load with delay)
        if(e.originalEvent !== undefined){
          if(val.length < 3) return;
          that.timeout = setTimeout(function(){
            APP.route('/search/' + encodeURI(val), val, null, true );
          }, 400);
        }
        // triggered manually (load instantly)
        else {
          APP.route('/search/' + encodeURI(val), val, null, true );
        }
      });

      // that.listen('detailViewOpened', function(){
      // that.hide();
      // });
      
      // that.listen('detailViewClosed', function(){
      // if( that.isActive() ) that.show();
      // else if(
      //   !APP.getEventView().isActive()
      //   && !APP.getIncludeView().isActive()
      // ) that.load();
      // });

      // that.listen('eventViewOpened', function(){
      // that.close();
      // });

      // that.listen('eventViewClosed', function(){
      // if( that.isActive() ) that.show();
      // else if(
      //   !APP.getDetailView().isActive()
      //   && !APP.getIncludeView().isActive()
      // ) that.load();
      // });

      // that.listen('includeViewOpened', function(){
      // that.close();
      // });
      
      // that.listen('includeViewClosed', function(){
      // if( that.isActive() ) that.show();
      // else if(
      //   !APP.getDetailView().isActive()
      //   && !APP.getEventView().isActive()
      // ) that.load();
      // });

      // that.listen('searchViewClosed', function(){
      // if(
      //   !APP.getDetailView().isActive()
      //   && !APP.getEventView().isActive()
      //   && !APP.getIncludeView().isActive()
      // ) that.load();
      // });

      that.listen('fetchedNewData', function(){
        that.load(that.inputField.val());
        APP.getRouter().loadFromUrl();
      });

      that.listen('filterSet', function(){
        var filter = APP.getActiveFilter();
        
        if( !filter ){
          that.close();
        }
        else if( filter.type ) {
          that.inputField.val( 'type:' + filter.type ).trigger( 'input' );
        }
        else if( filter.navigation ) {
          that.inputField.val( 'cat:' + filter.navigation ).trigger( 'input' );
        }
        else if( filter.subNavigation ) {
          that.inputField.val( 'subcat:' + filter.subNavigation ).trigger( 'input' );
        }
        else if( filter.tags ) {
          that.inputField.val( 'tag:' + filter.tags ).trigger( 'input' );
        }
      });

      that.listen('bookmarksChanged', function(){
        // react only in dashboard and bookmark mode
        var mode = that.inputField.val();
        if (mode ==  '' || mode == 'user:bookmarks') {
          that.load(mode);
        }
      });

    },

    reset: function(){
      var that = this;

      that.show();

      that.scrollContainer.scrollTop(0);

      that.inputField
        .val(null)
        .show();

      that.searchTag
        .removeClass('active')
        .removeClass (function (index, css) {
          return (css.match (/(^|\s)cat-\S+/g) || []).join(' ');
        })
        .empty();

      that.resultsContainer.empty();
        
      that.view.removeClass('active-search');
      // APP.getLegendView().close();
        
      if( APP.getUserDevice() == 'desktop') that.ps.update();
    },

    close: function(){
      var that = this;

      that.reset();
      that.view.removeClass('active');
      that.isActive(false);

      that.say('searchViewClosed');
    },

    changeLanguage: function(){
      var that = this;

      // if( APP.getDetailView().isActive() ) return;
      // if(that.isActive()) that.load( that.inputField.val() );
    }
  }

});
