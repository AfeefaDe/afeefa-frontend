class MainView {
	 constructor(mainText) {
      console.log('Hello From MainView.js');
    	this.mainText = mainText;
  	}
  	drawText() {
    	var element = document.createElement('div');
    	element.innerHTML = this.mainText;
    	document.body.appendChild(element);
  	}
}

export { MainView as default}