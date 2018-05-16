import qx from 'qooxdoo/qx-oo.js';

import PerfectScrollbar from 'perfect-scrollbar';




export default qx.Class.define('AreaSelectionView', {

  extend: View,
  type: 'singleton',

  construct: function () {
    var that = this;
    that.setViewId('areaSelectionView');
  },

  members: {

    render: function () {
      var that = this;

      // view container
      that.view = $('<div />');
      that.view.attr('id', that.getViewId());

      // list container
      that.listContainer = $('<div />')
        .addClass('modal-list');

      if (APP.getUserDevice() == 'desktop') that.ps = new PerfectScrollbar(that.listContainer[0]);
      that.view.append(that.listContainer);

      that.listItems = [];

      that.listContainer.append('<header><h3>Wo soll\'s hingehen?</h3><p>Afeefa gibt es in mehreren Regionen. Für welche Region interessierst du dich?</p></header>');

      _.each(APP.getData().areas, function (area) {
        var listItem = $('<a />')
          .addClass('list-item ' + area.dataKey)
          .attr('href', area.redirect)
          .attr('target', '_blank')
          .click(function (e) {
            e.preventDefault();
						
            localStorage.setItem('areaFrozen', area.dataKey);

            // change area only if different from currently selected one
            if (area != APP.getArea()) window.open(area.redirect, '_self');
            else that.close();
          });

        var label = $('<div />')
          .addClass('list-item-label');

        listItem.append(label);

        that.listItems.push({ el: listItem, label: label, area: area });

        that.listContainer.append(listItem);
      });

      $('#main-container').append(that.view);

      this.base(arguments);
    },

    load: function () {
      var that = this;

      _.each(that.listItems, function (item) {
        // highlight current area
        item.el.removeClass('active');
        if (item.el.hasClass(APP.getArea().dataKey))
          item.el.addClass('active');

        // make labels
        item.label
          .empty()
          .append(item.area.label)
          .append( $('<span />').append('Betreut von: ' + item.area.teamOfCharge.name) );
      });
    },

    open: function (cb) {
      var that = this;

      // set optional callback to call after area was selected from the list
      if (cb) that.cb = cb;

      that.isActive(true);
      that.load();

      that.view.addClass('active');
      that.showCurtain(true);

      if (APP.getUserDevice() == 'desktop') that.ps.update();
    },

    addEvents: function () {
      this.base(arguments);
    },

    reset: function () {
    },

    changeLanguage: function () {
    },

    close: function () {
      var that = this;

      that.view.removeClass('active');
      that.showCurtain(false);

      // callback may have been defined when view was opened
      if (that.cb) that.cb();
      that.cb = null;

      that.isActive(false);
    }
  }

});