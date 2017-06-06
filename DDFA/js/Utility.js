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
			
			var dateFrom = record.dateFrom? moment(record.dateFrom).format('L') : record.dateFrom;
			var dateTo = record.dateTo? moment(record.dateTo).format('L') : record.dateTo;
			var timeFrom = record.timeFrom? moment( moment(record.dateFrom).format('YYYY-MM-DD') + ' ' + record.timeFrom).format('LT') : record.timeFrom;
			var timeTo = function(){
				if(record.dateTo)
					return record.timeTo? moment( moment(record.dateTo).format('YYYY-MM-DD') + ' ' + record.timeTo).format('LT') : record.timeTo;
				else
					return record.timeTo? moment( moment(record.dateFrom).format('YYYY-MM-DD') + ' ' + record.timeTo).format('LT') : record.timeTo;
			}();

			var vocabDateFrom = APP.getLM().resolve('prop.dateFrom');
			var vocabDateTo = APP.getLM().resolve('prop.dateTo');
			var vocabTimeFrom = APP.getLM().resolve('prop.timeFrom');
			var vocabTimeTo = APP.getLM().resolve('prop.timeTo');
			var vocabTimeAt = APP.getLM().resolve('prop.timeAt');
			var vocabUntil = APP.getLM().resolve('prop.until');


			if( dateFrom && timeFrom && dateTo && timeTo){
				times += vocabDateFrom + ' ' + dateFrom + ' ' +vocabTimeAt+ ' ' + timeFrom + '<br>';
				times += vocabDateTo + ' ' + dateTo + ' ' + vocabTimeAt + ' ' + timeTo;
			}
			else if( dateFrom && timeFrom && timeTo){
				times += dateFrom + ' ' + vocabTimeFrom + ' ' + timeFrom + ' ' +vocabTimeTo+ ' ' + timeTo;
			}
			else if( dateFrom && timeFrom){
				times += dateFrom + ' ' +vocabTimeAt+ ' ' + timeFrom;
			}
			else if( dateFrom && dateTo){
				if(options.short) times += vocabUntil+ ' ' + dateTo;
				else times += vocabDateFrom + ' ' + dateFrom + ' ' +vocabDateTo+ ' ' + dateTo;
			}
			else if( dateFrom ){
				times += dateFrom;
			}
			
			return times;
		}

	}
});