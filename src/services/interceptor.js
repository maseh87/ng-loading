angular.module('ngLoading.interceptor', [])
.factory('Interceptor', ['$document', '$injector', '$q', 'loading', '$log', function($document, $injector, $q, loading, $log) {
  var overlay, loadConfig;
  return {
    // Start the animation manually
    start: function() {
      $injector.invoke(function(compileFactory) {
        compileFactory.append();
      });
    },
    // End the animation manually
    end: function() {
      $injector.invoke(function(compileFactory) {
        compileFactory.remove();
      });
    },
    // Each request made
    request: function(config) {
      var defer = $q.defer();
      if(config.showLoader) { 
        $injector.invoke(function(compileFactory) {
          compileFactory.append();
          defer.resolve(config);
        });
      }
      return defer.promise;
    },
    // Each response recieved
    response: function(response) {
      $injector.invoke(function(compileFactory) {
        compileFactory.remove();
      });
      return response;
    }
  };
}]);
