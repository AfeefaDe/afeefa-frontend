import qx from 'qooxdoo';


import Daddy from './Daddy.js';
import DataManager from './DataManager.js';
import LanguageManager from './LanguageManager.js';
import User from './User.js';
import Router from './Router.js';
import Utility from './Utility.js';


/* Not working: restive: Uncaught ReferenceError: md5 is not defined */
//import restive from './restive.min.js';

export default qx.Class.define('APPAFEEFA', {
  extend: Daddy,
  type: 'singleton',

  // extend: "Daddy",

  construct: function () {
    var that = this;
    that.setDataManager(new DataManager());
    that.setRouter(new Router());
    that.setLM(new LanguageManager());
    that.setUser(new User());
    that.setUtility(new Utility());

    that.setConfig(
      {
        apiUrl: window.apiurl,
        backendApiUrl: window.backendapiurl,
        includePathForHtmlFiles: 'https://about.afeefa.de/',
        languages: [
          'de',
          'en',
          'ar',
          'fa',
          'fr',
          // 'ru',
          // 'ps',
          // 'ku',
          'es',
          // 'sq',
          // 'sr',
          // 'ti'
          'tr'
          // 'ur'
        ],
        phraseapp: {
          localeId: {
            'ar': 'arabic',
            'de': 'german',
            'en': 'english',
            'es': 'spanish',
            'fa': 'persian',
            'ps': 'pushto',
            'fr': 'french',
            'ku': 'kurdish',
            'ru': 'russian',
            'sq': 'albanian',
            'sr': 'serbian',
            'ti': 'tigrinya',
            'tr': 'turkish',
            'ur': 'urdu',
            'ja': 'japanese',
            'pa': 'punjabi'
          }
        },
        categoriesBasic: ['housing', 'christian', 'islam', 'jewish', 'public', 'wifi', 'shop'],
        simpleProperties: ['descriptionShort', 'description', 'supportWantedDetail', 'speakerPublic', 'spokenLanguages', 'phone', 'mail', 'web', 'facebook', 'arrival', 'openingHours'],
        imgPath: 'img/'
      }
    );

    that.setActiveFilter(null);
  },

  properties: {
    title: {},
    area: {},
    DataManager: {},
    User: {},
    Utility: {},
    Router: {},
    LM: {},
    data: { init: {} },
    curtain: {},
    mapView: {},
    searchView: {},
    eventView: {},
    detailView: {},
    menuView: {},
    legendView: {},
    plusView: {},
    languageView: {},
    areaView: {},
    formView: {},
    includeView: {},
    messageView: {},
    introView: {},
    printView: {},
    areaSelectionView: {},
    userDevice: {},
    config: {},
    activeFilter: {}
  },

  members: {


    init: function (cb) {
      var that = this;

      moment.locale('de');

      // analyse user device
      that.getUser().load();

      // analyse user device
      that.detectUserDevice();

      // analyse user language
      that.getLM().init();

      // load view-independant UI components
      that.loadIndependantUI();

      // fetch only necessary data for app startup
      that.getDataManager().fetchInitialData(function () {

        cb();
        if (APP.getUserDevice() == 'desktop') that.buildFooter();
        that.loading(true);

        // fetch other data (e.g. entries, that takes a long time loading)
        that.getDataManager().fetchAllData();
      });

      that.addEvents();
    },

    detectArea: function () {
      var that = this;

      if (document.location.hostname.indexOf('lkleipzig.afeefa') > -1) {
        that.setArea(that.getData().areas.lkleipzig);
      }
      else if (document.location.hostname.indexOf('leipzig.afeefa') > -1) {
        that.setArea(that.getData().areas.leipzig);
      }
      else if (document.location.hostname.indexOf('bautzen.afeefa') > -1) {
        that.setArea(that.getData().areas.bautzen);
      }
      else {
        that.setArea(that.getData().areas.dresden);
      }
    },

    route: function (route, name, data, keyState) {
      var that = this;
      that.getRouter().setUrl({ route: route, name: name, data: data, keyState: keyState });
      APP.setPageTitle(name);
    },

    addEvents: function () {
      var that = this;

      that.listen('languageChanged', function () {
        that.loading(true);
      });

      that.listen('fetchedNewData', function () {
        that.loading(false);
      });
    },

    loading: function (bool) {
      if (bool) {
        $('body').addClass('loading');
      }
      else {
        $('body').removeClass('loading');
      }
    },

    detectUserDevice: function () {
      var that = this;

      var isMobile = {
        Android: function () { return navigator.userAgent.match(/Android/i); },
        BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
        iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
        Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
        Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
        any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
      };

      that.setUserDevice('desktop');
      if (isMobile.any()) that.setUserDevice('mobile');

      // TODO detect tablets, because there is special behavior for tablets already implemented in the afeefa app
      // if( $('body').hasClass('tablet') ) that.setUserDevice('tablet');

      $('html').addClass(that.getUserDevice());
    },

    loadIndependantUI: function () {
      var that = this;

      // curtain
      var curtain = $('<div />')
        .attr('id', 'curtain')
        .on('click', function () {
          that.say('curtainclicked');
        });
      $('#main-container').append(curtain);
      that.setCurtain(curtain);

      // reload on footer click
      $('div#footer').on('contextmenu', function (e) {
        e.preventDefault();
        that.say('languageChanged', that.getLM().getCurrentLang());
      });
    },

    buildFooter: function () {
      // # create content
      var donation = $('<div />');
      $('#footer').append(donation);

      donation.append(APP.getArea().donationText);

      // # create content
      var survey = $('<div />');
      $('#footer').append(survey);

      var contentConfig = {
        default: '<p>Was meinen Sie zu Afeefa.de? Für eine Beantwortung unserer kurzen <a target="_blank" href="https://afeefade.typeform.com/to/csN7YQ">Umfrage</a> wären wir sehr dankbar!</p>',
      };
      var content = (contentConfig[APP.getArea().dataKey] !== undefined) ? contentConfig[APP.getArea().dataKey] : contentConfig.default;
      survey.append(content);

      // # swap content
      function togglFooter(i) {
        if (i % 2) {
          donation.hide();
          survey.fadeIn(500);
        } else {
          survey.hide();
          donation.fadeIn(500);
        }
      }
      var i = 0;
      togglFooter(i);
      setInterval(function () {
        i++;
        togglFooter(i);
      }, 30000);
    },
    getMainCategory: function (subCategory) {
      var that = this;
      var category;

      category = _.find(that.getData().categories, function (cat) {
        var found = _.find(cat.sub_items, function (subCat) {
          return subCat.name == subCategory;
        });
        if (found) return true;
      });

      return category;
    },

    setPageTitle: function (title) {
      var pageTitle = title ? 'Afeefa ' + APP.getArea().label + ' | ' + title : 'Afeefa ' + APP.getArea().label + ' | Knallbunter Stadtplan';

      $('head title').empty().append(pageTitle);
    },

    setOpenGraphMetaProperties: function (properties) {
      _.each(properties, function (value, key) {
        var selector = 'head meta[property="og:' + key + '"]';
        $(selector).attr('content', value);
      });
    },

    isOrga: function (record) {
      return record.entryType == 'Orga';
    },
		
    isOffer: function (record) {
      return record.entryType == 'Offer';
    },

    isEvent: function (record) {
      return record.entryType == 'Event';
    }
  }

});
