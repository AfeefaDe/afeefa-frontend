import qx from '../../node_modules/qooxdoo/qx-oo.js';
import Daddy from './Daddy.js';
 

 
 

 

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

            var lang = 'de';
            
            var browserLang = navigator.language.split('-')[0];
            if( _.contains( APP.getConfig().languages, browserLang) )
                lang = browserLang;
            
            if( localStorage.getItem("languageFrozen") )
                lang = localStorage.getItem("languageFrozen");
            
            that.setLanguage( lang );

            that.addEvents();
        },

        // param (key)
        // @key phraseapp key
        resolve: function( key ){
            var that = this;

            var wording = that.getBib()[ key ];
            if( wording === undefined ) return '';
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
