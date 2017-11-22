import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

import * as _ from 'underscore';
window._ = _;

import Hammer from 'hammerjs';

import 'materialize-css/dist/js/materialize.min.js'

import moment from 'moment/min/moment-with-locales';
window.moment = moment;

import APPAFEEFA from './APPAFEEFA.js';
//make app avaible in global scope
var APP = new APPAFEEFA();
window.APP = APP;

APP.init(function () {
	if (APP.getUserDevice() === 'mobile') {
		APP.getRouter().initialNavigate();
	} else {
		APP.getRouter().initialNavigate();
	}
	APP.say('appInitialized');
});
