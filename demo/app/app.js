angular.module('Demo', [
  'ngLoading',
  'ngMaterial'
])
.config(function(loadingProvider, $httpProvider, $timeoutProvider) {
  loadingProvider
    .load({
      transitionSpeed: '.3s',
      class: 'load-bar-inbox',
      overlay: {
        color: '#000000',
        opacity: '.3',
        display: true
      }
    });
})
.controller('LoadingController', function($scope, $http, $timeout, $document, $mdToast, Interceptor) {
  var body = angular.element($document[0].body);
  var config = {};
  $scope.config = {
    transitionSpeed: '.3s',
    class: 'spinner'
  };

  $scope.test = function() {
    // config = angular.copy($scope.config);
    $http({
      method: 'GET',
      url: 'https://www.reddit.com/.json',
      showLoader: true,
      // loadingConfig: config
    }).then(function(result) {
      // console.log(result.data);
    });
    // Interceptor.start();
    // $timeout(function(){
    //   Interceptor.end();
    // }, 3000);
  };
  $scope.test2 = function() {
    $http({
      method: 'GET',
      url: 'https://www.reddit.com/.json',
      showLoader: true,
      loadingConfig: $scope.config
    }).then(function(result) {
      // console.log(result.data);
    });
  }

});







