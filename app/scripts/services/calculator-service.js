angular.module('angularjsCalculatorApp')

.factory('CalculatorService', function() {
  var calculations = [];
  return {
    addCalculation: function(calculation) {
      calculations.push(calculation);
    },
    getCalculations: function() {
      return calculations;
    }
  };
});
