angular.module('Demo', [
  'ng-loading'
])

.config(function(loadingProvider) {
  // loadingProvider
    // .load({
    //   overlay: {
    //     color: '#000000',
    //     opacity: '.1',
    //     display: true
    //   },
    //   transitionSpeed: '.3s',
    //   // icon: 'spinner',
    //   class: 'spinner'
    // });
})
.controller('LoadingController', function($scope, $http, $interval, $document, $mdToast) {
  var body = angular.element($document[0].body);
  var config = {};
  // $scope.showLoading = true;
  $scope.config = {
    overlay: {
      color: '#000000',
      opacity: '.5',
      display: true
    }
  };

  $scope.test = function() {
    if($scope.config.overlay.display === 'true') $scope.config.overlay.display = true;
    config = angular.copy($scope.config);
    $http({
      method: 'GET',
      url: 'http://www.reddit.com/.json',
      // showLoading: false,
      loadingConfig: config
    }).then(function(result) {
      // console.log(result.data);
    });
  };

});







