angular.module('ngLoading.interceptor', [])
.factory('Interceptor', ['$document', '$injector', 'loading', function($document, $injector, loading) {

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
      if(config.showLoader) {
        if(config.loadingConfig) {
          $injector.invoke(function(loading) {
            console.log(loading, 'the loading config');
            console.log(config.loadingConfig, 'the request config');
            //need to check if they have overlay in the future
            loading.localConfig = config.loadingConfig;
          });
        }
        console.log(config, 'config');
        $injector.invoke(function(compileFactory) {
          compileFactory.append();
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
