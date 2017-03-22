angular.module('angularjsCalculatorApp')

.directive('calculator', function($parse, CalculatorService) {
  return {
    restrict: 'E',
    templateUrl: 'views/directives/calculator-directive.html',
    link: function($scope, elem, attrs) {
      $scope.re = /^[0-9\+*/-]+$/i;
      $scope.calculations = CalculatorService.getCalculations();
      $scope.calculate = function() {
        var getOutput = $parse($scope.input);
        CalculatorService.addCalculation({
          date: new Date().getTime(),
          input: $scope.input,
          output: getOutput()
        });
        $scope.input = '';
      };
    }
  };
});
