angular.module('ng-loading', [
  'directives',
  'services'
])

.config(function($httpProvider, $provide) {

  //Loading Provider Used to add options to ng-loading
  $provide.provider('loading', function() {
    //create the default config object to be used in the interceptor service
    var loadObj;

    var config = {
      load: function(configObj) {
        loadObj._merge(configObj);
      }
    };

    //extend the config object with the available object passed in globally
    // _.merge(config, globalConfig);

    //set $get function to be called by angular injector
    //required when creating provider constructors
    config.$get = function() {
      return {
        load: loadObj
      };
    };
    //return config object
    return config;
  });
  //Push the Interceptor factory object to listen for http reqests and responses
  $httpProvider.interceptors.push('Interceptor');
});