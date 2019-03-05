import qx from '../../node_modules/qooxdoo/qx-oo.js';
import Daddy from './Daddy.js';
import * as _ from '../../node_modules/underscore/underscore-min.js';

 


export default qx.Class.define('User', {

  extend: Daddy,
  type: 'singleton',

  construct: function () {
    var that = this;

    // that.addEvents();

    that.user = {
      device: {},
      bookmarks: []
    };
  },

  members: {

    save: function(){
      var that = this;

      localStorage.setItem('user', JSON.stringify(that.user));
    },

    load: function(){
      var that = this;

      if (localStorage.getItem('user')) {
        that.user = JSON.parse(localStorage.getItem('user'));
      }
            
      that.listen('fetchedNewData', function(){
        that.validateBookmarks();
      });
    },

    getUser: function(){
      var that = this;

      return that.user;
    },

    // remember: bookmarks are saved in an array of IDs
    getBookmarks: function(){
      var that = this;

      // return that.user.bookmarks;

      var bookedEntries = _.filter( APP.getData().entries, function(entry){
        return ( that.hasBookmark(entry) );
      });

      return bookedEntries;
    },

    bookmark: function(entry, bool){
      var that = this;

      // if bool not set, just toggle
      if(that.hasBookmark(entry)) {
        var bookmark = {id: entry.id, entryType: entry.entryType};
        that.removeBookmark(bookmark);
        return false;
      } else {
        var bookmark = {id: entry.id, entryType: entry.entryType};
        that.user.bookmarks = _.union(that.user.bookmarks, [bookmark]);
        that.save();
        that.say('bookmarksChanged');
        return true;
      }
    },

    removeBookmark: function( theBookmark ) {
      var that = this;

      var existingBookmark = _.find(that.user.bookmarks, function(bookmark) {
        return (bookmark.id == theBookmark.id && bookmark.entryType == theBookmark.entryType);
      });
      if (existingBookmark) that.user.bookmarks = _.without(that.user.bookmarks, existingBookmark);
      that.save();
      that.say('bookmarksChanged');
    },

    hasBookmark: function(entry){
      var that = this;

      return _.find(that.user.bookmarks, function(bookmark) {
        return (bookmark.id == entry.id && bookmark.entryType == entry.entryType);
      });
    },

    validateBookmarks: function() {
      var that = this;

      _.each(that.user.bookmarks, function(bookmark) {
        var exists = _.find( APP.getData().entries, function(entry){
          return ( that.hasBookmark(entry) );
        });
        if (exists === undefined) {
          that.user.bookmarks = _.without(that.user.bookmarks, bookmark);
          that.save();
        }
      });
    }
  }

});
