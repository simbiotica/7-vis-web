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
      startDate: '2014-11-12',
      days: 7
    },

    events: {
      'click .m-main-nav a': 'checkDisable'
    },

    template: Handlebars.compile(TPL),

    initialize: function() {
      this.getDates();
    },

    render: function() {
      this.$el.html(this.template({dates: this.dates}));
      this.$mainNav = $('.m-main-nav');
      this.$secondNav = $('.m-second-nav');
      this.setListeners();
    },

    setListeners: function() {
      Backbone.Events.on('page:change', this.nagivate, this);
    },

    getDates: function() {
      var result = [];
      var now = moment();
      var startDate = moment(this.options.startDate);
      _.times(this.options.days, function(i) {
        var date = moment(startDate).add(i, 'days');
        result.push({
          index: i + 1,
          datetime: date.format(),
          dayname: date.format('ddd'),
          enabled: now.isSame(date, 'day') || now.isAfter(date, 'day')
        });
      });
      this.dates = result;
      this.render();
    },

    checkDisable: function(e) {
      var $current = $(e.currentTarget);
      if ($current.closest('li').hasClass('is-disable')) {
        e.preventDefault();
      }
    },

    nagivate: function(page) {
      var startDate = moment(this.options.startDate);
      if (moment().isBefore(startDate)) {
        return Backbone.history.navigate('', {
          trigger: true
        });
      }
      this.$el.find('li').removeClass('is-current');
      if (page === 'about') {
        $('#aboutNavItem').addClass('is-current');
      } else {
        $('#vis' + page + 'NavItem').addClass('is-current');
      }
    }

  });

  return NavView;

});
