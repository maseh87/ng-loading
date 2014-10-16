angular.module('ng-loading', [])

.config(function($httpProvider, compileFactoryProvider, $provide, $injector, InterceptorProvider) {
  $provide.provider('loading', function() {
    var disable = false;
    return {
      disable: function(boolean) {
        disable = boolean;
      },
      $get: function() {
        return {
          disable: disable
        };
      }
    };
  });

  $httpProvider.interceptors.push('Interceptor');

})
.controller('LoadingController', function($scope, $http, $interval) {
  $scope.test = 'test';
  $interval(function(){
    $http({
      method: 'GET',
      url: 'http://www.reddit.com/.json',
      loading: false
    }).then(function(result) {
    });
  }, 7000);
})
.factory('Interceptor', function($document, $injector, $q, loading, $log) {
  var defer = $q.defer();
  return {
    request: function(config) {
      if(loading.disable) {
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
    body.append(div);
    body.addClass('fadeIn', '2000');
  };
  var remove = function() {
    $timeout(function() {
      div.addClass('fadeout');
    }, 4000);
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




