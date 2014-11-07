angular.module('Demo', [
  'ng-loading'
])

.config(function(loadingProvider) {
  loadingProvider
    .load({
      overlay: {
        color: '#8a2be2',
        opacity: '.3',
        display: true
      },
      transitionSpeed: '.8s',
      class: 'spinner'
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