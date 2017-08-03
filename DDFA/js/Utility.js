qx.Class.define("Utility", {
	
	extend : Daddy,
	type: "singleton",  

	construct: function(){
		var that = this;

		// that.addEvents();
	},

	members : {

		buildTimeString: function( record, options ){
			
			if(options === undefined) options = {};

			var times = '';

			var TO, FROM = null;
			if(record.dateFrom){
				if(record.timeFrom)	FROM = moment( moment(record.dateFrom).format('YYYY-MM-DD') + ' ' + record.timeFrom);
				else FROM = moment( moment(record.dateFrom).format('YYYY-MM-DD'));
			}

			if(record.dateTo){
				if(record.timeTo)	TO = moment( moment(record.dateTo).format('YYYY-MM-DD') + ' ' + record.timeTo);
				else TO = moment( moment(record.dateTo).format('YYYY-MM-DD'));
			}

			var vocabDateFrom = APP.getLM().resolve('prop.dateFrom');
			var vocabDateTo = APP.getLM().resolve('prop.dateTo');
			var vocabTimeFrom = APP.getLM().resolve('prop.timeFrom');
			var vocabTimeTo = APP.getLM().resolve('prop.timeTo');
			var vocabTimeAt = APP.getLM().resolve('prop.timeAt');
			var vocabUntil = APP.getLM().resolve('prop.until');

			if(FROM && TO){
				// same day
				if( FROM.isSame(TO, 'day') ){
					// mit startzeit + endzeit
					if(record.has_time_start && record.has_time_end) {
						times = FROM.format('DD.MM.YYYY') + ' ' + vocabTimeFrom + ' ' + FROM.format('LT') + ' ' + vocabTimeTo + ' ' + TO.format('LT');
					}
					// nur startzeit
					else if(record.has_time_start) {
						times = FROM.format('DD.MM.YYYY') + ' ' + vocabTimeAt + ' ' + FROM.format('LT');
					}
					// nur endzeit
					else if(record.has_time_end) {
						times = FROM.format('DD.MM.YYYY') + ' ' + vocabTimeTo + ' ' + TO.format('LT');
					}
					// keine zeitangaben
					else {
						times = FROM.format('DD.MM.YYYY');
					}
				}
				// different day
				else {
					// mit startzeit + endzeit
					if(record.has_time_start && record.has_time_end) {
						times = FROM.format('DD.MM.YYYY') + ' ' + vocabTimeAt + ' ' + FROM.format('LT') + ' ' + vocabTimeTo + ' ' + TO.format('DD.MM.YYYY') + ' ' + vocabTimeAt + ' ' + TO.format('LT');
					}
					// nur startzeit
					else if(record.has_time_start) {
						times = FROM.format('DD.MM.YYYY') + ' ' + vocabTimeAt + ' ' + FROM.format('LT') + ' ' + vocabTimeTo + ' ' + TO.format('DD.MM.YYYY');
					}
					// nur endzeit
					else if(record.has_time_end) {
						times = FROM.format('DD.MM.YYYY') + ' ' + vocabTimeTo + ' ' + TO.format('DD.MM.YYYY') + ' ' + vocabTimeAt + ' ' + TO.format('LT');
					}
					// keine zeitangaben
					else {
						times = FROM.format('DD.MM.YYYY') + ' ' + vocabTimeTo + ' ' + TO.format('DD.MM.YYYY');
					}
				}
			}
			else if(FROM){
				// mit startzeit
				if(record.has_time_start) {
					times = FROM.format('DD.MM.YYYY') + ' ' + vocabTimeAt + ' ' + FROM.format('LT');
				}
				// keine zeitangaben
				else {
					times = FROM.format('DD.MM.YYYY');
				}
			}

			return times;
		},

		createPdfFromList: function(entries){
			var that = this;

			var doc = new jsPDF()
			doc.text(20, 20, 'Merkliste von _______________')
		
			_.each(entries, function(entry, i){
				doc.text(20, 40 + (i*20), entry.name);
			});

			doc.save('afeefa-bookmarks-' + moment().format('YYYY-MM-DD'));
		}

	}
});