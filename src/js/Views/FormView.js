import qx from 'qooxdoo/qx-oo.js';
 
import PerfectScrollbar from 'perfect-scrollbar';
 

 

export default qx.Class.define("FormView", {

  extend: View,
  type: "singleton",

  properties: {
    baseUrl: {},
    formTypes: {},
    currentForm: {}
  },

  construct: function () {
    var that = this;

    that.setViewId('formView');
    that.setLoadable(true);
    that.setBaseUrl(document.location.origin + '/inc/');

    that.setFormTypes({
      feedback: {
        name: 'feedback',
        templateFile: 'form_feedback.html',
        sendMethod: that.createFeedback
      },
      contact: {
        name: 'contact',
        templateFile: 'form_contact.html',
        sendMethod: that.createContact
      },
      newEntry: {
        name: 'newEntry',
        templateFile: 'form_newEntry.html',
        sendMethod: that.createEntry
      },
      entryFeedback: {
        name: 'entryFeedback',
        templateFile: 'form_entryFeedback.html',
        sendMethod: that.createEntryFeedback
      }
    });

    that.setCurrentForm(null);
  },

  members: {

    render: function () {
      var that = this;

      // view container
      that.view = $("<div />");
      that.view.attr('id', that.getViewId());

      $('#main-container').append(that.view);

      // heading
      var headingContainer = $("<div />").addClass('heading');
      that.heading = $("<h1 />");
      headingContainer.append(that.heading);
      that.view.append(headingContainer);

      // back button
      that.createBackBtn(function(){
        if (that.getCurrentForm().formType.name != 'contact') APP.getRouter().backToLastKeyState();
        that.close();
      });

      // form container
      that.scrollContainer = $("<div />")
        .addClass('scroll-container');
      if (APP.getUserDevice() == 'desktop') that.ps = new PerfectScrollbar(that.scrollContainer[0]);
      that.view.append(that.scrollContainer);

      this.base(arguments);
    },

    load: function (type, options) {
      var that = this;

      // load form from html and insert
      that.scrollContainer.load(that.getBaseUrl() + that.getFormTypes()[type].templateFile, function( response, status, xhr ){
        if(status == "error" ){}

        // fill mustaches with values
        var filledHtml = that.fillMustaches(that.scrollContainer.html(), (options && options.mustaches)? options.mustaches : null);
        that.scrollContainer.html(filledHtml);

        // init character counters
        that.view.find('input, textarea').each(function(i, el){
          $(el).characterCounter();
        });

        that.view.find('input.datepicker').each(function(i, el){
          $(el).val('2017-12-24');
        });

        // init select dropdowns
        that.view.find('select').each(function(i, el){
          $(el).material_select();
          $(el).addClass('hidden');
        });

        that.parseForm(type, options);
        that.loadUIVocab(type, options);
        if( APP.getUserDevice() == 'desktop') that.ps.update();
      });

      that.view.addClass('active');
      that.isActive(true);
    },

    loadUIVocab: function(type, options){
      var that = this;
      that.heading.empty().append(that.getWording('form.heading.' + type));
    },

    parseForm: function(type, options){
      var that = this;

      var form = {
        formType: null,
        formEl: null,
        submitEl: null,
        fields: {}
      };

      // form type
      form.formType = that.getFormTypes()[type];

      // the form
      form.formEl = that.view.find('form').first();

      form.formEl.submit(function (e) {
        e.preventDefault();
        that.send(options);
      });

      // the fields
      that.view.find('input, textarea, select').each(function(i, el){
        var $el = $(el);

        // skip additional input elements, which were created by materialize multi select only for visual purpose
        if( $el.hasClass('select-dropdown') ) return;
        if( $el.parents('ul').first().hasClass('multiple-select-dropdown') ) return;

        form.fields[$el.attr('id')] = {
          modelAttr: $el.attr('id'),
          el: $el
        }
      });

      // conditional things
      that.view.find('.conditional').each(function(i, el){
        var dependentField = form.fields[$(el).attr('data-condition')].el;

        dependentField.change(function(){
          var value = ($(this).attr('type') == 'checkbox')? $(this).prop('checked').toString() : $(this).val();
          if( _.contains($(el).attr('data-condition-value').split(','), value) )
            $(el).show();
          else
            $(el).hide();
        });

        dependentField.trigger('change');
      });

      // the cancel button
      that.view.find('button#cancel').first().click(function(){
        that.close();
      });

      // the cancel button
      that.view.find('a.become-editor').first().click(function(e){
        e.preventDefault();
        APP.getFormView().load( 'feedback' );
      });
      
      that.setCurrentForm(form);
    },

    readForm: function(){
      var that = this;

      var formData = {};
      
      // extract all model names
      var attributes = [];
      _.each(that.getCurrentForm().fields, function(value, key){
        attributes.push(value.modelAttr.split('.')[0]);
      });
      
      _.each(_.unique(attributes), function(element){
        formData[element] = {};    
      });

      // extract attribute values and combine
      _.each(that.getCurrentForm().fields, function(value, key){
        var realValue;

        if( value.el.attr('type') == 'checkbox' ){
          realValue = value.el[0].checked;
        }
        else {
          realValue = value.el.val();
        }
        formData[value.modelAttr.split('.')[0]][value.modelAttr.split('.')[1]] = realValue;
      });

      return formData;
    },

    send: function (options) {
      var that = this;

      APP.loading(true);

      var data = that.readForm();
      console.debug(data);

      // call specific send method and give callback
      that.getCurrentForm().formType.sendMethod(data, options, function(success){
        that.createModal({
          content: success? $('<h5>'+that.getWording('form.message.'+that.getCurrentForm().formType.name+'.success')+'</5>') : $('<h5>' +that.getWording('form.fail')+ '</5>'),
          dismissible: true,
          buttonLabel: success? "Schön" : 'Hm!',
          actions: {
            ready: function(){},
            close: function(){ 
              if(success) that.close();
              else APP.loading(false);
            }
          }
        });
      });
    },

    createEntry: function (data, options, cb) {
      var that = this;

      data.entry.area = APP.getArea().dataKey;
      
      var data_converted = {
        marketentry: data.entry,
        location: data.location
      };

      APP.getDataManager().addMarketEntry(
        data_converted,
        function(success){
          cb(success);
        }
      );

      // send outgoing message
      var entryTypes = {0: 'Orga', 1: 'Börse', 2: 'Event'};

      // to slack
      APP.getDataManager().createSlackMessage({
          heading: function () {
              var entryTypeString = entryTypes[data.entry.type];
              var marketTypeString = (data.entry.offer) ? 'Angebot' : 'Gesuch';
              if (data.entry.type == 1) entryTypeString += ' (' + marketTypeString + ')'
              return 'Neuer Eintrag: ' + entryTypeString + ' "' + data.entry.name + '"'
          }(),
          message: '```\n' + data.entry.descriptionShort + '\n```\n'
          + 'für Kinder: `' + (data.entry.forChildren ? 'ja' : '-') + '`\n'
          + 'Unterstützer gesucht: `' + (data.entry.supportWanted ? 'ja' : 'nein') + '`\n'
          + 'Unterstützung Details: `' + data.additional.internalComment + '`\n'
          + 'Kontaktperson: `' + data.entry.speakerPublic + '`\n'
          + 'Sprachen: `' + data.entry.spokenLanguages + '`\n'
          + 'mail: `' + data.entry.mail + '` '
          + 'web: `' + data.entry.web + '` '
          + 'facebook: `' + data.entry.facebook + '` '
          + 'phone: `' + data.entry.phone + '`\n'
          + 'Ort: `' + data.location.placename + ', ' + data.location.street + ', ' + data.location.zip + ' ' + data.location.city + '`\n'
          + 'von: `' + data.entry.dateFrom + ' (' + data.entry.timeFrom + ')' + '`\n'
          + 'bis: `' + data.entry.dateTo + ' (' + data.entry.timeTo + ')' + '`\n'
          + 'Anmerkung: `' + data.additional.comment + '`\n'
      }, null, APP.getArea().dataKey);
    },

    createFeedback: function (data, options, cb) {
      var that = this;

      // to slack
      APP.getDataManager().createSlackMessage({
        heading: 'Feedback von _' + data.feedback.author + '_ (' + data.feedback.mail + ')',
        message: '```\n' + data.feedback.message + '\n```'
      });

      APP.getDataManager().feedback(
        {
          message: data.feedback.message,
          author: data.feedback.author,
          mail: data.feedback.mail
        }, function(success){
          cb(success);
        }
      );
    },

    createEntryFeedback: function (data, options, cb) {
      var that = this;

      // to slack
      APP.getDataManager().createSlackMessage({
        heading: 'Feedback zum Eintrag _' + options.entry.name + '_ von _' + data.feedback.author + '_ (' + data.feedback.mail + ')',
        message: '```\n' + data.feedback.message + '\n```'
      });

      APP.getDataManager().entryFeedback(
        options.entry,
        {
          message: data.feedback.message,
          author: data.feedback.author,
          phone: data.feedback.phone,
          mail: data.feedback.mail
        }, function(success){
          cb(success);
        }
      );
    },

    createContact: function (data, options, cb) {
      var that = this;

      // to slack
      APP.getDataManager().createSlackMessage({
        heading: 'Kontaktanfrage von _' + data.contact.author + ' (' + data.contact.mail + ')_ an ' + options.entry.name + ' (' + APP.getRouter().getFrontendUrlForEntry(options.entry, {absolute: true}) + ')',
        message: '```\n' + data.contact.message + '\n```'
        // message: '```Nachricht wurde anonymisiert```'
      });

      APP.getDataManager().contact(
        options.entry,
        {
          message: data.contact.message,
          author: data.contact.author,
          phone: data.contact.phone,
          mail: data.contact.mail
        }, function(success){
          cb(success);
        }
      );
    },

    addEvents: function () {
      var that = this;
      
      // call superclass
      this.base(arguments);

      that.listen('searchViewLoaded', function(){
        that.close();
      });
    },

    reset: function () {
      var that = this;

      that.scrollContainer.empty();

      APP.loading(false);
    },

    close: function () {
      var that = this;

      that.reset();
      that.setCurrentForm(null);
      that.view.removeClass('active');
      that.isActive(false);
    },

    changeLanguage: function () {
      var that = this;

      if (that.getCurrentForm()) that.load( that.getCurrentForm().formType.name );
    }
  }
});