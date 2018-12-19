import qx from 'qooxdoo/qx-oo.js';

export default qx.Class.define('AreaView', {
	
  extend : View,
  type: 'singleton',

  construct: function(){
    var that = this;

    that.setViewId('areaView');
  },

  members : {
		
    render: function(){
      var that = this;

      // view container
      that.view = $('<div />')
        .attr('id', that.getViewId())
        .hover(
          function(){
            that.open();
          },
          function(){
            that.close();
          }
        );
				
      $('#main-container').append(that.view);
			
      // menu + typo logo
      var container = $('<div />').addClass('herz');
      that.view.append(container);
			
      that.menuBtn = $('<div />')
        .attr('id', 'menu-btn')
        .addClass('button')
        .click(function(){
          that.say('mainMenuBtnClicked');
        });
      container.append(that.menuBtn);
			
      that.logo = $('<div />')
        .attr('id', 'typo-logo');
      container.append(that.logo);
			
      // area
      that.area = $('<div />')
        .attr('id', 'current-area');
      that.view.append(that.area);

      // language
      that.language = $('<div />')
        .attr('id', 'current-language')
        .click(function(){
          APP.getLanguageView().open();
        });
      that.view.append(that.language);

      this.base(arguments);
			
      that.load();
    },
		
    load: function(){
      var that = this;
			
      that.area.empty().append( APP.getArea().label );
      that.language.empty().append( that.getWording('lan.'+APP.getLM().getCurrentLang()) );
			
      // just hiding
      // if (APP.getArea().dataKey == 'leipzig') that.language.hide();
    },

    open: function(){
      var that = this;

      that.isActive(true);
      that.view.addClass('active');
    },

    addEvents: function(){
      // call superclass
      this.base(arguments);
    },

    reset: function(){
    },

    changeLanguage: function(){
      var that = this;
      that.load();
    },

    close: function(){
      var that = this;
			
      that.view.removeClass('active');
      that.isActive(false);
    }
  }

});