angular.module('ng-loading', [])

.config(function($httpProvider, compileFactoryProvider, $provide) {
  //Loading Provider Used to add options to ng-loading
  $provide.provider('loading', function(globalConfig) {

    //create the default config object to be used in the interceptor service
    var config = {
      enable: function(value) {
        enable = value;
      },
      class: function(className){
        givenClass = className;
      }
    };

    //extend the config object with the available object passed in globally
    _.merge(config, globalConfig);

    //set $get function to be called by angular injector
    config.$get = function() {
      return {
        enable: enable,
        class: givenClass
      };
    };
    //return config object
    return config;
  });
  //Push the Interceptor factory object to listen for http reqests and responses
  $httpProvider.interceptors.push('Interceptor');
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
        compileFactory.fadeIn();
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
})
.factory('compileFactory', function($compile, $rootScope, $document, $timeout) {
  //compile the directive to register into the dom
  var body = angular.element($document[0].body);
  var div = '<loader></loader>';
  div = $compile(div)($rootScope);

  var append = function() {
    body.append(div);
  };

  var fadeIn = function() {
    $timeout(function() {
      div.removeClass('fade-out');
      div.addClass('fade-in');
    }, 200);
  };

  var remove = function() {
    $timeout(function() {
      div.addClass('fade-out');
    }, 3000).then(function() {
      $timeout(function() {
        div.remove();
      },700);
    });
  };

  return {
    append: append,
    fadeIn: fadeIn,
    remove: remove
  };
})
//directive to be attached to the DOM
.directive('loader', function(loading) {
  var directive = {
    restrict: 'EAC',
    scope: {},
    replace: true,
    template:
      // '<div class="box fade-out">' +
      //   '<div class="wrapper">' +
      //     '<svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">' +
      //       '<circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>' +
      //     '</svg>' +
      //   '<div>' +
      // '</div>'

      '<div class="box fade-out">' +
        '<div class="load-bar-inbox"></div>' +
      '</div>'

      // '<div class="box fade-out">' +
      //   '<div class="wrapper">' +
      //     '<svg class="spinner" height="50" width="50">' +
      //       '<circle class="path" cx="25" cy="25.2" r="19.9" fill="none" stroke-width="6" stroke-miterlimit="10" />' +
      //     '</svg>' +
      //   '<div>' +
      // '</div>'

  };
  return directive;
});
