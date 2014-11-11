angular.module('compileFactory', [])
.factory('compileFactory', ['$compile', '$rootScope', '$document', '$timeout', function($compile, $rootScope, $document, $timeout) {

  //compile the directive to register into the dom
  var body = angular.element($document[0].body);
  var div = '<loader></loader>';
  div = $compile(div)($rootScope);

  var append = function() {
    body = angular.element($document[0].body);
    div = '<loader></loader>';
    div = $compile(div)($rootScope);
    body.append(div);
  };

  var fadeIn = function() {
    $timeout(function() {
      div.removeClass('fade-out');
      div.addClass('fade-in');
    }, 200);
  };

  var remove = function() {
    $timeout(function() {
      div.addClass('fade-out');
    }, 3000).then(function() {
      $timeout(function() {
        div.remove();
      },700);
    });
  };

  return {
    append: append,
    fadeIn: fadeIn,
    remove: remove
  };
}]);