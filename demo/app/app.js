angular.module('Demo', [
  'ng-loading'
])

.config(function(loadingProvider) {
  console.log(loadingProvider, 'Loading Provider');
})
.controller('LoadingController', function($scope, $http, $interval, $document) {
  var body = angular.element($document[0].body);
  $scope.test = function() {
    $http({
      method: 'GET',
      url: 'http://www.reddit.com/.json',
    }).then(function(result) {
      console.log(result.data);
    });
  };
});