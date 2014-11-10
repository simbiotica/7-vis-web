define([
  'backbone'
], function(Backbone) {

  'use strict';

  var PageView = Backbone.View.extend({

    el: '.l-page',

    initialize: function() {
      this.$header = $('.l-header');
      this.setListeners();
    },

    setListeners: function() {
      Backbone.Events.on('page:change', this.onPageChange, this);
    },

    onPageChange: function(page) {
      if (page === 'welcome') {
        this.$header.fadeOut();
      } else {
        this.$header.fadeIn();
      }
    }

  });

  return PageView;

});
