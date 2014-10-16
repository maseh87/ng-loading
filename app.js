angular.module('ng-loading', [])

.config(function($httpProvider, compileFactoryProvider, $provide) {
  $provide.provider('loading', function() {
    var enable = true;
    return {
      enable: function(value) {
        enable = value;
      },
      $get: function() {
        return {
          enable: enable
        };
      }
    };
  });
  $httpProvider.interceptors.push('Interceptor');
})
.controller('LoadingController', function($scope, $http, $interval) {
  $scope.test = function() {
    $http({
      method: 'GET',
      url: 'http://www.reddit.com/.json',
    }).then(function(result) {
    });
  };
})
.factory('Interceptor', function($document, $injector, $q, loading, $log) {
  var defer = $q.defer();
  return {
    request: function(config) {
      if(!loading.enable) {
        $log.log(loading, 'loading');
        return config;
      }
      $injector.invoke(function(compileFactory) {
        compileFactory.append();
        defer.resolve(config);
      });
      return defer.promise;
    },
    response: function(response) {
      $injector.invoke(function(compileFactory) {
        compileFactory.remove();
      });
      return response;
    }
  };
})
.factory('compileFactory', function($compile, $rootScope, $document, $timeout) {
  var body = angular.element($document[0].body);
  var div = '<loader></loader>';
  div = $compile(div)($rootScope);
  var append = function() {
    if(div.hasClass('fadeout')) {
      div.removeClass('fadeout');
    }
    body.addClass('fadeIn', '2000');
    body.append(div);
  };
  var remove = function() {
    $timeout(function() {
      div.addClass('fadeout');
    }, 3000);
  };

  return {
    append: append,
    remove: remove
  };
})
.directive('loader', function() {
  return {
    restrict: 'EAC',
    scope: {},
    link: function(scope, element, attrs) {
    },
    replace: true,
    template: '<div class="google-loader"></div>'
  };
});



