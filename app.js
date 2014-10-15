angular.module('ng-loading', [])

.config(function($httpProvider) {
  $httpProvider.interceptors.push('Interceptor');
})
.controller('LoadingController', function($scope, $http) {
  $scope.test = 'test';
  $http({
    method: 'GET',
    url: 'http://www.reddit.com/.json'
  }).then(function(result) {
    console.log(result.data, 'results');
  });
})
.factory('Interceptor', function($document, $injector, $q) {
  var defer = $q.defer();
  return {
    request: function(config) {
      $injector.invoke(function(compileFactory) {
        compileFactory.append();
        defer.resolve(config);
      });
      return defer.promise;
    },
    response: function(response) {
      $injector.invoke(function(compileFactory) {
        compileFactory.remove();
      });
      return response;
    }
  };
})
.factory('compileFactory', function($compile, $rootScope, $document, $timeout) {
  var body = angular.element($document[0].body);
  var div = '<loader></loader>';
  div = $compile(div)($rootScope);
  var append = function() {
    console.log(div);
    div.addClass('google-loader');
    body.append(div);
  };
  var remove = function() {
    $timeout(function() {
      div.removeClass('google-loader').addClass('fade-out');
    }, 4000);
  };

  return {
    append: append,
    remove: remove
  };
})
.directive('loader', function() {
  return {
    restrict: 'EAC',
    scope: {},
    link: function(scope, element, attrs) {

    },
    template: '<div></div>'
  };
});




