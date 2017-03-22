angular.module('angularjsCalculatorApp')

.controller('NavCtrl', function($route) {
  var self = this;
  self.isActive = function (routeName) {
    return $route.current && $route.current.loadedTemplateUrl === 'views/' + routeName + '.html'
  };
});
