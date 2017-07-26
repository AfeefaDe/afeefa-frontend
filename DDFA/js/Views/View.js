qx.Class.define("View", {
    
    extend : Daddy,
	type: "abstract",

    properties: {
        viewId: {},
        viewState: { init: 0 },
        loadable: { init : false }
    },

    construct: function(){
    	var that = this;
    },

    members : {
        
        render: function(){
            var that = this;

            that.view.addClass('view-container');

            if( that.getLoadable() ) {
                var loadingCurtain = $("<div />").addClass('loading-curtain');
                that.view.append(loadingCurtain);
            }

            that.addEvents();
            that.say(that.classname + 'Rendered');
            that.isRendered(true);
        },

        // set and read the active status of a view
        isActive: function(bool){
            var that = this;

            if(bool === undefined) return that.active;
                that.active = bool;
        },

        isRendered: function(bool){
            var that = this;

            if(bool === undefined) return that.rendered;
                that.rendered = bool;
        },

        // param (key, [locale])
        // @key bib key
        // @locale get wording in a specific language ignoring the current app language
        getWording: function( key, locale ){
            var that = this;

            return APP.getLM().resolve(key, locale);
        },

        loading: function( bool ){
            var that = this;

            if (bool) {
                that.view.addClass('loading');
            }
            else {
                that.view.removeClass('loading');
            }
                
        },

        showCurtain: function(bool){
            var that = this;

            if(bool){
                that.view.css('z-index', 10000);
                APP.getCurtain().addClass('active');
            }
            else {
                that.view.css('z-index', "");
                APP.getCurtain().removeClass('active');
            }
        },

        addEvents: function(){
            var that = this;

            that.listen('languageChanged', function(){
                that.changeLanguage();
            });

            ////////////////////////////
            // AFTER VIEW IS RENDERED //
            ////////////////////////////
            // that.listen(that.classname + 'Rendered', function(){
            // });
        },

        changeLanguage: function(){
            
        },

        show: function(){
          var that = this;

          that.view.removeClass('hidden');
        },

        hide: function(){
          var that = this;

          that.view.addClass('hidden');
        },

        fillMustaches: function(html, values){
            var that = this;

            // _.each(values, function(value,key){
            //     html = html.replace('{{'+key+'}}', value);
            // });

            html = html.replace(/\{\{(.+?)\}\}/g, function(outer, inner){
                // console.debug(inner);
                
                // look inside given values
                if( values && values[inner] ) {
                    return values[inner];
                }
                
                // look for translation
                if( inner.indexOf('key:') > -1 ) {
                    var key = inner.split(':')[1];
                    return that.getWording(key);
                }

                return 'undefined';
            });

            return html;
        },

        // generic function to create a single list result
        // createListResult: function( iconClass, label, subLabel, action, locationSymbol, tooltip, action_secondary ) {
        createListResult: function( options ) {
          var that = this;
          
          const resultEl = $("<div />")
            .addClass('result')
            .click(function(){
              options.action();
            })
            .on('contextmenu', function(e){
              if(options.action_secondary) {
                e.preventDefault();
                options.action_secondary();
              }
            });
          options.targetContainertEl.append(resultEl);

          // tooltip
          if(options.tooltip){
            that.createTooltip(
              resultEl,
              options.tooltip,
              'hover',
              'right',
              'desktop',
              ['search-result-tooltip']
            );
          }
          
          // icon
          const iconEl = $("<div />")
            .addClass('icon')
            .addClass(options.iconClass);
          resultEl.append(iconEl)

          // labels
          const labelsEl = $("<div />")
            .addClass('labels');
          resultEl.append(labelsEl)
          
          const mainLabelEl = $("<span />")
            .append(options.label);
          labelsEl.append(mainLabelEl);
          
          if( options.subLabel ) {
            const subLabelEl = $("<span />")
              .addClass('sub-label')
              .append(options.subLabel);
            // show location symbol?
            if(options.locationSymbol)
              subLabelEl.append('&nbsp;&nbsp;&nbsp;&nbsp;').append( $("<span />").addClass('glyphicon glyphicon-map-marker') );
            labelsEl.append(subLabelEl);
          }
        },

        // generic function to create a single entry result
        createEntryResult: function( options ) {
          var that = this;

          var entry = options.entry;
          var categoryName = entry.category ? entry.category.name : null;
          
          // icon
          var iconClass = 'cat-' + categoryName;
          iconClass += ' type-' + entry.type;
          if( entry.subCategory ) iconClass += ' subcat-' + entry.subCategory;
          
          // title
          var label = entry.name;
          
          var subLabel = '';
          
          // sub category
            subLabel += entry.subCategory ? that.getWording('cat.' + entry.subCategory) : that.getWording('cat.' + categoryName);
          // time
          if( entry.type == 2 && entry.dateFrom ) subLabel += ' | ' + APP.getUtility().buildTimeString(entry, {short: true});
          // place
          if( entry.location.length > 0 && entry.location[0].placename ){
            var placename = entry.location[0].placename;
            if(placename.length > 50) placename = placename.substring(0,50) + '...';
            subLabel += ' | @' + placename;
          }
          
          // action
          var action = function(){
            if( entry.location.length > 0 && entry.location[0].lat )
              APP.getMapView().selectMarkerFromLink(entry);
            else
              APP.getDetailView().load(entry);
          };

          var action_secondary = function(){
            if( entry.location.length > 0 && entry.location[0].lat )
              APP.getMapView().selectMarkerFromLink(entry, {preventDetailView: true});
          };

          // create entry
          var tooltip;
          if(entry.descriptionShort) tooltip = entry.descriptionShort;
          // if(!tooltip && entry.description) tooltip = entry.description;
          if(tooltip) tooltip = tooltip.substring(0,150) + '...';

          that.createListResult(
              {
                iconClass: iconClass,
                label: label,
                subLabel: subLabel,
                action: action,
                action_secondary: action_secondary,
                tooltip: tooltip,
                locationSymbol: (entry.location.length > 0),
                targetContainertEl: options.targetContainertEl
              }
            );
        },

        createBackBtn: function(action){
          var that = this;

          that.backBtn = $("<div />")
                .addClass('back-btn')
                .click(function(){
                  action();
                });
          that.view.append(that.backBtn);
        },

        createModal: function(options){
            var that = this;

            var modal = $("<div />")
                .attr('id', 'modal')
                .addClass('modal');

            var modalContent = $("<div />")
                .addClass('modal-content')
                .append(options.content);
            modal.append(modalContent);

            var modalFooter = $("<div />")
                .addClass('modal-footer');
            modal.append(modalFooter);
            
            var actionOne = $("<button />")
                .addClass('modal-action modal-close btn-flat')
                .append(options.buttonLabel);
            modalFooter.append(actionOne);
            
            $('body').append(modal);

            $('.modal').modal({
                dismissible: options.dismissible ? options.dismissible : false, // Modal can be dismissed by clicking outside of the modal
                opacity: .8, // Opacity of modal background
                inDuration: 200, // Transition in duration
                outDuration: 100, // Transition out duration
                startingTop: '4%', // Starting top style attribute
                endingTop: '10%', // Ending top style attribute
                ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
                    options.actions.ready();
                },
                complete: function() { 
                    options.actions.close();
                    $('#modal').remove();
                } // Callback for Modal close
            });

            $('#modal').modal('open');
        },

        createTooltip: function(el, content, event, placement, device, cssClasses, contentType, conditionFn){
            var that = this;

            // check device restrictions
            if( device && APP.getUserDevice() != device) return false;

            var popperConfig = {
                content: {
                    content: content,
                    contentType: contentType? contentType : 'html',
                    classNames: cssClasses? _.union(['popper'], cssClasses) : ['popper']
                },
                misc: {
                    placement: placement? placement : null,
                    removeOnDestroy: true
                }
            };

            var thePopper;
            if (event){
                // open on hover
                if( event == 'hover' ){
                    el.off(".popper");
                    el.on("mouseenter.popper", function(){
                            var condition = conditionFn? conditionFn() : true;
                            if( condition ){
                                thePopper = new Popper(
                                    el,
                                    popperConfig.content,
                                    popperConfig.misc
                                );
                            }
                        })
                        .on("mouseleave.popper", function(){
                            if( thePopper ) thePopper.destroy();
                            thePopper = undefined;
                        });
                }
            }
            // open immediately
            else {
                thePopper = new Popper(
                    el,
                    popperConfig.content,
                    popperConfig.misc
                );
            }

            return thePopper;
        }
    }

});