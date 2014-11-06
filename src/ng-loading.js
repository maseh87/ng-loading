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
      class: 'load-bar-inbox',
      templateUrl: '',
      overlay: {
        display: '',
        color: '',
        fadeInSpeed: '',
        fadeOutSpeed: ''
      }
    };


    var verify = function(obj) {
      console.log('----------verify------');
      //make sure configObj is an Object
      if(!_.isPlainObject(obj)) {
        throw 'The .load method in your config block only takes an Object as the parameter!';
      }
      //check overlay color
      if(obj.overlay.color) {
        config.overlay.color = convertColor(obj.overlay.color);
      }
      // config.overlay = overlay;
      //check overlay
      // if(!obj.overlay)
    };

    function convertColor(hColor) {
      var R = parseInt(cutHex(hColor).substring(0, 2), 16);
      var G = parseInt(cutHex(hColor).substring(2, 4), 16);
      var B = parseInt(cutHex(hColor).substring(4, 6), 16);
      return 'rgba(' + R + ', ' + G + ', ' + B + ', ' + '0.5)';
    }

    function cutHex(hColor) {
      return (hColor.charAt(0) === '#') ? hColor.substring(1, 7) : hColor;
    }


    //extend the config object with the available object passed in globally
    loadService.load = function(configObj) {
      //verify the configObj before the provider is registered
      verify(configObj);
      console.log(config, '------config');
      // _.extend(config, configObj);
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