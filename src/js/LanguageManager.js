import qx from '../../node_modules/qooxdoo/qx-oo.js';
import Daddy from './Daddy.js';
import * as _ from 'underscore';

import moment from 'moment';
import $ from 'jquery';

import APP from './main.js';

export default qx.Class.define("LanguageManager", {
    extend : Daddy,
    type: "singleton",

    construct: function(){
        var that = this;

    },

    properties : {
        bib: {},
        currentLang: {}
    },

    members : {


        init: function( cb ){
            var that = this;
            var browserLang = navigator.language.split('-')[0];
            if( _.contains( APP.getConfig().languages, browserLang) )
                that.setLanguage( browserLang );
            else
                that.setLanguage( APP.getConfig().languages[0] );

            that.addEvents();
        },

        // param (key)
        // @key phraseapp key
        resolve: function( key ){
            var that = this;

            var wording = that.getBib()[ key ];
            if( wording === undefined ) return key + ' not translated';
            return wording.message;
        },

        setLanguage: function( locale ){
            var that = this;

            that.setCurrentLang( locale );
            moment.locale(locale);

            _.each(APP.getConfig().languages, function(lang){
                $('body').removeClass(lang);
            });

            $('body')
                .addClass(locale)
                .attr('lang', locale);

            $('body').removeClass('rtl');
            if( _.contains( ['ar', 'fa', 'ur'], locale) )
                $('body').addClass('rtl');

        },

        addEvents: function(){
            var that = this;

            that.listen('languageChanged', function(e){

                that.setLanguage( e.customData );

                APP.getDataManager().fetchAllData(function( data ){
                  that.say('fetchedNewData');
                });
            });
        }
    }
});
