import qx from '../../node_modules/qooxdoo/qx-oo.js';
import Daddy from './Daddy.js';

export default qx.Class.define("DataManager", {

  extend: Daddy,
  type: "singleton",

  construct: function () {
    var that = this;

    // that.addEvents();
  },

  members: {

    
    // fetch only necessary data for app startup
    fetchInitialData: function (cb) {
      var that = this;

      that.getUITranslations(APP.getLM().getCurrentLang(), function (data) {  // language bib

        APP.getLM().setBib(data);

        // fetch areas
        that.getAllAreas(function (data) {  // categories
          // store in APP
          var currentData = APP.getData();
          currentData.areas = data.areas;
          APP.setData(currentData);

          APP.detectArea();
          
          // fetch categories
          that.getAllCategories(function(data){
            var currentData = APP.getData();
            currentData.categories = data.categories;
            APP.setData(currentData);

            // that.say('fetchedInitialData');
            cb();  // finished, so callback
          });
        });
      });
    },

    fetchAllData: function (cb) {
      var that = this;

      var currentAppData = APP.getData();

      that.getAllEntries(function (data) {

        // set empty if fetching failed
        if(data === undefined) data = {marketentries: []};

        // store entries in APP
        currentAppData.entries = data.marketentries;

        currentAppData.entries = _.sortBy(currentAppData.entries, 'updated_at').reverse();

        APP.setData(currentAppData);
        if(!cb) that.say('fetchedNewData');
        that.say('fetchedAllData');

        if(APP.getArea().dataKey == 'dresden') {
          that.fetchExternalData('freifunk', function(){
            if(!cb) that.say('fetchedNewData');
            
            that.fetchExternalData('facebookEvents', function(){
              that.say('fetchedNewData');
              if(cb) cb();  // finished, so callback
            });
          });
        } else {
          if(cb) that.say('fetchedNewData');
          if(cb) cb();  // finished, so callback
        }

      });
    },

    getAllCategories: function (cb) {
      var that = this;

      $.ajax({
        url: APP.getConfig().apiUrl + "api/categories" + "?area=" + APP.getArea().dataKey,
        type: 'GET',
        dataType: 'json'
      })
        .done(function (data) {
          cb(data);
        })
        .fail(function (a) {
          console.debug(a);
          cb(a);
        });

    },

    getAllAreas: function (cb) {
      var that = this;

      var areas = {
        areas: {
          dresden: {
            dataKey: 'dresden',
            label: 'Dresden',
            redirect: 'https://afeefa.de',
            initialView: { lat: 51.051, lon: 13.74, zoom: 14 },
            inMainMenu: true,
            teamOfCharge: {
              name: 'Afeefa - Digitaler Zusammenhalt e.V.',
              url: 'https://about.afeefa.de',
              img: 'afeefa-verein-logo.svg'
            }
          },
          leipzig: {
            dataKey: 'leipzig',
            label: 'Leipzig',
            redirect: 'https://leipzig.afeefa.de',
            initialView: { lat: 51.336143, lon: 12.362952, zoom: 14 },
            inMainMenu: true,
            teamOfCharge: {
              name: 'Interaction Leipzig e.V.',
              url: 'http://www.interaction-leipzig.de',
              img: 'interaction-logo.jpg'
            },
            wisdomRootId: 1,
            chapterCategoryMapping: {
              "advice-and-support": [
                { id: 27, name: "Patenschaften machen den Unterschied" },
                { id: 28, name: "Rechts- und Sozialberatung" },
                { id: 12, name: "Lebenslagen: Familien, Frauen, Männer, LSBTI*, Kinder" }
              ],
              "living-in-leipzig": [
                { id: 14, name: "Gesundheit" },
                { id: 15, name: "Wohnen" },
                { id: 16, name: "Religion" },
                { id: 17, name: "Mobil sein" },
                { id: 18, name: "Alltag" },
                { id: 19, name: "Freizeit" },
                { id: 20, name: "Mitwirken und sich einmischen" }
              ],
              "work-and-education": [
                { id: 22, name: "Deutsch lernen und Deutsch sprechen" },
                { id: 23, name: "Kindergarten und Schule" },
                { id: 24, name: "Arbeit, Ausbildung, Studium" }
              ]
            }
          },
          bautzen: {
            dataKey: 'bautzen',
            label: 'Bautzen',
            redirect: 'https://bautzen.afeefa.de',
            initialView: { lat: 51.1803977, lon: 14.4242263, zoom: 14 },
            inMainMenu: true,
            teamOfCharge: {
              name: 'House of Resources Bautzen',
              url: 'http://www.hor-bautzen.de',
              img: 'horbz-logo.jpg'
            }
          },
          pirna: {
            dataKey: 'dresden',
            label: 'Pirna',
            initialView: { lat: 50.957456, lon: 13.937007, zoom: 14 }
          }
        }
      };

      cb(areas);
    },

    getAllChaptersFromWisdom: function (cb) {
      var that = this;

      $.ajax({
        url: APP.getConfig().apiUrl + "api/chapters",
        type: 'GET',
        dataType: 'json'
      })
        .done(function (data) {
          cb(data);
        })
        .fail(function (a) {
          console.debug(a);
          cb(a);
        });
    },

    getChapterFromWisdom: function (chapterID, cb) {
      var that = this;

      $.ajax({
        url: APP.getConfig().apiUrl + "api/chapters/" + chapterID,
        type: 'GET',
        dataType: 'json'
      })
        .done(function (data) {
          cb(data);
        })
        .fail(function (a) {
          console.debug(a);
          cb(a);
        });
    },

    getUITranslations: function (lang, cb) {

      $.ajax({
        url: 'https://api.phraseapp.com/api/v2/projects/15466a179c265396774350db18745f34/locales/' +APP.getConfig().phraseapp.localeId[lang]+ '/download?file_format=json&fallback_locale_id=german&include_empty_translations=true',
        type: 'GET',
        dataType: 'text',
        headers: {
          'Authorization': 'token a9d97a31787c37d64ce0200e8cfdf2c95c01bddf9960999ea601a487e0a386a4'
        }
      })
        .done(function (data) {
          cb(JSON.parse(data));
        })
        .fail(function (a) {
          console.debug(a);
        });

    },

    findAddress: function (address, cb) {

      $.ajax({
        url: APP.getConfig().backendApiUrl + 'api/v1/geocoding?token=MapCat_050615&address=' + encodeURI(address),
        type: 'GET',
        dataType: 'text',
      })
        .done(function (data) {
          cb(JSON.parse(data));
        })
        .fail(function (a) {
          console.debug(a);
        });

    },

    getAllEntries: function (cb) {
      var that = this;

      $.ajax({
        url: APP.getConfig().apiUrl + "api/marketentries?locale=" + APP.getLM().getCurrentLang() + "&area=" + APP.getArea().dataKey,
        type: 'GET',
        dataType: 'json'
      })
        .done(function (data) {
          cb(data);
        })
        .fail(function (a) {
          cb();
          console.debug(a);
        });

    },

    getEntryByEntryId: function(entryId){
      var that = this;

      var entry = _.find(APP.getData().entries, function(entry){
        return entryId == entry.entryId;
      })

      return entry;
    },

    getOrgaById: function(id){
      var that = this;

      var orga = _.find(APP.getData().entries, function(entry){
        return (APP.isOrga(entry) && id == entry.id);
      })
      console.log('getOrgaById');
      return orga;
    },

    getEventById: function(id){
      var that = this;

      var event = _.find(APP.getData().entries, function(entry){
        return (APP.isEvent(entry) && id == entry.id);
      })

      return event;
    },

    getNewestProjects: function(count){
      var that = this;

      if(count === undefined) count = 5;

      var projects = APP.getData().entries.filter(function (entry) {
        return (APP.isOrga(entry) && entry.created_at != undefined);
      });

      var sortedProjects = _.sortBy(projects, function(o){
        return o.created_at;
      });

      return sortedProjects.reverse().slice(0, count);
    },

    getAllEvents: function (options) {

      if(options === undefined) options = {};

      // extract events from all the data
      var events = APP.getData().entries.filter(function (entry) {
        if (entry.type != 2) return false;
        if (!entry.dateFrom) return false;
        return true;
      });

      if(options.timeSpan){
        
        var eventsFiltered = [];

        // only at day X means only that day
        // or if a period event ends on that day
        if( options.timeSpan == 'onlyAtDayX' ){
          var date = new Date(options.atDate);
          eventsFiltered = events.filter(function(entry){
            var isOnlyToday;
            isOnlyToday = ( !entry.dateTo && moment(date).isSame(entry.dateFrom, 'd') )? true : false;
            
            var startsToday;
            startsToday = ( entry.dateFrom && moment(date).isSame(entry.dateFrom, 'd') )? true : false;

            var endsToday;
            endsToday = ( entry.dateTo && moment(date).isSame(entry.dateTo, 'd') )? true : false;
            
            return (isOnlyToday || startsToday || endsToday);
          });
          
          return _.sortBy(eventsFiltered, 'dateFrom');
        }

        // also today means a period event is already running and goes beyond today
        if( options.timeSpan == 'alsoToday' ){
          eventsFiltered = events.filter(function(entry){
            // must be a period
            if( !(entry.dateFrom && entry.dateTo) ) return false;

            // dateFrom < today
            var isRunning = ( moment(entry.dateFrom).isBefore(moment(), 'd') )? true : false;
            
            // dateTo > today
            var goesBeyondToday = ( moment(entry.dateTo).isAfter(moment(), 'd') )? true : false;
            
            return (isRunning && goesBeyondToday);
          });
          
          return _.sortBy(eventsFiltered, 'dateTo');
        }
        
        // also this week means a period event is already running and goes beyond this week
        if( options.timeSpan == 'alsoThisWeek' ){
          eventsFiltered = events.filter(function(entry){
            // must be a period
            if( !(entry.dateFrom && entry.dateTo) ) return false;

            // dateFrom < today
            var isRunning = ( moment(entry.dateFrom).isBefore(moment(), 'week') )? true : false;
            
            // dateTo > today
            var goesBeyondToday = ( moment(entry.dateTo).isAfter(moment(), 'week') )? true : false;
            
            return (isRunning && goesBeyondToday);
          });
          
          return _.sortBy(eventsFiltered, 'dateTo');
        }
        
        return eventsFiltered;
      }
      
      return _.sortBy(events, 'dateFrom');
    },

    getAllLocations: function (cb) {

      $.ajax({
        url: "api/locations?locale=" + APP.getLM().getCurrentLang(),
        type: 'GET',
        dataType: 'json'
      })
      .done(function (data) {
        cb(data);
      })
      .fail(function (a) {
        console.debug(a);
      });
    },

    fetchExternalData: function (sourceKey, cb) {
      var that = this;

      var sources = {
        freifunk: {
          sourceUrl: '/externalDataFiles/freifunk-nodes.json',
          mapping: {
            name: function(record){
              return "Wifi Hotspot (Freifunk)";
            },
            type: function(record){
              return 0;
            },
            entryType: function(record){
              return 'orga';
            },
            id: function(record, i){
              return 'freifunk-'+i;
            },
            category: function(record){
              return {
                "name":"general"
              };
            },
            subCategory: function(record){
              return 'wifi';
            },
            certified: function(record){
              return false;
            },
            descriptionShort: function(record){
              return APP.getLM().resolve("freifunk.descriptionShort");
            },
            image: function(record){
              return "https://freifunk.net/wp-content/uploads/2013/07/spenden.png";
            },
            imageType: function(record){
              return 'image';
            },
            web: function(record){
              return "http://www.freifunk-dresden.de/topology/google-maps.html";
            },
            facebook: function(record){
              return "https://www.facebook.com/FreifunkDresden";
            },
            location: function(record){
              return [{
                "arrival":"",
                "city":"Dresden",
                "lat":record.position.lat,
                "lon":record.position.long,
                // "placename":"...",
                // "street":"...",
                // "zip":"..."
              }];
            }
          }
        },
        facebookEvents: {
          sourceUrl: APP.getConfig().backendApiUrl + 'api/v1/facebook_events?token=zP4uja4yFmnPWZeCVsLU',
          mapping: {
            name: function(record){
              return record.name;
            },
            type: function(record){
              return 2;
            },
            entryType: function(record){
              return 'Event';
            },
            id: function(record,i){
              return record.id;
            },
            category: function(record){
              return {
                "name":"external-event"
              };
            },
            subCategory: function(record){
              return 'fb-event';
            },
            tags: function(record){
              return 'fbevent';
            },
            certified: function(record){
              return false;
            },
            description: function(record){
              return record.description;
            },
            descriptionShort: function(record){
              return null;
            },
            image: function(record){
              return null;
            },
            imageType: function(record){
              return null;
            },
            web: function(record){
              return record.link_to_event;
            },
            facebook: function(record){
              return record.link_to_owner;
            },
            location: function(record){
              return [{
                "arrival": null,
                "city": (record.place && record.place.location)? record.place.location.city : null,
                "lat": (record.place && record.place.location)? record.place.location.latitude : null,
                "lon": (record.place && record.place.location)? record.place.location.longitude : null,
                "placename": (record.place && record.place.name)? record.place.name : null,
                "street": (record.place && record.place.location)? record.place.location.street : null,
                "zip": (record.place && record.place.location)? record.place.location.zip : null
              }];
            },
            dateFrom: function(record){
              if(record.start_time === undefined) return null;
              
              return record.start_time.substr( 0, record.start_time.indexOf('T') );
            },
            timeFrom: function(record){
              if(record.start_time === undefined) return null;
              
              function n(n){
                return n > 9 ? "" + n: "0" + n;
              }

              date = new Date(record.start_time);
              return n(date.getHours()) + ':' + n(date.getMinutes());
            },
            dateTo: function(record){
              if(record.end_time === undefined) return null;
              
              return record.end_time.substr( 0, record.end_time.indexOf('T') );
            },
            timeTo: function(record){
              if(record.end_time === undefined) return null;
              
              function n(n){
                return n > 9 ? "" + n: "0" + n;
              }

              date = new Date(record.end_time);
              return n(date.getHours()) + ':' + n(date.getMinutes());
            },
            additionalData: function(record){
              return {
                owner: record.owner
              };
            }
          }
        }
      };

      $.ajax({
        url: sources[sourceKey].sourceUrl,
        type: 'GET',
        dataType: 'json'
      })
      .done(function (dataFromServer) {

        var data;
        if( sourceKey == 'freifunk' ) {

          // filter
          data = _.filter(dataFromServer.nodes, function (record) {
            // filter out dead access points
            if (!record.status.online) return false;
            return true;
          });
        }
        else if( sourceKey == 'facebookEvents' ){
          data = dataFromServer;
        }

        that.integrateExternalData(data, sources[sourceKey].mapping);
        cb();
      })
      .fail(function (a) {
        cb();
        // console.debug(a);
      });
    },

    // transform data into needed structure and integrate with other app data
    integrateExternalData: function(data, mapping){
      var that = this;

      var currentAppData = APP.getData();

      var rows = [];
      _.each(data, function(record, i){
        var newEntry = {
          external:true,
          name: mapping.name? mapping.name(record) : 'mapping missing',
          id: mapping.id? mapping.id(record, i) : 0,
          type: mapping.type? mapping.type(record) : 0,
          entryType: mapping.entryType? mapping.entryType(record) : 0,
          category: mapping.category? mapping.category(record) : {
            "name":"general",
          },
          subCategory: mapping.subCategory? mapping.subCategory(record) : null,
          tags: mapping.tags? mapping.tags(record) : null,
          certified: mapping.certified? mapping.certified(record) : false,
          description: mapping.description? mapping.description(record) : null,
          descriptionShort: mapping.descriptionShort? mapping.descriptionShort(record) : null,
          image: mapping.image? mapping.image(record) : null,
          imageType: mapping.imageType? mapping.imageType(record) : null,
          web: mapping.web? mapping.web(record) : null,
          facebook: mapping.facebook? mapping.facebook(record) : null,
          location: mapping.location? mapping.location(record) : null,
          dateFrom: mapping.dateFrom? mapping.dateFrom(record) : null,
          dateTo: mapping.dateTo? mapping.dateTo(record) : null,
          timeFrom: mapping.timeFrom? mapping.timeFrom(record) : null,
          timeTo: mapping.timeTo? mapping.timeTo(record) : null,
          additionalData: mapping.additionalData? mapping.additionalData(record) : null
        };

        if(newEntry.dateFrom == newEntry.dateTo) newEntry.dateTo = null;
        if(newEntry.timeFrom == newEntry.timeTo) newEntry.timeTo = null;

        rows.push(newEntry);
      });

      // store data in APP
      var newData = _.union(currentAppData.entries, rows)
      currentAppData.entries = newData;

      APP.setData(currentAppData);
    },

    addMarketEntry: function (data, cb) {
      var that = this;

      $.ajax({
        url: APP.getConfig().apiUrl + "api/marketentries",
        type: 'POST',
        data: JSON.stringify(data),
        cache: false,
        dataType: 'json',
        processData: true,
        contentType: 'application/json; charset=UTF-8'
      })
      .always(function (response) {
        if (response.status == 200 || response.status == 201) cb(true);
        else cb(false);
      });
    },

    addLocation: function (data, cb) {
      var that = this;

      // console.debug('POST ' + APP.getConfig().apiUrl + 'api/locations', data);

      $.ajax({
        url: APP.getConfig().apiUrl + "api/locations",
        type: 'POST',
        data: data,
        cache: false,
        dataType: 'json',
        processData: true,
        contentType: false
      })
        .done(function (data) {
          cb(data);
        })
        .fail(function (a) {
          cb(a);
        });

    },

    ///////////////////////
    // Outgoing messages //
    ///////////////////////

    createSlackMessage: function (data, cb, area) {

      if(area === undefined) area = 'dresden';

      var hook;
      if(area == 'leipzig'){
        hook = "https://hooks.slack.com/services/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";
      } else {
        hook = "https://hooks.slack.com/services/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";
      }
      var slackMessage = '*' + data.heading + '*' + ':\n' + data.message;

      $.ajax({
        url: hook,
        type: 'POST',
        data: JSON.stringify({text: slackMessage}),
        cache: false,
        dataType: 'text',
        processData: false
        // contentType: false
      })
        .done(function (data) {
          // cb(data);
        })
        .fail(function (a) {
          // cb(a);
        });

    },

    contact: function (entry, data, cb) {
      var apiTypePaths = {"Orga": "orgas", "Event": 'events'};
      $.ajax({
        url: APP.getConfig().apiUrl + "api/" + apiTypePaths[entry.entryType] + '/' + entry.id + '/contact',
        type: 'POST',
        data: data,
        cache: false,
        dataType: 'json',
        processData: true
        // contentType: 'application/json; charset=UTF-8'
      })
      .always(function (response) {
        if (response.status == 200 || response.status == 201) cb(true);
        else cb(false);
      });
    },

    entryFeedback: function (entry, data, cb) {
      var apiTypePaths = {"Orga": "orgas", "Event": 'events'};
      $.ajax({
        url: APP.getConfig().apiUrl + "api/" + apiTypePaths[entry.entryType] + '/' + entry.id + '/feedback',
        type: 'POST',
        data: data,
        cache: false,
        dataType: 'json',
        processData: true
        // contentType: 'application/json; charset=UTF-8'
      })
      .always(function (response) {
        if (response.status == 200 || response.status == 201) cb(true);
        else cb(false);
      });
    },

    feedback: function (data, cb) {
      $.ajax({
        url: APP.getConfig().apiUrl + "api/feedbacks",
        type: 'POST',
        data: data,
        cache: false,
        dataType: 'json',
        processData: true
        // contentType: 'application/json; charset=UTF-8'
      })
      .always(function (response) {
        cb(true);
        // if (response.status == 200 || response.status == 201) cb(true);
        // else cb(false);
      });
    }
  }
});
