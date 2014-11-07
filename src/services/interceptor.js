angular.module('interceptor', [])
.factory('Interceptor', function($document, $injector, $q, loading, $log) {
  var defer = $q.defer();
  return {
    request: function(config) {
      //disable loading screen for a per request basis
      if(config.showLoading === false) return config;

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
});