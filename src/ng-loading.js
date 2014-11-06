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
      //make sure configObj is an Object
      if(!_.isPlainObject(configObj)) {
        throw 'The .load method in your config block only takes an Object as the parameter!';
      }
      config.class = config.class || 'load-bar-inbox';
      _.extend(config, configObj);
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