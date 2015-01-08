angular.module('Demo', [
  'ngLoading',
  'lumx'
])
.config(function(loadingProvider, $httpProvider) {
  console.log($httpProvider, 'responseInterceptors');
})
.controller('LoadingController', function($scope, $http, $timeout, $document, Interceptor) {
  var body = angular.element($document[0].body);
  var config = {};
  // $scope.showLoading = true;
  $scope.config = {
    transitionSpeed: '.3s',
    overlay: {
      color: '#FEFEFE',
      opacity: '.3',
      display: true
    }
  };

  $scope.test = function() {
    if($scope.config.overlay.display === 'true') $scope.config.overlay.display = true;
    config = angular.copy($scope.config);
    $http({
      method: 'GET',
      url: 'https://www.reddit.com/.json',
      // showLoading: false,
      loadingConfig: config
    }).then(function(result) {
      // console.log(result.data);
    });
    // Interceptor.start();
    // $timeout(function(){
    //   Interceptor.end();
    // }, 3000);
  };

});







