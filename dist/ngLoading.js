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
angular.module('ngLoading.directives', [])

//directive to be attached to the DOM
.directive('loader', ['loading', '$compile', function(loading, $compile) {

  var directive = {
    restrict: 'EAC',
    scope: {},
    replace: true,
    template: function() {
      var checkClass,
          checkOverlay = loading.config.globalConfig.displayOverlay;

      var templates = {
        'load-bar-inbox': '<div class="'+ checkOverlay +' fade-out"><div class="load-bar-inbox"></div></div>',
        'material-spinner': '<div class="'+ checkOverlay + ' fade-out"><div class="material-spinner"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div></div>',
        'kit-kat': '<div class="'+ checkOverlay +' fade-out"><div class="kit-kat"><div class="dot white"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div>'
      };
      if(loading.config.localConfig) {
        checkOverlay = loading.config.localConfig.displayOverlay;
        if(loading.config.localConfig.class) {
          checkClass = loading.config.localConfig.class;
          return templates[loading.config.localConfig.class];
        }
      } else {
        checkClass = loading.config.globalConfig.class;
        return templates[loading.config.globalConfig.class];
      }
    },
    compile: function(elem) {
      if(loading.config.localConfig) {
        if(loading.config.localConfig.displayOverlay === 'overlay') {
          elem[0].style.background = loading.config.localConfig.overlay.color;
          elem[0].style.transition = loading.config.localConfig.transitionSpeed;
        }
      } else {
        if(loading.config.globalConfig.displayOverlay === 'overlay') {
          elem[0].style.background = loading.config.globalConfig.overlay.color;
          elem[0].style.transition = loading.config.globalConfig.transitionSpeed;
        }
      }
      return {
        pre: function() {
          // console.log('the prelink function');
        },
        post: function() {
          // console.log('the link function');
        }
      }
    }
  };
  //return the directive object
  return directive;
}]);

angular.module('ngLoading.compileFactory', [])
.factory('compileFactory', ['$compile', '$rootScope', '$document', '$timeout', function($compile, $rootScope, $document, $timeout) {

  //compile the directive to register into the dom
  var body = angular.element($document[0].body);
  var div;

  // Append the directive to the body and fade-in
  var append = function() {
    div = $compile('<div class="loader"></div>')($rootScope);
    body.append(div);
    $timeout(function() {
      div.removeClass('fade-out');
      div.addClass('fade-in');
    }, 400);
  };

  // Remove div from the DOM and fade-out
  var remove = function() {
    $timeout(function() {
      div.addClass('fade-out');
    }, 400).then(function() {
      $timeout(function() {
        div.remove();
      }, 1000);
    });
  };

  return {
    append: append,
    remove: remove
  };
}]);
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
