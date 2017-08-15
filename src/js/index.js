import MainView from './Views/MainView';

function init() {
	console.log('Hello From index.js');
	const mainView = new MainView('Hello World');
	mainView.drawText();
	mainView.drawText();
}

init();