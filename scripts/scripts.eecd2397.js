"use strict";angular.module("angularjsCalculatorApp",["ngRoute"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).otherwise({redirectTo:"/"})}]),angular.module("angularjsCalculatorApp").controller("NavCtrl",["$route",function(a){var b=this;b.isActive=function(b){return a.current&&a.current.loadedTemplateUrl==="views/"+b+".html"}}]),angular.module("angularjsCalculatorApp").controller("MainCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("angularjsCalculatorApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("angularjsCalculatorApp").factory("CalculatorService",function(){var a=[];return{addCalculation:function(b){a.push(b)},getCalculations:function(){return a}}}),angular.module("angularjsCalculatorApp").directive("calculator",["$parse","CalculatorService",function(a,b){return{restrict:"E",templateUrl:"views/directives/calculator-directive.html",link:function(c,d,e){c.re=/^[0-9\+*\/-]+$/i,c.calculations=b.getCalculations(),c.calculate=function(){var d=a(c.input);b.addCalculation({date:(new Date).getTime(),input:c.input,output:d()}),c.input=""}}}}]),angular.module("angularjsCalculatorApp").run(["$templateCache",function(a){a.put("views/about.html",'<h2>About</h2> <p>Create an AngularJS directive that includes a text input element. Any text the user enters should be analyzed and a response output to the page. The input should accept simple equations, such as "2 + 3 / 2" and then output the appropriate answer, paying attention to the order of operations. +, -, /, and * are the only symbols that need to be accepted, and you cannot use the eval function. If the input is not valid, the output text should change to indicate this to the user.</p>'),a.put("views/directives/calculator-directive.html",'<div class="row"> <div class="col-sm-6"> <div class="panel panel-default"> <div class="panel-heading"> <div class="panel-title"> Enter a calculation </div> </div> <div class="panel-body"> <form name="form" ng-submit="calculate(); form.$setPristine()" novalidate> <fieldset> <div class="form-group"> <label for="input">E.g. <code>2+3/2</code>:</label> <div> <input class="form-control" id="input" name="input" ng-model="input" ng-pattern="re" placeholder="0" required type="text"> </div> </div> <div class="row"> <div class="col-sm-8" role="alert"> <p class="text-warning" ng-show="form.input.$invalid"> You may only enter digits (0-9) or operators (+, -, *, /). </p> </div> <div class="col-sm-4"> <input class="btn btn-primary" ng-disabled="form.$pristine" type="submit" value="Calculate!"> </div> </div> </fieldset> </form> </div> </div> </div> <div class="col-sm-6"> <div class="panel panel-default"> <div class="panel-heading"> <div class="panel-title"> Calculations </div> </div> <div class="panel-body"> <table class="table table-striped"> <thead> <tr> <th>Date</th> <th>Input</th> <th>Output</th> </tr> </thead> <tbody> <tr ng-repeat="calculation in calculations | orderBy: \'-date\'"> <td>{{calculation.date | date: \'mediumTime\'}}</td> <td>{{calculation.input}}</td> <td>{{calculation.output}}</td> </tr> </tbody> </table> </div> </div> </div> </div>'),a.put("views/main.html","<h2>Calculator</h2> <calculator> </calculator>")}]);