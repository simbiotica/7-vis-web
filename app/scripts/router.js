define([
  'backbone'
], function(Backbone) {

  'use strict';

  var Router = Backbone.Router.extend({

    routes: {
      '': 'welcome',
      'about': 'about',
      ':visualization': 'loadVisualization'
    },

    welcome: function() {
      Backbone.Events.trigger('page:change', 'welcome');
    },

    about: function() {
      Backbone.Events.trigger('page:change', 'about');
    },

    loadVisualization: function(visualization) {
      Backbone.Events.trigger('page:change', visualization);
    }

  });

  return Router;

});
