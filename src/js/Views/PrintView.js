import qx from 'qooxdoo/qx-oo.js';
 
 

 

export default qx.Class.define('PrintView', {
  
  extend : View,
  type: 'singleton',

  construct: function(){
    var that = this;

    that.setViewId('printView');
  },

  members : {
    
    render: function(){
      var that = this;

      // view container
      that.view = $('<div />')
        .attr('id', that.getViewId());

      $('#main-container').append(that.view);

      this.base(arguments);
    },

    load: function(layout, data){
      var that = this;

      if(layout === undefined || data === undefined) return;
            
      that.reset();

      var pageTitle = prompt(that.getWording('print.naming'), data.title);
      if(!pageTitle) pageTitle = data.title;

      that.view.append(
        $('<img />')
          .addClass('header')
          .attr('src', '/DDFA/img/afeefa.svg')
      );

      that.view.append(
        $('<h1 />')
          .append(pageTitle)
      );

      that.view.append(
        $('<p />')
          .addClass('subtitle')
          .append('Auszug der Afeefa Datenbank vom ' + moment().format('LL'))
      );

      that.view.append( $('<hr />') );

      if(layout == 'bookmarks'){

        var groupedEntries = _.groupBy(data.entries, function(e){
          return e.navigationId;
        });

        _.each( groupedEntries, function(group, key){
          
          var navigationById = APP.getData().navigationById;

          that.view.append(
            $('<p />')
              .addClass('category cat-' + key)
              .append(navigationById[key].name)
          );

          _.each( group, function(entry, key){
            var $entry = $('<div />')
              .addClass('entry');
            
            $entry.append(
              $('<p />')
                .addClass('title')
                .append(entry.name)
            );

            if(entry.subCategory){
              $entry.append(
                $('<p />')
                  .addClass('sub-category')
                  .append(that.getWording('cat.'+entry.subCategory))
              );
            }

            $entry.append(
              $('<p />')
                .addClass('description')
                .append((entry.descriptionShort? entry.descriptionShort : entry.description))
            );

            var loc = entry.location[0];
            if(loc){
              $entry.append(
                $('<p />')
                  .addClass('shift icon-location')
                  .append(function(){
                    var string = '';
                    if(loc.placename) string += loc.placename;
                    if(loc.street) string += (string? ', ' : '') + loc.street;
                    if(loc.zip) string += (string? ', ' : '') + loc.zip;
                    if(loc.city && string) string += (loc.zip? ' ' : ', ') + loc.city;
                    return string;
                  }())
              );
            }

            if(entry.location[0] && entry.location[0].openingHours){
              $entry.append(
                $('<p />')
                  .addClass('shift icon-openingHours')
                  .append(entry.location[0].openingHours)
              );
            }

            if(entry.speakerPublic || entry.phone || entry.mail){
              $entry.append(
                $('<p />')
                  .addClass('shift')
                  .append(function(){
                    var string = '';
                    if(entry.speakerPublic) string += entry.speakerPublic;
                    if(entry.mail) string += (string? ' | ' : '') + entry.mail;
                    if(entry.phone) string += (string? ' | ' : '') + entry.phone;
                    return string;
                  }())
              );
            }

            if(entry.web || entry.facebook){
              $entry.append(
                $('<p />')
                  .addClass('shift')
                  .append(function(){
                    var string = '';
                    if(entry.web) string += entry.web.slice(0,50) + '...';
                    if(entry.facebook) string += (string? ' | ' : '') + entry.facebook.slice(0,50) + '...';
                    return string;
                  }())
              );
            }

            var entryUrl = APP.getRouter().getFrontendUrlForEntry(entry);
            var url = (APP.getArea().dataKey === 'dresden')? 'https://afeefa.de' + entryUrl : 'https://' + APP.getArea().dataKey + '.afeefa.de' + entryUrl;
            $entry.append(
              $('<a />')
                .addClass('entry-url')
                .attr('href', url)
                .append(url)
            );
            
            that.view.append($entry);
          });
        });
      }

      that.open();
    },

    open: function( cb ){
      var that = this;

      that.isActive(true);
      that.view.addClass('active');

      window.print();
      that.close();
    },

    addEvents: function(){
      var that = this;

      // call superclass
      this.base(arguments);
    },

    reset: function(){
      var that = this;

      that.view.empty();
    },

    changeLanguage: function(){
      var that = this;
    },

    close: function(){
      var that = this;
      
      that.reset();
      that.view.removeClass('active');
      that.isActive(false);
    }
  }
});