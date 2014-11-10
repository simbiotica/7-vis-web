require([
  'backbone',
  'views/page_view',
  'views/nav_view',
  'router'
], function(Backbone, PageView, NavView, Router) {

  'use strict';

  new PageView();
  new NavView();

  new Router();

  Backbone.history.start();

});
