angular.module('ngLoading', [
  'directives',
  'compileFactory',
  'interceptor'
])

.config(['$httpProvider', '$provide', function($httpProvider, $provide) {
  //Loading Provider Used to add options to ng-loading
  $provide.provider('loading', function() {
    //service object available to the injector
    var loadService = {};

    //create the default config object to be used in the interceptor service
    var config = {
      class: 'load-bar-inbox',
      template: '',
      transitionSpeed: '.5s',
      icon: ''
    };
    //default overlay options
    var overlay = {
      display: '',
      color: ''
    };

    //extend the config object with the available object passed in globally
    loadService.load = function(configObj) {
      //verify that an object was passed in
      if(!_.isPlainObject(configObj)) {
        throw 'an object must be passed in';
      }

      var c, o;
      //verify the overlay obj before the provider is registered
      if(configObj.overlay) {
        o = verify(configObj.overlay, 'overlay');
      }
      //verify the configObj properties before the provider is registered
      c = verify(configObj);
      //extend new properties onto the config obj
      _.extend(config, c);
      //extend new properties onto the overlay obj
      _.extend(overlay, o);

      return config;
    };

    function verify(obj, option) {
      //verify that an object was passed in
      if(!_.isPlainObject(obj)) {
        throw 'an object must be passed in';
      }
      //option is passed in to check the overlay obj
      if(option) {
        if(obj.display === true) {
          obj.display = 'overlay';
          //check overlay color
          if(obj.color[0] === '#' && obj.opacity) {
            obj.color = convertColor(obj.color, obj.opacity);
          } else if(obj.color[0] === '#') {
            obj.color = convertColor(obj.color, '0.5');
          }
          //check overlay opacity
          if(obj.opacity) {
            // console.log(obj.color, 'overlay color');
          }
        }
        return obj;
      }
      //return config object if option is undefined
      return obj;
    }

    //converts the hex color into a rgba color
    function convertColor(hColor, opacity) {
      opacity = opacity || '0.5';
      var R = parseInt(cutHex(hColor).substring(0, 2), 16);
      var G = parseInt(cutHex(hColor).substring(2, 4), 16);
      var B = parseInt(cutHex(hColor).substring(4, 6), 16);
      return 'rgba(' + R + ', ' + G + ', ' + B + ', ' + opacity + ')';
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
}]);