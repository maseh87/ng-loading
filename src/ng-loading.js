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
      transitionSpeed: '.5s',
    };
    var overlay = {
      display: '',
      color: ''
    };

    //extend the config object with the available object passed in globally
    loadService.load = function(configObj) {
      var c, o;
      //verify the configObj before the provider is registered
      if(configObj.overlay) {
        o = verify(configObj.overlay, 'overlay');
      }

      c = verify(configObj);
      _.extend(config, c);
      config.overlay = o;
    };

    function verify(obj, option) {
      console.log(obj, '------config');

      //make sure configObj is an Object
      var cObj = {},
          oObj = {};

      if(!_.isPlainObject(obj)) {
        throw 'an object must be passed in';
      }

      if(option) {
        //check overlay color
        if(obj.color) {
          oObj.color = convertColor(obj.color);
        }
        //check overlay opacity
        if(obj.opacity) {
          console.log(obj.color, 'overlay color');
        }
        return oObj;
      }
      return obj;
    }

    //converts the hex color into a rgba color
    function convertColor(hColor) {
      var R = parseInt(cutHex(hColor).substring(0, 2), 16);
      var G = parseInt(cutHex(hColor).substring(2, 4), 16);
      var B = parseInt(cutHex(hColor).substring(4, 6), 16);
      return 'rgba(' + R + ', ' + G + ', ' + B + ', ' + '0.5)';
    }

    //removes the # from the front of the hex color
    function cutHex(hColor) {
      return (hColor.charAt(0) === '#') ? hColor.substring(1, 7) : hColor;
    }


    config.overlay = overlay;
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