require([
  'backbone',
  'views/nav_view',
  'router'
], function(Backbone, NavView, Router) {

  'use strict';

  new NavView();

  new Router();

  Backbone.history.start();

});
