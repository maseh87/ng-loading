angular.module('ngLoading', [
  'ngLoading.directives',
  'ngLoading.compileFactory',
  'ngLoading.interceptor'
])

.config(['$httpProvider', '$provide', function($httpProvider, $provide) {
  //Loading Provider Used to add options to ng-loading
  $provide.provider('loading', function() {
    //service object available to the injector
    var loadService = {};

    //create the default config object to be used in the interceptor service
    var defaultConfig = {
      class: 'load-bar-inbox',
      template: '',
      transitionSpeed: '.1s',
      icon: '',
      overlay: {
        color: '',
        opacity: ''
      }
    };

    var localConfig = {
      class: 'load-bar-inbox',
      template: '',
      transitionSpeed: '.1s',
      icon: '',
      overlay: {
        color: '',
        opacity: ''
      }
    };
    //default overlay options
    var originalConfig;
    //extend the config object with the available object passed in globally
    loadService.load = function(configObj) {
      originalConfig = configObj;
      //verify that an object was passed in
      if(!_.isPlainObject(configObj)) {
        throw 'an object must be passed in';
      }
      //extend new properties onto the config obj
      _.merge(defaultConfig, verify(configObj));

      return defaultConfig;
    };

    function verify(obj, type) {
      //verify that an object was passed in
      if(!_.isPlainObject(obj)) {
        throw 'an object must be passed in';
      }
      //option is passed in to check the overlay obj
      if(obj.displayOverlay === true) {
        obj.displayOverlay = 'overlay';
        //check overlay color
        if(obj.overlay.color[0] === '#' && obj.overlay.opacity) {
          obj.overlay.color = convertColor(obj.overlay.color, obj.overlay.opacity);
        } else if(obj.overlay.color[0] === '#') {
          obj.overlay.color = convertColor(obj.overlay.color, '0.5');
        }
      } else {
        obj.displayOverlay = 'no-overlay';
      }
      //return config object if option is undefinedfd
      if(type) return _.merge(localConfig, obj);

      // return obj;
      return _.merge(defaultConfig, obj);
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


    // config.overlay = overlay;
    //set $get function to be called by angular injector
    //required when creating provider constructors
    loadService.$get = function() {
      return {
        config: {
          globalConfig: defaultConfig,
          localConfig: localConfig
        },
        verify: verify
      };
    };

    //return config object
    return loadService;
  });


  //Push the Interceptor factory object to listen for http reqests and responses
  $httpProvider.interceptors.push('Interceptor');

}]);