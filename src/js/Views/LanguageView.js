import qx from 'qooxdoo/qx-oo.js';
 
import PerfectScrollbar from 'perfect-scrollbar';
 

 

export default qx.Class.define('LanguageView', {
	
  extend : View,
  type: 'singleton',

  construct: function(){
    var that = this;
    that.setViewId('languageView');
  },

  members : {
		
    render: function(){
      var that = this;

      // view container
      that.view = $('<div />');
      that.view.attr('id', that.getViewId());

      that.languageTranslations = {
        de: 'Deutsch',
        'en': 'English',
        ar: 'العربية',
        'fa': 'فارسی',
        'fr': 'Français',
        'ru': 'русский',
        'ps': 'پښتو',
        'ku': 'کوردی',
        'es': 'español',
        'sq': 'Shqip',
        'sr': 'Српски',
        'ti': 'ቋንቋ ትግርኛ',
        'tr': 'Türkçe',
        'ur': 'اردو'
      };

      // list container
      that.listContainer = $('<div />')
        .addClass('modal-list');

      if( APP.getUserDevice() == 'desktop') that.ps = new PerfectScrollbar(that.listContainer[0]);
      that.view.append(that.listContainer);

      that.listItems = [];

      _.each( APP.getConfig().languages, function(lang){
        var listItem = $('<div />')
          .addClass('list-item ' + lang)
          .click(function(){
            that.close();

            localStorage.setItem('languageFrozen', lang);

            APP.getDataManager().getUITranslations(lang, function(data){
              APP.getLM().setBib(data);

              // change language if different from currently selected one
              if( lang != APP.getLM().getCurrentLang() )
                that.say('languageChanged', lang);
            });
          });
				
        var label = $('<div />')
          .addClass('list-item-label');

        listItem.append(label);

        that.listItems.push( {el: listItem, label: label, lang: lang} );

        that.listContainer.append(listItem);
      });
			
      $('#main-container').append(that.view);

      this.base(arguments);
    },

    load: function(){
      var that = this;

      _.each( that.listItems, function(item){
        // highlight current language
        item.el.removeClass('active');
        if( item.el.hasClass( APP.getLM().getCurrentLang() ) )
          item.el.addClass('active');
				
        // make labels
        item.label
          .empty()
          .append( that.languageTranslations[item.lang] )
          .append( $('<span />').append(that.getWording('lan.'+item.lang)) );
      });
    },

    open: function( cb ){
      var that = this;

      // set optional callback to call after language was selected from the list
      if(cb) that.cb = cb;

      that.isActive(true);
      that.load();

      that.view.addClass('active');
      that.showCurtain(true);

      if( APP.getUserDevice() == 'desktop') that.ps.update();
    },

    addEvents: function(){
      var that = this;

      that.listen('LanguageViewRendered', function(){
        if( !localStorage.getItem('languageFrozen') ){
          // that.open();
        }
      });

      // call superclass
      this.base(arguments);
    },

    reset: function(){
    },

    changeLanguage: function(){
    },

    close: function(){
      var that = this;
			
      that.view.removeClass('active');
      that.showCurtain(false);

      // callback may have been defined when view was opened
      if(that.cb) that.cb();
      that.cb = null;
		
      that.isActive(false);
    }
  }

});