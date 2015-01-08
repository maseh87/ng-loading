angular.module('ngLoading.compileFactory', [])
.factory('compileFactory', ['$compile', '$rootScope', '$document', '$timeout', function($compile, $rootScope, $document, $timeout) {

  //compile the directive to register into the dom
  var body = angular.element($document[0].body);
  var div = '<loader></loader>';
  div = $compile(div)($rootScope);

  // Append the directive to the body and fade-in
  var append = function() {
    body.append(div);
    div.addClass('load-bar-inbox');
    $timeout(function() {
      div.removeClass('fade-out');
      div.addClass('fade-in');
    }, 200);
  };

  // Remove div from the DOM and fade-out
  var remove = function() {
    $timeout(function() {
      div.addClass('fade-out');
    }, 3000).then(function() {
      $timeout(function() {
        div.removeClass('load-bar-inbox');
      },700);
    });
  };

  return {
    append: append,
    remove: remove
  };
}]);