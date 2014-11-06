angular.module('Demo', [
  'ng-loading'
])

.config(function(loadingProvider) {
  loadingProvider
    .load({
      overlay: {
        color: '#FFFFFF',
        opacity: '0.1',
      },
      transitionSpeed: '1s'
    });
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