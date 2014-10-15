angular.module('ng-loading', [])

.config(function($httpProvider) {
  console.log($httpProvider.interceptors);
  $httpProvider.interceptors.push('requestInterceptor', 'responseInterceptor');
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
.factory('requestInterceptor', function($document) {
  var body = angular.element($document[0].body);
  var div = angular.element('<div class="google-loader"></div>');
  return {
    request: function(config) {
      body.append(div);
      return config;
    }
  };
})
.factory('responseInterceptor', function() {
  return {
    response: function(response) {
      console.log(response, 'response');
      return response;
    }
  };
})
.animation('.google-loader', function() {
  return {
    enter: function(elem, callback) {
    }
  };
});




