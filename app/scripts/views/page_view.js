define([
  'underscore',
  'backbone'
], function(_, Backbone) {

  'use strict';

  var PageView = Backbone.View.extend({

    el: '.l-page',

    initialize: function() {
      this.body = $('body');
      this.$header = $('.l-header');
      this.setListeners();
    },

    setListeners: function() {
      Backbone.Events.on('page:change', this.onPageChange, this);
    },

    onPageChange: function(page) {
      this.$el.removeClass('is-active');
      if (page === 'welcome') {
        this.body[0].className = 'welcome-theme';
        this.$header.fadeOut();
        // this.$el.removeClass('is-active');
        $('#welcomePageView').addClass('is-active');
        // $('#welcomePageView').fadeIn();
      } else if (page === 'about') {
        this.body[0].className = 'about-theme';
        this.$header.fadeIn();
        // this.$el.removeClass('is-active');
        $('#aboutPageView').addClass('is-active');
        // $('#aboutPageView').fadeIn();
      } else {
        this.body[0].className = 'theme-' + page;
        this.$header.fadeIn();
        // this.$el.removeClass('is-active');
        $('#vis' + page + 'PageView').addClass('is-active');
        // $('#vis' + page + 'PageView').fadeIn();
      }
    }

  });

  return PageView;

});
