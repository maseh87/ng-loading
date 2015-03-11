angular.module('ngLoading.interceptor', [])
.factory('Interceptor', ['$document', '$injector', 'loading', function($document, $injector, loading) {

  return {
    // Start the animation manually
    start: function(config) {
      $injector.invoke(function(loading, compileFactory) {
        if(config) {
          loading.localConfig = loading.verify(config);
        } else {
          loading.config.localConfig = null;
        }
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
      if(config.loadingConfig) {
        $injector.invoke(function(loading, compileFactory) {
          //need to check if they have overlay in the future
          loading.localConfig = loading.verify(config.loadingConfig, 'local');
          if(document.querySelector('loader')) {
            return config;
          } else {
            compileFactory.append();
          }
        });
        return config;
      }
      else {
        $injector.invoke(function(loading, compileFactory) {
          loading.localConfig = null;
          if(document.querySelector('loader')) {
            return config;
          } else {
            compileFactory.append();
          }
        });
      }
      return config;
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
