import qx from 'qooxdoo/qx-oo.js';
import $ from 'jquery';
import * as _ from 'underscore';

import APP from '../main.js';

export default qx.Class.define("IntroView", {
	
	extend : View,
	type: "singleton",

	construct: function(){
		var that = this;

		that.setViewId('introView');
	},

	members : {
		
		render: function(){
			var that = this;

			// view container
			that.view = $("<div />");
			that.view.attr('id', that.getViewId());

			$('#main-container').append(that.view);

			that.defineSteps();

			this.base(arguments);
		},

		defineSteps: function(){
			var that = this;

			var userDevice = APP.getUserDevice();

			that.steps = {

				stepDashboard: {
					stepName: 'dashboard',
					el: (userDevice == 'mobile')? that.view : APP.getSearchView().view,
					placement: (userDevice == 'mobile')? 'top' : 'right',
					preAction: function(){
						APP.getSearchView().scrollContainer.scrollTop(0);
						APP.getSearchView().load();
						APP.getSearchView().showCurtain(true);
					},
					afterAction: function(){
						APP.getSearchView().showCurtain(false);
					},
					phraseAppKeys: {
						heading: 'intro.step.dashboard.title',
						text: 'intro.step.dashboard.text'
					},
					buttons: ['next', 'cancelForever']
				},
				
				stepMap: {
					stepName: 'map',
					el: APP.getMapView().view,
					placement: 'top',
					preAction: function(){
						APP.getMapView().showCurtain(true);
					},
					afterAction: function(){
						APP.getMapView().showCurtain(false);
					},
					phraseAppKeys: {
						heading: 'intro.step.map.title',
						text: 'intro.step.map.text'
					},
					buttons: ['next', 'cancel']
				},
				
				stepLanguage: {
					stepName: 'language',
					el: APP.getLanguageView().langBtn,
					placement: 'right',
					preAction: function(){
						APP.getLanguageView().showCurtain(true);
					},
					afterAction: function(){
						APP.getLanguageView().showCurtain(false);
					},
					phraseAppKeys: {
						heading: 'intro.step.language.title',
						text: 'intro.step.language.text'
					},
					buttons: ['finish']
				},
				
				stepLegend: {
					stepName: 'legend',
					el: (userDevice == 'mobile')? APP.getSearchView().filterBtn : APP.getLegendView().view,
					placement: (userDevice == 'mobile')? 'bottom' : 'left',
					preAction: function(){
						if(userDevice == 'mobile'){
							APP.getSearchView().close();
							APP.getSearchView().showCurtain(true);
						} else {
							APP.getLegendView().showCurtain(true);
						}
						// APP.getLegendView().show();
					},
					afterAction: function(){
						APP.getLegendView().showCurtain(false);
						APP.getSearchView().showCurtain(false);
						// APP.getLegendView().close();
					},
					phraseAppKeys: {
						heading: 'intro.step.legend.title',
						text: 'intro.step.legend.text'
					},
					buttons: ['next', 'cancel']
				},
				
				stepLocate: {
					stepName: 'locate',
					el: APP.getPlusView().locateBtn,
					placement: 'left',
					preAction: function(){
						APP.getPlusView().showCurtain(true);
					},
					afterAction: function(){
						APP.getPlusView().showCurtain(false);
					},
					phraseAppKeys: {
						heading: 'intro.step.locate.title',
						text: 'intro.step.locate.text'
					},
					buttons: ['next', 'cancel']
				},

				stepSearch: {
					stepName: 'search',
					el: APP.getSearchView().searchBar,
					placement: 'bottom',
					preAction: function(){
						APP.getSearchView().close();
						APP.getPlusView().showCurtain(true);
					},
					afterAction: function(){
						APP.getPlusView().showCurtain(false);
					},
					phraseAppKeys: {
						heading: 'intro.step.search.title',
						text: 'intro.step.search.text'
					},
					buttons: ['next', 'cancel']
				},
				
				stepAdd: {
					stepName: 'add',
					el: APP.getSearchView().addBtn,
					placement: 'bottom',
					preAction: function(){
						APP.getSearchView().close();
						APP.getSearchView().showCurtain(true);
					},
					afterAction: function(){
						APP.getSearchView().showCurtain(false);
					},
					phraseAppKeys: {
						heading: 'intro.step.add.title',
						text: 'intro.step.add.text'
					},
					buttons: ['next', 'cancel']
				}
			};
		},

		start: function(){
			var that = this;
			
			that.view.addClass('active');
			that.isActive(true);
			that.next();
		},

		stop: function(){
			var that = this;
			
			if( that.currentTooltip ) that.currentTooltip.destroy();
			if( that.currentStep ) that.currentStep.afterAction();
			that.currentTooltip = null;
			that.currentStep = null;
			
			that.view.removeClass('active');
			that.isActive(false);
		},

		saveIntroDecision: function(){
			var that = this;
			
			localStorage.setItem("introIsKnown", 1);
		},

		next: function(){
			var that = this;

			var nextStep;
			if( !that.currentStep ) {
        nextStep = that.steps.stepDashboard;
      } else {
				switch(that.currentStep.stepName) {
				    case 'dashboard':
			        nextStep = that.steps.stepSearch;
			        break;
			      case 'search':
			        nextStep = that.steps.stepAdd;
			        break;
			      case 'add':
			        nextStep = that.steps.stepMap;
			        break;
	        	case 'map':
			        nextStep = that.steps.stepLegend;
			        break;
		       	case 'legend':
			        nextStep = that.steps.stepLocate;
			        break;
			      case 'locate':
			        nextStep = that.steps.stepLanguage;
			        break;
		        case 'language':
			        nextStep = that.steps.stepDashboard;
			        break;
				    default:
				      nextStep = that.steps.stepDashboard;
				}
      }

			// destroy existing tooltip
			if( that.currentTooltip ) that.currentTooltip.destroy();

			// do afterAction
			if( that.currentStep ) that.currentStep.afterAction();

			// create next tooltip
			nextStep.preAction();
			var tooltip = that.createTooltip(
				nextStep.el,
				that.renderContent(nextStep),
				null,
				nextStep.placement,
				// 'desktop',
				null,
				['intro'],
				'node'
			);
			that.currentTooltip = tooltip;
			that.currentStep = nextStep;
		},

		renderContent: function(step){
			var that = this;

			var contentContainer = $("<div />")
						
			var heading = $("<h3 />")
				.append(that.getWording(step.phraseAppKeys.heading));

			var text = $("<p />")
				.append(that.getWording(step.phraseAppKeys.text));
			
			contentContainer.append(heading);
			contentContainer.append(text);

			_.each(step.buttons, function(value, i){
				var labelKey, action;
				
				// define button types
				switch(value){
					case 'next':
						labelKey = 'intro.button.next';
						action = function(){that.next()};
						break;

					case 'cancel':
						labelKey = 'intro.button.cancel';
						action = function(){that.stop()};
						break;

					case 'cancelForever':
						labelKey = 'intro.button.cancel.forever';
						action = function(){
							that.stop()
							that.saveIntroDecision();
						};
						break;

					case 'finish':
						labelKey = 'intro.button.finish';
						action = function(){
							that.stop()
							that.saveIntroDecision();
						};
						break;
				}

				// generate the button
				var button = $("<button />")
					.addClass('btn block')
					.append(that.getWording(labelKey))
					.click(action);

				// make secondary buttons
				if(i>0) button.addClass('btn-flat');
				
				contentContainer.append(button);
			});

			return contentContainer;
		},

		addEvents: function(){
			var that = this;

			// call superclass
			this.base(arguments);
		},

		reset: function(){
			var that = this;
		},

		changeLanguage: function(){
			var that = this;

			if(that.isActive()){
				that.stop();
				that.start();
			}
		},

		close: function(){
			var that = this;
		}
	}

});