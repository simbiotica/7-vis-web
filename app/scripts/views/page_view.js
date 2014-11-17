define([
  'underscore',
  'backbone',
  'handlebars',
  'text!templates/page.handlebars'
], function(_, Backbone, Handlebars, TPL) {

  'use strict';

  var PageView = Backbone.View.extend({

    el: '.l-page',

    visualizations: {
      '1': 'http://simbiotica.github.io/protected-areas',
      '2': 'http://simbiotica.github.io/wpc-twitter',
      '3': 'http://simbiotica.github.io/wpc-bio-data-hobby',
      '4': 'http://saleiva.github.io/EcoHack2012',
      '5': 'http://dhakelila.github.io/blackSaturday',
      '6': 'http://osm2.cartodb.com/viz/ee3f60a6-68cc-11e4-b97b-0e018d66dc29/embed_map'
    },

    template: Handlebars.compile(TPL),

    initialize: function() {
      this.body = $('body');
      this.$header = $('.l-header');
      this.setListeners();
    },

    setListeners: function() {
      Backbone.Events.on('page:load', this.onPageChange, this);
    },

    onPageChange: function(page) {
      this.$el
        .removeClass('is-active')
        .find('iframe').fadeOut(500, function() {
          $(this).remove();
        });
      if (page === 'welcome') {
        this.body[0].className = 'welcome-theme';
        this.$header.fadeOut();
        $('#welcomePageView').addClass('is-active');
      } else if (page === 'about') {
        this.body[0].className = 'about-theme';
        this.$header.fadeIn();
        $('#aboutPageView').addClass('is-active');
      } else {
        var $current = $('#vis' + page + 'PageView');
        this.body[0].className = 'theme-' + page;
        this.$header.fadeIn();
        $current
          .html(this.template({
            url: this.visualizations[page]
          }));
        setTimeout(function() {
          $current.addClass('is-active');
        }, 1000);
      }
    }

  });

  return PageView;

});
