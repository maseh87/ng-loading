angular.module('ng-loading', [
  'directives',
  'services'
])

.config(function($httpProvider, $provide) {

  //Loading Provider Used to add options to ng-loading
  $provide.provider('loading', function() {

    var loadService = {};
    //create the default config object to be used in the interceptor service
    var config = {
      overlay: {
        display: 'overlay',
        color: '',
        fadeInSpeed: '',
        fadeOutSpeed: ''
      },
      class: 'load-bar-inbox',
      templateUrl: ''
    };

    var verify = function(obj) {
      //make sure configObj is an Object
      if(!_.isPlainObject(obj)) {
        throw 'The .load method in your config block only takes an Object as the parameter!';
      }
    };

    //extend the config object with the available object passed in globally
    loadService.load = function(configObj) {
      //verify the configObj before the provider is registered
      verify(configObj);

      _.extend(config, configObj);
    };

    //set $get function to be called by angular injector
    //required when creating provider constructors
    loadService.$get = function() {
      return {
        config: config,
        verify: verify
      };
    };
    //return config object
    return loadService;
  });
  //Push the Interceptor factory object to listen for http reqests and responses
  $httpProvider.interceptors.push('Interceptor');
});