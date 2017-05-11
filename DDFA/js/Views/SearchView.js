qx.Class.define("SearchView", {
    
  extend : View,
  type: "singleton",

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
      that.view = $("<div />");
      that.view.attr('id', that.getViewId());

      $('#main-container').append(that.view);

      // search bar
      that.searchBar = $("<div />")
        .attr('id', 'search-bar');
      that.view.append(that.searchBar);

      // menu button
      that.menuBtn = $("<div />")
        .addClass('button menu-btn');
      
      that.searchBar.append(that.menuBtn);

      // refugee button
      that.refugeeBtn = $("<div />")
        .addClass('button refugee-btn')
        .click(function(){
          APP.getIncludeView().load( 'refugeeGuide' );
        });
     
      that.searchBar.append(that.refugeeBtn);

      // filter button
      that.filterBtn = $("<div />")
        .addClass('button filter-btn')
        .click(function(){
          if( APP.getLegendView().view.hasClass('active') )
            APP.getLegendView().close();
          else
            APP.getLegendView().show();
        });
      that.searchBar.append(that.filterBtn);

      // cancel button
      that.cancelBtn = $("<div />")
        .addClass('button cancel-btn')
        .click(function(){
          that.close();
        });
      that.searchBar.append(that.cancelBtn);

      // input field
      that.inputField = $("<input />")
        .attr('type', 'text');
      that.searchBar.append(that.inputField);

      // search tags
      that.searchTag = $("<span />")
        .click(function(){
          if( APP.getUserDevice() == 'mobile') that.maximize();
          // that.inputField.trigger( "input" );
        });
      that.searchBar.append(that.searchTag);      

      // results area
      that.scrollContainer = $("<div />")
        .addClass('scroll-container list-results');

      if( APP.getUserDevice() == 'desktop') that.scrollContainer.perfectScrollbar();

      that.view.append(that.scrollContainer);

      // map area on mobile
      if( APP.getUserDevice() == 'mobile'){
        that.mapArea = $("<div />")
          .attr('id', 'map-area')
          .click(function(){
            that.minimize();
          });
        that.view.append(that.mapArea);
      }
      
      this.base(arguments);
    },

    load: function(query){
        var that = this;

        if( query === undefined ) query = '';
        query = query.toLowerCase();
        
        if(query){
          that.scrollContainer.empty();
          that.loadResults(query);
        } else {
          that.reset();
          that.loadDashboard();
        }

        that.inputField
          .attr('placeholder', that.getWording('search.placeholder'))
          .show();

        // tooltip
        that.createTooltip(
          that.menuBtn,
          function(){
            return that.getWording('menu.menu');
          }(),
          'hover',
          'bottom',
          'desktop'
        );

        // tooltip
        that.createTooltip(
          that.refugeeBtn,
          function(){
            return that.getWording('menu.refugee');
          }(),
          'hover',
          'bottom',
          'desktop'
        );

        that.isActive(true);
        that.maximize();
        that.view.addClass('active');
        that.say('searchResultsLoaded');

        return that;
    },

    loadDashboard: function(){
      var that = this;

      // highlights
      // that.createSectionHeader( that.getWording('search.label.highlights') );

      // iwgr
      // var action = function(){
      //   APP.getLegendView().setFilter( {tags: 'iwgr'} );
      //   window.location.hash = 'iwgr';
      // };
      // that.createListResult('iwgr', that.getWording('search.label.iwgr'), that.getWording('search.sublabel.iwgr'), action );

      // upcoming events
      // that.createSectionHeader( that.getWording('search.label.eventstoday'), function(){
      //   that.inputField.val('events').trigger( "input" );
      // });
      var highlightArea = $("<div />")

      that.createSectionHeader( that.getWording('search.label.eventstoday') );
      
      _.each(APP.getDataManager().getAllEvents( {timeSpan: 'onlyAtDayX', atDate: moment()} ).slice(0, 3), function(entry) {
        that.createEntryResult( {entry: entry, targetContainertEl: that.scrollContainer} );
      });
              
      that.createButton(
        {
          label: that.getWording('search.button.events'),
          iconName: 'today',
          action: function(){
            APP.getEventView().load();
          }
        }
      );

      that.createSectionHeader( that.getWording('search.label.lists') );

      // support wanted
      var action = function(){
        that.inputField.val('support wanted').trigger( "input" );
      };
      that.createListResult(
        {
          iconClass: 'support-wanted',
          label: that.getWording('search.label.supportwanted'),
          subLabel: that.getWording('search.sublabel.supportwanted'),
          action: action,
          targetContainertEl: that.scrollContainer
        }
      );

      // for children
      var action = function(){
        that.inputField.val(that.getWording('prop.forChildren')).trigger( "input" );
      };
      that.createListResult(
        {
          iconClass: 'for-children',
          label: that.getWording('search.label.forchildren'),
          subLabel: that.getWording('search.sublabel.forchildren'),
          action: action,
          targetContainertEl: that.scrollContainer
        }
      );

      // for women
      var action = function(){
        that.inputField.val('#frauen').trigger( "input" );
      };
      that.createListResult(
        {
          iconClass: 'for-women',
          label: that.getWording('search.label.forwomen'),
          subLabel: that.getWording('search.sublabel.forwomen'),
          action: action,
          targetContainertEl: that.scrollContainer
        }
      );

      // certified by SFR
      var action = function(){
        that.inputField.val('certified').trigger( "input" );
      };
      that.createListResult(
        {
          iconClass: 'certified',
          label: that.getWording('search.label.certified'),
          subLabel: that.getWording('search.sublabel.certified'),
          action: action,
          targetContainertEl: that.scrollContainer
        }
      );

      that.createSectionHeader( that.getWording('search.label.activity') );
     
      // add new entry
      var action = function(){
        APP.getFormView().load( 'newEntry' );
      };
      that.createListResult(
        {
          iconClass: 'add-entry',
          label: that.getWording('search.label.addentry'),
          subLabel: that.getWording('search.sublabel.addentry'),
          action: action,
          targetContainertEl: that.scrollContainer
        }
      );

      var action = function(){
        APP.getFormView().load( 'feedback' );
      };
      that.createListResult(
        {
          iconClass: 'feedback',
          label: that.getWording('form.heading.feedback'),
          subLabel: that.getWording('search.sublabel.feedback'),
          action: action,
          targetContainertEl: that.scrollContainer
        }
      );

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
          targetContainertEl: that.scrollContainer
        }
      );

      // about afeefa
      var action = function(){
        APP.getIncludeView().load('about');
      };
      that.createListResult(
        {
          iconClass: 'about',
          label: that.getWording('search.label.about'),
          subLabel: that.getWording('search.sublabel.about'),
          action: action,
          targetContainertEl: that.scrollContainer
        }
      );
    },

    loadResults: function( query ) {
      var that = this;

      that.view.addClass('active-search');

      // const entries = _.filter(APP.getData().entries, function(entry){
      //   return entry.external;
      // });
      const entries = APP.getData().entries;

      var entriesFiltered;

      // predefined queries: 
      if( query.indexOf(':') >= 0 ){
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

          that.setSearchTag("type-" + operationQuery, that.getWording('search.label.type.' + operationQuery));
        }

        // category listing
        if(operator == 'cat' ) {
          entriesFiltered = _.filter( entries, function(entry){
              return (entry.category && entry.category.name == operationQuery);
          });

          that.setSearchTag("cat-" + operationQuery, that.getWording('cat.' + operationQuery));
        }

        // sub category listing
        else if(operator == 'subcat' ) {
          entriesFiltered = _.filter( entries, function(entry){
            
            if( entry.subCategory && entry.subCategory == operationQuery ) {
              return true;
            }
          });
          
          var searchTagCssClass = APP.getMainCategory(operationQuery).name;
          that.setSearchTag("cat-" + searchTagCssClass, that.getWording('cat.' + operationQuery));
        }

        // tag listing
        else if(operator == 'tag' ) {
          // entriesFiltered = _.filter( entries, function(entry){
          entriesFiltered = _.filter( APP.getDataManager().getAllEvents(), function(entry){
              return ( entry.tags && (entry.tags.indexOf(operationQuery) > -1) );
          });
          
          var tagLabel = that.getWording('tag.' + operationQuery) ? that.getWording('tag.' + operationQuery) : operationQuery;
          that.setSearchTag("tag-" + operationQuery, tagLabel);
        }
      }
      
      // events
      else if( query == 'events' ){
        entriesFiltered = APP.getDataManager().getAllEvents();
        
        that.setSearchTag(null, that.getWording('search.label.upcomingevents'));
      }
      
      // support wanted
      else if( query == 'support wanted' ){
        entriesFiltered = _.filter( entries, function(entry){
          return entry.supportWanted;
        });

        that.setSearchTag(null, that.getWording('search.tag.supportwanted'));
      }

      // children
      else if( query == that.getWording('prop.forChildren').toLowerCase() ){
        entriesFiltered = _.filter( entries, function(entry){
          return entry.forChildren;
        });

        that.setSearchTag(null, that.getWording('prop.forChildren'));
      }

      // certified
      else if( query == 'certified' ){
        entriesFiltered = _.filter( entries, function(entry){
          return entry.certified;
        });

        that.setSearchTag(null, that.getWording('search.tag.' + query));
      }
      
      // free search
      else {
        entriesFiltered = _.filter( entries, function(entry){
          // in name?
          if( entry.name.toLowerCase().indexOf(query) >= 0 ) return true;
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
          // children?
          if( entry.forChildren ) {
            // the query string occurs in the "for children" property´wording of the selected language
            var children = that.getWording('prop.forChildren');
            if( children.toLowerCase().indexOf(query) >= 0 ) return true;
          }
          // in description?
          if( entry.descriptionShort ) {
            if( entry.descriptionShort.toLowerCase().indexOf(query) >= 0 ) return true;
          }
          // in description?
          if( entry.description ) {
            if( entry.description.toLowerCase().indexOf(query) >= 0 ) return true;
          }
          // in speakerPublic?
          if( entry.speakerPublic ) {
            if( entry.speakerPublic.toLowerCase().indexOf(query) >= 0 ) return true;
          }

          return false;
        });
      }

      _.each(entriesFiltered, function(entry) {
        that.createEntryResult( {entry: entry, targetContainertEl: that.scrollContainer} );
      });
      
      // nothing found info
      var action = function(){
        that.close();
      };
      if(!entriesFiltered.length) {
        that.createListResult(
          {
            iconClass: null,
            label: that.getWording('search.label.nothingfound'),
            subLabel: that.getWording('search.sublabel.nothingfound'),
            action: action,
            targetContainertEl: that.scrollContainer
          }
        );
      }
    },

    // generic function to create a section header
    createSectionHeader: function( label, action ) {
      var that = this;
      
      const sectionHeader = $("<div />")
        .addClass('section-header')
        .append(label);
      
      if(action) sectionHeader
        .addClass('with-action')
        .click(function(){ action(); });
      
      that.scrollContainer.append(sectionHeader);
    },

    // generic function to create a section header
    createButton: function( options ) {
      var that = this;
      
      const btn = $("<button />")
        .addClass('btn btn-center grey darken-3')
        .append(options.label);

      if(options.iconName) {
        const icon = $("<i />")
          .addClass('material-icons ' + (options.iconPosition? options.iconPosition : 'left') )
          .append(options.iconName);
        btn.append(icon);
      };
      
      if(options.action) btn
        .addClass('with-action')
        .click(function(){ options.action(); });
      
      that.scrollContainer.append(btn);
    },

    setSearchTag: function(cssClass, wording){
      var that = this;

      that.searchTag
        .empty()
        .removeClass()        
        .addClass("search-tag active " + cssClass)
        .append(wording);

      that.inputField.hide();
    },

    addEvents: function(){
      var that = this;

      // call superclass
      this.base(arguments);
      
      that.menuBtn.click(function(){
        that.say('mainMenuBtnClicked');
      });

      that.inputField.focus(function(){
        that.load(that.inputField.val());
        that.say('searchFieldFocused');
      });

      that.inputField.on('input', function(){
        that.load(that.inputField.val());
      });

      that.listen('detailViewOpened', function(){
        that.hide();
      });

      that.listen('detailViewClosed', function(){
        that.show();
        if( !that.isActive() ) that.load();
      });

      that.listen('includeViewOpened', function(){
        that.close();
      });

      that.listen('fetchedNewData', function(){
        if( APP.getDetailView().isActive() ) that.hide();
        else that.load(that.inputField.val());
      });

      that.listen('filterSet', function(){
        var filter = APP.getActiveFilter();
        
        if( !filter ){
          that.close();
        }
        else if( filter.type ) {
          that.inputField.val( 'type:' + filter.type ).trigger( "input" );
        }
        else if( filter.category ) {
          that.inputField.val( 'cat:' + filter.category ).trigger( "input" );
        }
        else if( filter.subCategory ) {
          that.inputField.val( 'subcat:' + filter.subCategory ).trigger( "input" );
        }
        else if( filter.tags ) {
          that.inputField.val( 'tag:' + filter.tags ).trigger( "input" );
        }
      });

    },

    minimize: function(){
      var that = this;

      // that.show();
      // that.isActive(false);
      that.view.addClass('minimized');
    },

    maximize: function(){
      var that = this;

      that.show();
      that.view.removeClass('minimized');
    },

    reset: function(){
        var that = this;

        that.show();
        that.maximize();

        that.scrollContainer.scrollTop(0);

        that.inputField
          .val(null)
          .show();

        that.searchTag
          .removeClass("active")
          .removeClass (function (index, css) {
            return (css.match (/(^|\s)cat-\S+/g) || []).join(' ');
          })
          .empty();

        that.scrollContainer.empty();
        
        that.view.removeClass('active-search');
        
        if( APP.getUserDevice() == 'desktop') that.scrollContainer.perfectScrollbar('update');
    },

    close: function(){
        var that = this;

        that.reset();
        that.view.removeClass('active');
        that.isActive(false);

        if( APP.getUserDevice() == 'desktop') that.load();

        that.say('searchViewClosed');
    },

    changeLanguage: function(){
        var that = this;

        if( APP.getDetailView().isActive() ) return;
        if(that.isActive()) that.load( that.inputField.val() );
    }
  }

});
