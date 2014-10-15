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
  // var compileFactory = $injector.get('compileFactory');
  // var body = compileFactory.body;
  return {
    request: function(config) {
      var defer = $q.defer();
      $injector.invoke(function(compileFactory) {
        compileFactory.append();
        defer.resolve(config);
      });
      return defer.promise;
    },
    response: function(response) {
      console.log(response, 'response');
      return response;
    }
  };
})
.factory('compileFactory', function($compile, $rootScope, $document) {
  var body = angular.element($document[0].body);
  var div = '<div loader></div>';
  div = $compile(div)($rootScope);
  var append = function() {
    body.append(div);
  };
  return {
    append: append
  };
})
.directive('loader', function() {
  return {
    restrict: 'EAC',
    scope: {},
    link: function(scope, element, attrs) {

    },
    template: '<div class="google-loader"></div>'
  };
});




