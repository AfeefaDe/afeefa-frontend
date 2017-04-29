qx.Class.define("EventView", {
    
  extend : View,
  type: "singleton",

  properties: {
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

      // form container
      that.scrollContainer = $("<div />")
          .addClass('scroll-container list-results');
      if (APP.getUserDevice() == 'desktop') that.scrollContainer.perfectScrollbar();
      that.view.append(that.scrollContainer);     

      this.base(arguments);
    },

    load: function(query){
        var that = this;

        that.heading.empty().append('Veranstaltungen');

        that.createSectionHeader('heute');

        _.each(APP.getDataManager().getAllEvents( {timeSpan: 'today'} ).slice(0, 3), function(entry) {
          that.createEntryResult( {entry: entry, targetContainertEl: that.scrollContainer} );
        });

        that.view.addClass('active');
        that.isActive(true);

        // if( query === undefined ) query = '';
        // query = query.toLowerCase();
        
        // if(query){
        //   that.scrollContainer.empty();
        //   that.loadResults(query);
        // } else {
        //   that.reset();
        //   that.loadDashboard();
        // }

        // that.inputField
        //   .attr('placeholder', that.getWording('search.placeholder'))
        //   .show();

        // // tooltip
        // that.createTooltip(
        //   that.menuBtn,
        //   function(){
        //     return that.getWording('menu.menu');
        //   }(),
        //   'hover',
        //   'bottom',
        //   'desktop'
        // );

        // // tooltip
        // that.createTooltip(
        //   that.refugeeBtn,
        //   function(){
        //     return that.getWording('menu.refugee');
        //   }(),
        //   'hover',
        //   'bottom',
        //   'desktop'
        // );

        // that.isActive(true);
        // that.maximize();
        // that.view.addClass('active');
        // that.say('searchResultsLoaded');

        // return that;
    },

    // generic function to create a section header
    createSectionHeader: function( label ) {
      var that = this;
      
      const sectionHeader = $("<div />")
        .addClass('section-header')
        .append(label);
      
      that.scrollContainer.append(sectionHeader);
    },

    addEvents: function(){
      var that = this;

      // call superclass
      // this.base(arguments);
      
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

      // that.listen('fetchedNewData', function(){
      //   if( APP.getDetailView().isActive() ) that.hide();
      //   else that.load(that.inputField.val());
      // });

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

    changeLanguage: function(){
        var that = this;

        if( APP.getDetailView().isActive() ) return;
        if(that.isActive()) that.load( that.inputField.val() );
    }
  }

});
