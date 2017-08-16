qx.Class.define("EventView", {
    
  extend : View,
  type: "singleton",

  properties: {
    currentOptions: {}
  },

  construct: function(){
    var that = this;

    that.setViewId('eventView');
  },

  members : {
      
    render: function(){
      var that = this;

      // view container
      that.view = $("<div />");
      that.view.attr('id', that.getViewId());

      $('#main-container').append(that.view);

      // heading
      var headingContainer = $("<div />").addClass('heading');
      that.heading = $("<h1 />");
      headingContainer.append(that.heading);
      that.view.append(headingContainer);

      // back button
      that.createBackBtn(function(){that.close();});

      // FILTERS
      that.createFilters();

      // form container
      that.scrollContainer = $("<div />")
          .addClass('scroll-container list-results');
      if (APP.getUserDevice() == 'desktop') that.scrollContainer.perfectScrollbar();
      that.view.append(that.scrollContainer);

      this.base(arguments);
    },

    createFilters: function(query){
      var that = this;

      that.filters = $("<div />")
        .addClass('filters');
      that.view.append(that.filters);

      that.eventFilter = $("<div />")
        .addClass('event-filter');
      that.filters.append(that.eventFilter);

      that.filterOptions = ['today', 'thisWeek', 'nextWeek', 'all'];
      
      _.each(that.filterOptions, function(optionValue){
        
        var optionEl = $("<div />")
          .addClass('option-value')
          .click(function(){
            that.load( {filter: optionValue} );
          });
        
        that.eventFilter.append(optionEl);
        that['optionEl-'+optionValue] = optionEl;
      });
    },

    setFilter: function( options ){
      var that = this;

      if(options === undefined) options = null;
      
      var eventSets = [];

      if(options === 'today'){
        var eventsOnlyToday = APP.getDataManager().getAllEvents( {timeSpan: 'onlyAtDayX', atDate: moment()} );
        var eventsAlsoToday = APP.getDataManager().getAllEvents( {timeSpan: 'alsoToday'} );
        eventSets = [
          {
            heading: null,
            events: eventsOnlyToday
          },
          {
            heading: null,
            events: eventsAlsoToday
          }
        ];
      }
      else if(options === 'thisWeek'){
        
        // events for each day of the week
        var daysLeftInWeek = moment().endOf('week').diff(moment().today, 'days');
        var eventSetsPerDay = [];
        for(var i=0;i<=daysLeftInWeek;i++){
          var atDate = moment().add(i,'days');
          var eventsOnDayX = APP.getDataManager().getAllEvents( {timeSpan: 'onlyAtDayX', atDate: atDate} );
          if(eventsOnDayX.length < 1) continue;
          eventSetsPerDay.push(
            {
              heading: ( atDate.isSame(moment(), 'd') )? that.getWording('term.today') : atDate.format('dddd Do MMMM'),
              events: eventsOnDayX
            }
          );
        }
        
        // other period events in this week
        var eventsAlsoThisWeek = APP.getDataManager().getAllEvents( {timeSpan: 'alsoThisWeek'} );
        
        eventSets = _.union(eventSetsPerDay, [
          {
            heading: that.getWording('events.alsoThisWeek'),
            events: eventsAlsoThisWeek
          }
        ]);
      }
      else if(options === 'nextWeek'){
        
        // events for each day of the week
        var eventSetsPerDay = [];
        for(var i=0;i<=6;i++){
          var atDate = moment().weekday(7).add(i, 'days');
          var eventsOnDayX = APP.getDataManager().getAllEvents( {timeSpan: 'onlyAtDayX', atDate: atDate} );
          if(eventsOnDayX.length < 1) continue;
          eventSetsPerDay.push(
            {
              heading: atDate.format('dddd Do MMMM'),
              events: eventsOnDayX
            }
          );
        }
        
        eventSets = eventSetsPerDay;
      }
      else {
        eventSets = [
          {
            heading: null,
            events: APP.getDataManager().getAllEvents()
          }
        ];
      }

      that['optionEl-'+options].addClass('active');

      return eventSets;
    },

    load: function( options ){
        var that = this;
        
        that.reset();
        that.loadUIVocab();

        if(options === undefined) options = { filter: 'today' };
        that.setCurrentOptions(options);

        var eventSets = that.setFilter( options.filter );

        _.each(eventSets, function(set, i) {
          if(set.heading) that.createSectionHeader(set.heading, (i==0)? 'no-top-margin' : null);
          
          _.each(set.events, function(entry) {
            that.createEntryResult( {entry: entry, targetContainertEl: that.scrollContainer} );
          });
        });

        that.say('listResultsLoaded', {records: _.flatten( _.pluck(eventSets, 'events'), true)} );

        that.view.addClass('active');
        that.isActive(true);
        that.say('eventViewOpened');
    },

    // generic function to create a section header
    createSectionHeader: function( label, cssClass ) {
      var that = this;
      
      const sectionHeader = $("<div />")
        .addClass('section-header');

      if(cssClass) sectionHeader.addClass(cssClass);
      
      const line  = $("<span />")
        .addClass('section-header-line');
      sectionHeader.append(line);
      
      const labelEl  = $("<div />")
        .addClass('section-header-label')
        .append(label);
      sectionHeader.append(labelEl);
      
      that.scrollContainer.append(sectionHeader);
    },

    addEvents: function(){
      var that = this;

      // call superclass
      this.base(arguments);
      
      that.listen('detailViewOpened', function(){
        that.hide();
      });

      that.listen('detailViewClosed', function(){
        if(that.isActive) that.show();
        // if( !that.isActive() ) that.load();
      });

      that.listen('includeViewOpened', function(){
        that.close();
      });

      that.listen('filterSet', function(){
        that.close();
      });

      that.listen('fetchedNewData', function(){
        if(that.isActive()) that.load(that.getCurrentOptions());
      });

      // that.listen('filterSet', function(){
      //   var filter = APP.getActiveFilter();
        
      //   if( !filter ){
      //     that.close();
      //   }
      //   else if( filter.type ) {
      //     that.inputField.val( 'type:' + filter.type ).trigger( "input" );
      //   }
      //   else if( filter.category ) {
      //     that.inputField.val( 'cat:' + filter.category ).trigger( "input" );
      //   }
      //   else if( filter.subCategory ) {
      //     that.inputField.val( 'subcat:' + filter.subCategory ).trigger( "input" );
      //   }
      //   else if( filter.tags ) {
      //     that.inputField.val( 'tag:' + filter.tags ).trigger( "input" );
      //   }
      // });

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

        _.each(that.filterOptions, function(optionValue){
          that['optionEl-'+optionValue].removeClass('active');
        });

        that.setCurrentOptions(null);

        // that.show();
        // that.maximize();

        // that.scrollContainer.scrollTop(0);

        // that.inputField
        //   .val(null)
        //   .show();

        // that.searchTag
        //   .removeClass("active")
        //   .removeClass (function (index, css) {
        //     return (css.match (/(^|\s)cat-\S+/g) || []).join(' ');
        //   })
        //   .empty();

        that.scrollContainer.empty();
        
        if( APP.getUserDevice() == 'desktop') that.scrollContainer.perfectScrollbar('update');
    },

    close: function(){
        var that = this;

        that.reset();
        that.view.removeClass('active');
        that.isActive(false);

        that.say('eventViewClosed');
    },

    loadUIVocab: function(){
      var that = this;
      
      that.heading.empty().append( that.getWording('events.heading') );
      
      _.each(that.filterOptions, function(optionValue){
        that['optionEl-'+optionValue].empty().append(that.getWording('term.'+optionValue));
      });
    },

    changeLanguage: function(){
    }
  }

});
