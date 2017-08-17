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
				categories: [
					{
						name: 'general',
						id: '0',
						sub: [
							{ name: 'wifi', id: '0-1' },
							{ name: 'jewish', id: '0-2' },
							{ name: 'christian', id: '0-3' },
							{ name: 'islam', id: '0-4' },
							{ name: 'religious-other', id: '0-5' },
							{ name: 'shop', id: '0-6' },
							{ name: 'nature', id: '0-7' },
							{ name: 'authority', id: '0-8' },
							{ name: 'hospital', id: '0-9' },
							{ name: 'police', id: '0-10' },
							{ name: 'public-transport', id: '0-11' }
						]
					},
					{
						name: 'language',
						id: '1',
						sub: [
							{ name: 'german-course', id: '1-1' },
							{ name: 'german-course-state', id: '1-2' },
							{ name: 'meet-and-speak', id: '1-3' },
							{ name: 'learning-place', id: '1-4' },
							{ name: 'interpreter', id: '1-5' },
							{ name: 'foreign-language', id: '1-6' }
						]
					},
					{
						name: 'medic',
						id: '2',
						sub: [
							{ name: 'medical-counselling', id: '2-2' },
							{ name: 'psychological-counselling', id: '2-3' }
						]
					},
					{
						name: 'jobs',
						id: '3',
						sub: [
							{ name: 'job-counselling', id: '3-1' },
							{ name: 'education-counselling', id: '3-2' },
							{ name: 'political-education', id: '3-3' },
							{ name: 'library', id: '3-4' }
						]

					},
					{
						name: 'consultation',
						id: '4',
						sub: [
							{ name: 'asylum-counselling', id: '4-1' },
							{ name: 'legal-advice', id: '4-2' },
							{ name: 'social-counselling', id: '4-3' },
							{ name: 'family-counselling', id: '4-4' },
							{ name: 'volunteer-coordination', id: '4-5' }
						]
					},
					{
						name: 'leisure',
						id: '5',
						sub: [
							{ name: 'sports', id: '5-2' },
							{ name: 'museum', id: '5-3' },
							{ name: 'music', id: '5-4' },
							{ name: 'stage', id: '5-5' },
							{ name: 'craft-art', id: '5-6' },
							{ name: 'workspace', id: '5-7' },
							{ name: 'gardening', id: '5-8' },
							{ name: 'cooking', id: '5-9' },
							{ name: 'festival', id: '5-10' },
							{ name: 'lecture', id: '5-11' },
							{ name: 'film', id: '5-12' },
							{ name: 'congress', id: '5-13' }
						]
					},
					{
						name: 'community',
						id: '6',
						sub: [
							{ name: 'welcome-network', id: '6-1' },
							{ name: 'meeting-place', id: '6-2' },
							{ name: 'youth-club', id: '6-3' },
							{ name: 'childcare', id: '6-4' },
							{ name: 'workshop', id: '6-5' },
							{ name: 'sponsorship', id: '6-6' },
							{ name: 'lgbt', id: '6-7' },
							{ name: 'housing-project', id: '6-8' }
						]
					},
					{
						name: 'donation',
						id: '7',
						sub: [
							{ name: 'food', id: '7-1' },
							{ name: 'clothes', id: '7-2' },
							{ name: 'furniture', id: '7-3' }
						]
					}
				],
				categoriesBasic: ["housing", "christian", "islam", "jewish", 'public', 'wifi', 'shop'],
				simpleProperties: ['descriptionShort', 'description', 'speakerPublic', 'spokenLanguages', 'phone', 'mail', 'web', 'facebook', 'arrival', 'openingHours'],
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
        	
        if( document.location.hostname.indexOf('leipzig.afeefa') > -1 && prompt() === 'raum410' ){
        	that.setArea(APP.getData().areas.leipzig);
        }
        else if( document.location.hostname.indexOf('bautzen.afeefa') > -1 && prompt() === 'horbz-afeefa' ){
        	that.setArea(APP.getData().areas.bautzen);
				}
        else {
        	that.setArea(APP.getData().areas.dresden);
        }
				cb();
      	that.loading(true);
				
				// fetch other data (e.g. that takes a long time loading)
				that.getDataManager().fetchAllData();
			});

			that.addEvents();
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

			$('div#footer').on('contextmenu', function(e){
				e.preventDefault();
				// APP.loading(true);
				that.say('languageChanged', APP.getLM().getCurrentLang());
			});
		},

		getMainCategory: function(subCategory){
			var that = this;
			var category;

			category = _.find(that.getConfig().categories, function(cat){
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
		}
	}

});
