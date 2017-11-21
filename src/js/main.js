import APPAFEEFA from './APPAFEEFA.js';

var APP = new APPAFEEFA();

export default APP;

APP.init(function () {
	if (APP.getUserDevice() === 'mobile') {
		APP.getRouter().initialNavigate();
	} else {
		APP.getRouter().initialNavigate();
	}
	APP.say('appInitialized');
});
