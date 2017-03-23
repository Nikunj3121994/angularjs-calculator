angular.module('angularjsCalculatorApp')

.directive('calculator', function($parse, CalculatorService) {

  return {
    restrict: 'E',
    templateUrl: 'views/directives/calculator-directive.html',
    link: function($scope) {
      $scope.re = /^[0-9\+*/-]+$/i;
      $scope.calculations = CalculatorService.getCalculations();
      $scope.calculate = function() {
        var output = CalculatorService.calculate($scope.input);
        CalculatorService.addCalculation({
          date: new Date().getTime(),
          input: $scope.input,
          output: output.toDecimalPlaces(1, 0)
        });
        $scope.input = '';
      };
    }
  };
});
