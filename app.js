angular.module('ng-loading', [])

.config(function($httpProvider) {
  console.log($httpProvider.interceptors);
  $httpProvider.interceptors.push(function() {
    return {
      request: function(config) {
        console.log(config, 'config');
        return config;
      },
      response: function(response) {
        console.log(response, 'response');
        return response;
      }
    };
  });
})

.controller('LoadingController', function($scope, $http) {
  $scope.test = 'test';
  $http({
    method: 'GET',
    url: 'http://www.reddit.com/.json'
  }).then(function(result) {
    console.log(result.data);
  });
});