import MainView from './Views/MainView';
import _ from 'jQuery';

function init() {
	console.log('Hello From index.js');
	const mainView = new MainView('Hello World');
	mainView.drawText();
	mainView.drawText();
}

init();