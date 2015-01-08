angular.module('ngLoading.interceptor', [])
.factory('Interceptor', ['$document', '$injector', '$q', 'loading', '$log', function($document, $injector, $q, loading, $log) {
  var overlay, loadConfig;
  return {
    // Start the animation manually
    start: function() {
      $injector.invoke(function(compileFactory) {
        compileFactory.append();
        compileFactory.fadeIn();
        // defer.resolve(config);
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

      //disable loading screen for a per request basis
      // if(config.showLoading === false) return config;

      // if(config.loadingConfig) {
      //   loadConfig = _.extend(loading.config, loading.verify(config.loadingConfig));
      //   if(config.loadingConfig.overlay.display === true){
      //     overlay = _.extend(loading.config.overlay, loading.verify(config.loadingConfig.overlay, 'overlay'));
      //   }
      //   loading.config = loadConfig;
      //   loading.config.overlay = overlay;
      // }

      if(config.showLoader) {
        console.log('Gotcha'); 
      }

      $injector.invoke(function(compileFactory) {
        compileFactory.append();
        compileFactory.fadeIn();
        defer.resolve(config);
      });
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
