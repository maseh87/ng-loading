angular.module('ngLoading.compileFactory', [])
.factory('compileFactory', ['$compile', '$rootScope', '$document', '$timeout', function($compile, $rootScope, $document, $timeout) {

  //compile the directive to register into the dom
  var body = angular.element($document[0].body);
  var div;

  // Append the directive to the body and fade-in
  var append = function() {
    div = $compile('<div class="loader"></div>')($rootScope);
    body.append(div);
    $timeout(function() {
      div.removeClass('fade-out');
      div.addClass('fade-in');
    }, 400);
  };

  // Remove div from the DOM and fade-out
  var remove = function() {
    $timeout(function() {
      div.addClass('fade-out');
    }, 400).then(function() {
      $timeout(function() {
        div.remove();
      }, 1000);
    });
  };

  return {
    append: append,
    remove: remove
  };
}]);