angular.module('Demo', [
  'ng-loading'
])

.config(function(loadingProvider) {
  loadingProvider
    .load({
      overlay: {
        color: '#000000',
        opacity: '.2',
        display: true
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
      // showLoading: false
    }).then(function(result) {
      console.log(result.data);
    });
  };
});