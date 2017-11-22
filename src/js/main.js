import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

import * as _ from 'underscore';
window._ = _;

import Hammer from 'hammerjs';
window.Hammer = Hammer;

import 'materialize-css/dist/js/materialize'

import moment from 'moment/min/moment-with-locales';
window.moment = moment;

import APPAFEEFA from './APPAFEEFA.js';
//make app avaible in global scope
var APP = new APPAFEEFA();
window.APP = APP;

$( document ).ready(function() {
	APP.init(function () {
		if (APP.getUserDevice() === 'mobile') {
			APP.getRouter().initialNavigate();
		} else {
			APP.getRouter().initialNavigate();
		}
		APP.say('appInitialized');
	});
});
