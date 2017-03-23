angular.module('angularjsCalculatorApp')

.factory('CalculatorService', function() {

  /**
   * Parses a calculation string into an array of numbers and operators
   * @return {{Array.<Object|string>}}
  */
  var parseCalculationString = function(s) {
    var calculation = [];
    var current = '';
    for (var i = 0, ch; ch = s.charAt(i); i++) {
      if ('*/+-'.indexOf(ch) > -1) {
        if (current == '' && ch == '-') {
          current = '-';
        } else {
          calculation.push(new Decimal(current), ch);
          current = '';
        }
      } else {
        current += s.charAt(i);
      }
    }
    if (current != '') {
      calculation.push(new Decimal(current));
    }
    return calculation;
  };

  /**
   * Mathematical operations available to the calculator
   * @type {[*]}
   */
  var operations = [
    {
      '*': function(a, b) { return a.mul(b); },
      '/': function(a, b) { return a.div(b); }
    },
    {
      '+': function(a, b) { return a.add(b); }
    },
    {
      '-': function(a, b) { return a.sub(b); }
    }
  ];

  /**
   * Data store for saved calculations
   * @type {Array}
   */
  var calculations = [];

  return {
    /**
     * Saves a calculation
     * @param {Object} calculation
     */
    addCalculation: function(calculation) {
      calculations.push(calculation);
    },
    /**
     * Returns all calculations
     */
    getCalculations: function() {
      return calculations;
    },
    /**
     * Performs a calculation expressed as an array of operators and numbers
     * @param {string} s
     */
    calculate: function(s) {
      var calculation = parseCalculationString(s); // parses the input string
      var newCalculation = [];
      var currentOperation;
      for (var i = 0; i < operations.length; i++) {
        for (var j = 0; j < calculation.length; j++) {
          var thisOperation = operations[i];
          var thisCalculationPart = calculation[j]; // operand or operator
          // matches functions in ops array with operators in input string
          if (thisOperation[thisCalculationPart]) {
            currentOperation = thisOperation[thisCalculationPart];
          }
          // applies current operation to numbers preceding and following it
          else if (currentOperation) {
            newCalculation[newCalculation.length - 1] = currentOperation(newCalculation[newCalculation.length - 1], thisCalculationPart);
            currentOperation = null;
          }
          // remembers parts of calculation of lower precedence
          else {
            newCalculation.push(thisCalculationPart);
          }
        }
        calculation = newCalculation;
        newCalculation = [];
      }
      if (calculation.length > 1) {
        console.log('Error: unable to resolve calculation');
        return calculation;
      } else {
        return calculation[0];
      }
    }
  };
});
