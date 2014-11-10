define([
  'underscore',
  'backbone',
  'handlebars',
  'moment',
  'text!templates/nav.handlebars'
], function(_, Backbone, Handlebars, moment, TPL) {

  'use strict';

  var NavView = Backbone.View.extend({

    el: '#navView',

    options: {
      startDate: '2014-11-10',
      days: 7
    },

    events: {
      'click a': 'checkDisabled'
    },

    template: Handlebars.compile(TPL),

    initialize: function() {
      this.getDates();
    },

    render: function() {
      this.$el.html(this.template({dates: this.dates}));
    },

    getDates: function() {
      var result = [];
      var now = moment();
      var startDate = moment(this.options.startDate);
      _.times(this.options.days, function(i) {
        var date = moment(startDate).add(i, 'days');
        result.push({
          name: date.format('YYYY-MM-DD'),
          datetime: date.format(),
          day: date.format('DD'),
          dayname: date.format('dd'),
          enabled: now.isSame(date, 'day') || now.isAfter(date, 'day')
        });
      });
      this.dates = result;
      this.render();
    },

    checkDisabled: function(e) {
      var $current = $(e.currentTarget);
      if ($current.hasClass('is-disabled')) {
        e.preventDefault();
      } else {
        Backbone.Events.trigger('load:page', $current.data('page'));
      }
    }

  });

  return NavView;

});
