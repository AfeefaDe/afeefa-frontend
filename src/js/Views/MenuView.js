import qx from 'qooxdoo/qx-oo.js';
import PerfectScrollbar from 'perfect-scrollbar';
import Hammer from 'hammerjs'

export default qx.Class.define("MenuView", {

  extend: View,
  type: "singleton",

  construct: function () {
    var that = this;
    that.setViewId('menuView');
  },

  members: {

    render: function () {
      var that = this;

      // view container
      that.view = $("<div />");
      that.view.attr('id', that.getViewId());
      $('#main-container').append(that.view);

      // scrollable content container
      if (APP.getUserDevice() == 'desktop') that.ps = new PerfectScrollbar(that.view[0]);

      // menu
      that.menu = $("<div />");
      that.menu.attr('id', 'main-menu');
      that.view.append(that.menu);

      // logo
      var a = $('<div />')
        .attr('id', 'logo');
      that.logo = $('<img />').attr({
        'src': '/' + APP.getConfig().imgPath + 'afeefa_light.svg',
        alt: 'Afeefa Logo',
        title: 'Afeefa Logo'
      });
      a.append(that.logo);
      that.menu.append(a);

      // btn add
      that.addBtn = $('<div />').addClass('item add');
      that.addBtnLabel = $('<a />')
        .attr('href', '/add');
      that.addBtn.append(that.addBtnLabel);
      that.menu.append(that.addBtn);

      // btn about
      that.aboutBtn = $('<div />').addClass('item about');
      that.aboutBtnLabel = $('<a />')
        .attr('href', 'https://about.afeefa.de')
        .attr('target', '_blank');
      that.aboutBtn.append(that.aboutBtnLabel);
      that.menu.append(that.aboutBtn);

      // btn press
      that.pressBtn = $('<div />').addClass('item press');
      that.pressBtnLabel = $('<a />')
        .attr('href', 'https://about.afeefa.de/presse')
        .attr('target', '_blank');
      that.pressBtn.append(that.pressBtnLabel);
      that.menu.append(that.pressBtn);

      // other areas
      _.each(APP.getData().areas, function (area) {
        if (!area.inMainMenu) return;
        var areaBtn = $('<div />').addClass('item');
        areaBtnLabel = $('<a />')
          .append("Afeefa " + area.label)
          .attr('href', area.redirect)
          .attr('target', '_blank');
        areaBtn.append(areaBtnLabel);
        that.menu.append(areaBtn);
      });

      // btn facebook
      that.facebookBtn = $('<div />').addClass('item facebook');
      that.facebookBtnLabel = $('<a />')
        .attr('href', 'https://www.facebook.com/afeefa.de')
        .attr('target', '_blank');
      that.facebookBtn.append(that.facebookBtnLabel);
      that.menu.append(that.facebookBtn);

      // btn imprint
      that.imprintBtn = $('<div />').addClass('item imprint');
      that.imprintBtnLabel = $('<a />')
        .attr('href', 'https://about.afeefa.de/impressum')
        .attr('target', '_blank');
      that.imprintBtn.append(that.imprintBtnLabel);
      that.menu.append(that.imprintBtn);

      // team of charge
      var teamOfCharge = $('<div />')
        .addClass('teamOfCharge');

      that.teamOfCharge_link = $('<a />').attr('target', '_blank');
      teamOfCharge.append(that.teamOfCharge_link);
      that.teamOfCharge_img = $('<img />');
      that.teamOfCharge_link.append(that.teamOfCharge_img);

      that.teamOfCharge_text = $('<p />');
      teamOfCharge.append(that.teamOfCharge_text);

      var contact = $('<a />')
        .addClass('teamOfCharge-contact')
        .attr('href', '/feedback')
        .append('<strong>Kontaktieren</strong>')
        .click(function (e) {
          e.preventDefault();
          that.close();
          APP.route('/feedback', that.getWording('form.heading.feedback'), null);
        });
      teamOfCharge.append(contact);

      that.menu.append(teamOfCharge);

      that.donationNote = $('<p />');
      that.menu.append(that.donationNote);

      var fundingNote = $('<p />')
        .addClass('fundingNote')
        .append('Gefördert durch den Freistaat Sachsen im Rahmen des Landesprogramms Integrative Maßnahmen');
      that.menu.append(fundingNote);

      // fb like btn
      // that.menu.append('<div class="fb-like" data-href="https://www.facebook.com/afeefa.de" data-layout="button" data-action="like" data-show-faces="false" data-share="false"></div>');

      this.base(arguments);
    },

    addEvents: function () {
      var that = this;

      // call superclass
      this.base(arguments);

      that.addBtn.click(function (e) {
        e.preventDefault();
        that.close();
        APP.route('/add', that.getWording('search.label.addentry'), null);
      });

      that.listen('curtainclicked', function () {
        that.close();
      });

      that.listen('mainMenuBtnClicked', function () {
        that.load();
      });

      // interferring with other left shifting menus
      that.listen('languageMenuOpened', function () {
        that.menu.addClass('hidden');
      });

      that.listen('shiftMenuClosed', function () {
        that.menu.removeClass('hidden');
      });

      ////////////////////
      // swipe gestures //
      ////////////////////
      var hammer = new Hammer(that.view[0]);
      hammer.on('swipeleft', function (ev) {
        that.close();
      });

    },

    load: function () {
      var that = this;

      that.reset();

      $('#main-container').addClass('shifted');
      that.view.addClass('active');

      that.addBtnLabel.append(that.getWording('search.label.addentry'));
      that.aboutBtnLabel.append(that.getWording('menu.about'));
      that.pressBtnLabel.append(that.getWording('menu.press'));
      that.imprintBtnLabel.append(that.getWording('menu.imprint'));
      that.facebookBtnLabel.append(that.getWording('menu.facebook'));
      that.teamOfCharge_text
        .append($('<span />').append('Afeefa ' + APP.getArea().label + ' ' + that.getWording('menu.teamOfCharge') + ':'))
        .append('<br>')
        .append(APP.getArea().teamOfCharge.name);
      that.teamOfCharge_link.attr('href', APP.getArea().teamOfCharge.url);
      that.teamOfCharge_img.attr('src', '/' + APP.getConfig().imgPath + APP.getArea().teamOfCharge.img);
      that.donationNote.append(APP.getArea().donationText);
    },

    reset: function () {
      var that = this;

      that.addBtnLabel.empty();
      that.aboutBtnLabel.empty();
      that.pressBtnLabel.empty();
      that.imprintBtnLabel.empty();
      that.facebookBtnLabel.empty();
      that.teamOfCharge_text.empty();
      that.donationNote.empty();

    },

    close: function () {
      var that = this;

      $('#main-container').removeClass('shifted');
      that.view.removeClass('active');
    },

    changeLanguage: function () {
      var that = this;
    }
  }

});