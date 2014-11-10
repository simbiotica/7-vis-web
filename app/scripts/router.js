define([
  'backbone'
], function(Backbone) {

  'use strict';

  var Router = Backbone.Router.extend({

    routes: {
      '': 'welcome',
      ':visualization': 'loadVisualization'
    },

    welcome: function() {
      Backbone.Events.trigger('change:page', 'welcome');
    },

    loadVisualization: function(visualization) {
      Backbone.Events.trigger('change:page', visualization);
    }

  });

  return Router;

});
