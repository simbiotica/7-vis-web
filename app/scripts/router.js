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
      Backbone.Events.trigger('page:change', 'welcome');
    },

    loadVisualization: function(visualization) {
      Backbone.Events.trigger('page:change', visualization);
    }

  });

  return Router;

});
