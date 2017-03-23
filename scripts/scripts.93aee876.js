"use strict";angular.module("angularjsCalculatorApp",["ngRoute"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).otherwise({redirectTo:"/"})}]),angular.module("angularjsCalculatorApp").controller("NavCtrl",["$route",function(a){var b=this;b.isActive=function(b){return a.current&&a.current.loadedTemplateUrl==="views/"+b+".html"}}]),angular.module("angularjsCalculatorApp").controller("MainCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("angularjsCalculatorApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("angularjsCalculatorApp").factory("CalculatorService",function(){var a=function(a){for(var b,c=[],d="",e=0;b=a.charAt(e);e++)"*/+-".indexOf(b)>-1?""==d&&"-"==b?d="-":(c.push(new Decimal(d),b),d=""):d+=a.charAt(e);return""!=d&&c.push(new Decimal(d)),c},b=[{"*":function(a,b){return a.mul(b)},"/":function(a,b){return a.div(b)}},{"+":function(a,b){return a.add(b)}},{"-":function(a,b){return a.sub(b)}}],c=[];return{addCalculation:function(a){c.push(a)},getCalculations:function(){return c},calculate:function(c){for(var d,e=a(c),f=[],g=0;g<b.length;g++){for(var h=0;h<e.length;h++){var i=b[g],j=e[h];i[j]?d=i[j]:d?(f[f.length-1]=d(f[f.length-1],j),d=null):f.push(j)}e=f,f=[]}return e.length>1?(console.log("Error: unable to resolve calculation"),e):e[0]}}}),angular.module("angularjsCalculatorApp").directive("calculator",["$parse","CalculatorService",function(a,b){return{restrict:"E",templateUrl:"views/directives/calculator-directive.html",link:function(a){a.re=/^[0-9\+*/-]+$/i,a.calculations=b.getCalculations(),a.calculate=function(){var c=b.calculate(a.input);b.addCalculation({date:(new Date).getTime(),input:a.input,output:c.toDecimalPlaces(1,0)}),a.input=""}}}}]),angular.module("angularjsCalculatorApp").run(["$templateCache",function(a){a.put("views/about.html",'<div class="panel panel-default"> <div class="panel-heading"> <div class="panel-title"> Instructions </div> </div> <div class="panel-body"> <p> Create an AngularJS directive that includes a text input element. Any text the user enters should be analyzed and a response output to the page. The input should accept simple equations, such as <code>2+3/2</code> and then output the appropriate answer, paying attention to the order of operations. <code>+</code>, <code>-</code>, <code>*</code> and <code>/</code> are the only symbols that need to be accepted, and you cannot use the <code>eval</code> function. If the input is not valid, the output text should change to indicate this to the user. </p> </div> </div>'),a.put("views/directives/calculator-directive.html",'<div class="row"> <div class="col-sm-6"> <div class="panel panel-default"> <div class="panel-heading"> <div class="panel-title"> Enter a calculation </div> </div> <div class="panel-body"> <form name="form" ng-submit="calculate(); form.$setPristine()" novalidate> <fieldset> <div class="form-group"> <label for="input">E.g. <code>2+3/2</code>:</label> <div> <input class="form-control" id="input" name="input" ng-model="input" ng-pattern="re" placeholder="0" required type="text"> </div> </div> <div class="row"> <div class="col-sm-8" role="alert"> <p class="text-warning" ng-show="form.input.$invalid"> You may only enter digits (0-9) or operators (+, -, *, /). </p> </div> <div class="col-sm-4"> <input class="btn btn-primary" ng-disabled="form.$pristine" type="submit" value="Calculate!"> </div> </div> </fieldset> </form> </div> </div> </div> <div class="col-sm-6"> <div class="panel panel-default"> <div class="panel-heading"> <div class="panel-title"> Calculations </div> </div> <div class="panel-body"> <table class="table table-striped"> <thead> <tr> <th>Date</th> <th>Input</th> <th>Output</th> </tr> </thead> <tbody> <tr ng-repeat="calculation in calculations | orderBy: \'-date\'"> <td>{{calculation.date | date: \'mediumTime\'}}</td> <td>{{calculation.input}}</td> <td>{{calculation.output}}</td> </tr> </tbody> </table> </div> </div> </div> </div>'),a.put("views/main.html","<calculator> </calculator>")}]);