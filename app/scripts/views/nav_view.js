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
      startDate: moment('2014-11-12 08:00+11:00', 'YYYY-MM-DD HH:mm Z'),
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
      Backbone.Events.on('page:change', this.navigate, this);
    },

    getDates: function() {
      var result = [];
      var now = this.getNow();
      var startDate = this.options.startDate;
      _.times(this.options.days, function(i) {
        var date = moment(startDate).add(i + 1, 'days');
        result.push({
          index: i + 1,
          datetime: date.format(),
          dayname: date.format('ddd'),
          enabled: now.isSame(date, 'hour') || now.isAfter(date, 'hour')
        });
      });
      this.dates = result;
      this.render();
    },

    getNow: function() {
      return moment();
    },

    checkDisable: function(e) {
      var $current = $(e.currentTarget);
      if ($current.closest('li').hasClass('is-disable')) {
        e.preventDefault();
      }
    },

    navigate: function(page) {
      var now = this.getNow();
      var startDate = this.options.startDate;
      var correctDate = _.isNaN(Number(page)) ? moment(startDate) : moment(startDate).add(Number(page) -1, 'days');
      if (correctDate.isAfter(now, 'hour') || now.isBefore(startDate, 'hour')) {
        window.location.hash = '';
      } else {
        this.$el.find('li').removeClass('is-current');
        if (page === 'about') {
          $('#aboutNavItem').addClass('is-current');
        } else {
          $('#vis' + page + 'NavItem').addClass('is-current');
        }
        Backbone.Events.trigger('page:load', page);
      }
    }

  });

  return NavView;

});
