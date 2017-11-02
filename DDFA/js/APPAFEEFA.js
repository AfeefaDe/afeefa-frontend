qx.Class.define("APPAFEEFA", {
	extend : Daddy,
	type: "singleton",

	// extend: "Daddy",

	construct: function(){
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
					'ru',
					// 'ps',
					'ku',
					// 'es',
					// 'sq',
					// 'sr',
					'ti'
					// 'tr',
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
				categoriesBasic: ["housing", "christian", "islam", "jewish", 'public', 'wifi', 'shop'],
				simpleProperties: ['descriptionShort', 'description', 'supportWantedDetail', 'speakerPublic', 'spokenLanguages', 'phone', 'mail', 'web', 'facebook', 'arrival', 'openingHours'],
				imgPath: 'DDFA/img/'
			}
		);

		that.setActiveFilter(null);
	},

	properties : {
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
		userDevice: {},
		config: {},
		activeFilter: {}
	},

	members : {


		init: function( cb ){
			var that = this;

      moment.locale('de');

			// analyse user device
			that.getUser().load();

			// analyse user device
			that.detectUserDevice();

			// analyse user language
			that.getLM().init();

			that.setPageTitle('Afeefa.de - Hier wird soziales Engagement sichtbar.');

			// load view-independant UI components
			that.loadIndependantUI();

			// fetch only necessary data for app startup
			that.getDataManager().fetchInitialData(function(){
        
				cb();
      	that.loading(true);
				
				// fetch other data (e.g. entries, that takes a long time loading)
				that.getDataManager().fetchAllData();
			});

			that.addEvents();
		},

		detectArea: function(){
			var that = this;

			// that.setArea(APP.getData().areas.leipzig);
			// return;

			if( document.location.hostname.indexOf('leipzig.afeefa') > -1 && prompt() === 'raum-410' ){
      	that.setArea(APP.getData().areas.leipzig);
      }
      else if( document.location.hostname.indexOf('bautzen.afeefa') > -1 && prompt() === 'horbz-afeefa' ){
      	that.setArea(APP.getData().areas.bautzen);
			}
      else {
      	that.setArea(APP.getData().areas.dresden);
      }
		},

		addEvents: function(){
      var that = this;

      that.listen('languageChanged', function(){
        that.loading(true);
      });

      that.listen('fetchedNewData', function(){
				that.loading(false);
			});
	  },

		loading: function( bool ){
        var that = this;

        if (bool) {
            $('body').addClass('loading');
        }
        else {
            $('body').removeClass('loading');
        }
    },

		detectUserDevice: function(){
			var that = this;

			// analyse user device
			// $('body').restive({
			//     breakpoints: ['768', '1280'],
			//     classes: ['768-c', '1280-c'],
			//     force_dip: true
			// });

			// if( $('body').hasClass('768-c') ) APP.setUserDevice('phone');
			// else if( $('body').hasClass('1280-c') ) APP.setUserDevice('tablet');
			// else APP.setUserDevice('desktop');

			// $('body').addClass( APP.getUserDevice() );

			$('body').restive({
				  breakpoints: ['10000'],
				  classes: ['nb'],
				  turbo_classes: 'is_mobile=mobi,is_phone=phone,is_tablet=tablet,is_landscape=landscape'
			});

			APP.setUserDevice('desktop');
			if( $('body').hasClass('mobi') || $('body').hasClass('phone') ) APP.setUserDevice('mobile');
			if( $('body').hasClass('tablet') ) APP.setUserDevice('tablet');

			$('body').addClass( APP.getUserDevice() );
		},

		loadIndependantUI: function(){
			var that = this;

			// curtain
			var curtain = $("<div />")
				.attr('id', 'curtain')
				.on('click', function(e) {
					that.say('curtainclicked');
				});
      		$('#main-container').append(curtain);
			that.setCurtain(curtain);

			// switch footer content
			function togglFooter(i){
				if(i%2){
					$('#footer div.opt1').hide();
					$('#footer div.opt2').fadeIn(500);
				} else {
					$('#footer div.opt2').hide();
					$('#footer div.opt1').fadeIn(500);
				}
			}
			var i=0;
			togglFooter(i);
			setInterval(function(){
				i++;
				togglFooter(i);
			}, 30000);

			// reload on footer click
			$('div#footer').on('contextmenu', function(e){
				e.preventDefault();
				// APP.loading(true);
				that.say('languageChanged', APP.getLM().getCurrentLang());
			});
		},

		getMainCategory: function(subCategory){
			var that = this;
			var category;

			category = _.find(that.getData().categories, function(cat){
				var found = _.find(cat.sub, function(subCat){
					return subCat.name == subCategory;
				});
				if(found) return true;
			});

			return category;
		},

		setPageTitle: function(title) {
			var that = this;

			$('head title').empty().append(title);
		},

		setOpenGraphMetaProperties: function(properties){
			var that = this;

			_.each(properties, function(value, key){
				var selector = 'head meta[property="og:'+key+'"]'
				$(selector).attr('content', value);
			});
		},

		isOrga: function(record){
			var that = this;

			return record.entryType == 'Orga';
		},

		isEvent: function(record){
			var that = this;

			return record.entryType == 'Event';
		}
	}

});
