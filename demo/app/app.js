angular.module('Demo', [
  'ngLoading',
  'ngMaterial'
])
.config(function(loadingProvider, $httpProvider, $timeoutProvider) {
  loadingProvider
    .load({
      transitionSpeed: '.3s',
      class: 'material-spinner',
      displayOverlay: true,
      overlay: {
        color: '#FFFFFF',
        opacity: '.3'
      }
    });
})
.controller('LoadingController', function($scope, $http, $timeout, $document, $mdToast, Interceptor) {
  var config = {};
  $scope.config = {
    transitionSpeed: '.3s',
    class: 'kit-kat'
  };

  $scope.test = function() {
    Interceptor.start();
    $timeout(function() {
      Interceptor.end();
    }, 3000);
  };
  $scope.test2 = function() {
    $http({
      method: 'GET',
      url: 'https://www.reddit.com/.json',
      loadingConfig: $scope.config
    });
  }
});
