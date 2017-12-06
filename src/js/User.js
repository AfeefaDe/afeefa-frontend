import qx from '../../node_modules/qooxdoo/qx-oo.js';
import Daddy from './Daddy.js';
import * as _ from '../../node_modules/underscore/underscore-min.js';

 


export default qx.Class.define("User", {

    extend: Daddy,
    type: "singleton",

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

            if(localStorage.getItem('user'))
                that.user = JSON.parse(localStorage.getItem('user'));
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
              return ( APP.getUser().hasBookmark(entry) );
            });

            return bookedEntries;
        },

        bookmark: function(entry, bool){
            var that = this;

            // TODO make use of bool if needed

            // if bool not set, just toggle
            if(that.hasBookmark(entry)) {
                that.user.bookmarks = _.without(that.user.bookmarks, entry.id);
                that.save();
                return false;
            } else {
                that.user.bookmarks = _.union(that.user.bookmarks, [entry.id]);
                that.save();
                return true;
            }

        },

        hasBookmark: function(entry){
            var that = this;

            return ( _.contains(that.user.bookmarks, entry.id) );
        }
    }

});
