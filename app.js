angular.module('ng-loading', [])

.config(function($httpProvider, compileFactoryProvider, $provide) {
  //Loading Provider Used to add options to ng-loading
  $provide.provider('loading', function() {
    var enable = true;
    var givenClass;

    return {
      enable: function(value) {
        enable = value;
      },
      class: function(className){
        givenClass = className;
      },
      $get: function() {
        return {
          enable: enable,
          class: givenClass
        };
      }
    };
  });
  //Push the Interceptor factory object to listen for http reqests and responses
  $httpProvider.interceptors.push('Interceptor');
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
    // if(body.hasClass('overlay')) {
    //   body.removeClass('overlay');
    // } else {
    //   body.addClass('overlay', 2000);
    // }
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
  //compile the directive to register into the dom
  var body = angular.element($document[0].body);
  var div = '<loader></loader>';
  div = $compile(div)($rootScope);

  var append = function() {
    if(div.hasClass('fadeout')) {
      div.removeClass('fadeout');
    }
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
//directive to be attached to the DOM
.directive('loader', function(loading) {
  var directive = {
    restrict: 'EAC',
    scope: {},
    compile: function(telem, tattrs){
      console.log('--compile--');
      return {
        pre: function(scope, elem, attrs) {
          console.log('--preLink--');
        },
        post: function(scope, elem, attrs) {
          console.log('--postLink--');
        }
      };
    },
    replace: true,
    template: function(elem, attrs) {
      console.log(elem, 'a');
      console.log(attrs, 'b');
      // return '<div class="wrapper">' +
      // '<svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">' +
      //   '<circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>' +
      // '</svg>' +
      // '</div>';
      return '<div class="google-loader"></div>'
    }
  };
  return directive;
});



    // '<div class="wrapper">' +
    //   '<svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">' +
    //     '<circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>' +
    //   '</svg>' +
    //   '</div>'
