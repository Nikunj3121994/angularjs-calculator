angular.module('angularjsCalculatorApp')

.directive('calculator', function(CalculatorService) {
  return {
    restrict: 'E',
    templateUrl: 'views/directives/calculator-directive.html',
    link: function($scope, elem, attrs) {
      $scope.re = /^[0-9\+*/-]+$/i;
      $scope.calculations = CalculatorService.getCalculations();
      $scope.calculate = function() {
        CalculatorService.addCalculation({
          date: new Date().getTime(),
          input: $scope.input,
          output: $scope.$eval($scope.input)
        });
        $scope.input = '';
      };
    }
  };
});
