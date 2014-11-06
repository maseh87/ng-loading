angular.module('ng-loading', [
  'directives',
  'services'
])

.config(function($httpProvider, $provide) {

  //Loading Provider Used to add options to ng-loading
  $provide.provider('loading', function() {

    //create the default config object to be used in the interceptor service
    var config = {};
    var loadService = {};

    //extend the config object with the available object passed in globally
    loadService.load = function(configObj) {
        _.merge(config, configObj);
    };

    //set $get function to be called by angular injector
    //required when creating provider constructors
    loadService.$get = function() {
      return {
        config: config
      };
    };
    //return config object
    return loadService;
  });
  //Push the Interceptor factory object to listen for http reqests and responses
  $httpProvider.interceptors.push('Interceptor');
});