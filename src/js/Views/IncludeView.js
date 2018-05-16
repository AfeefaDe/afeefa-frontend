import qx from 'qooxdoo/qx-oo.js';
 
import PerfectScrollbar from 'perfect-scrollbar';
 

 

export default qx.Class.define('IncludeView', {
	
  extend : View,
  type: 'singleton',

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
      that.view = $('<div />');
      that.view.attr('id', that.getViewId());

      // heading
      that.headingContainer = $('<div />').addClass('heading');
      that.heading = $('<h1 />');
      that.headingContainer.append(that.heading);
      that.view.append(that.headingContainer);

      // back button
      that.createBackBtn(function(){
        if (that.currentChapter.id != APP.getArea().wisdomRootId ) {
          APP.route('/chapter/' + APP.getArea().wisdomRootId, null, null, true);
        } else {
          APP.getRouter().backToLastKeyState();
        }
      });

      // scrollable content container
      that.scrollContainer  = $('<div />');
      that.scrollContainer.addClass('scroll-container');
      that.view.append(that.scrollContainer);

      $('#main-container').append(that.view);

      if( APP.getUserDevice() == 'desktop') that.ps = new PerfectScrollbar(that.scrollContainer[0]);

      that.setViewState(0);

      this.base(arguments);
    },

    // TODO option: modal
    // load: function( includeKey, url ){
    load: function( chapterID, cb ){
      var that = this;

      if( chapterID === undefined ) return;

      that.reset();
			
      // that.showCurtain(true);
      APP.loading(true);

      // that.setIncludeKey(includeKey);
			
      that.view.addClass('active');
      // that.view.addClass(includeKey);
      that.setViewState(1);
			
      that.say('includeViewOpened');
			
      APP.getDataManager().getChapterFromWisdom(chapterID, function(data){
        that.currentChapter = data;
        loadComplete();
        if(cb) cb();
      });
			
      function loadComplete(){
				
        // set url
        // APP.getRouter().setUrl('chapter', chapter.id + '/' + APP.getRouter().slugify(chapter.title), null);

        // fill mustaches with values
        // var filledHtml = that.fillMustaches(that.scrollContainer.html());
        // that.scrollContainer.html(filledHtml);


        // set heading
        that.heading.empty().append(that.currentChapter.title);

        // make URLs a link
        // var content = APP.getUtility().urlify(chapter.content);

        that.scrollContainer.empty().append(that.currentChapter.content);

        // catch all links and handle internal ones separately
        that.scrollContainer.find('a').click(function(e){
          e.preventDefault();
          var url = $(this).attr('href');

          // load chapter
          if (url.indexOf('afeefa://chapter/') > -1 ) {
            var referredChapterID = url.split('/')[3];
            // if(referredChapterID) that.load(referredChapterID);
            if(referredChapterID) APP.route('/chapter/' + referredChapterID, null, null, true);
          }
          // load chapter
          else if (url.indexOf('afeefa://orga/') > -1 ) {
            var referredOrgaID = url.split('/')[3];
            var orga = APP.getDataManager().getOrgaById(referredOrgaID);
            if (orga) APP.route(APP.getRouter().getFrontendUrlForEntry(orga), orga.name);
          }
          // load afeefa view
          else if(url.indexOf(window.origin) > -1 ){
            APP.getRouter().loadFromUrl(url);
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

    addEvents: function(){
      var that = this;

      // call superclass
      this.base(arguments);
			
      // that.view.click(function(){
      // 	that.say('includeViewClicked', {viewState: that.getViewState()} );
      // });

      that.listen('searchViewLoaded', function(){
        that.close();
      });

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