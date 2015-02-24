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
    var config = {
      class: 'spinner',
      template: '',
      transitionSpeed: '.5s',
      icon: ''
    };
    //default overlay options
    var overlay = {
      display: '',
      color: ''
    };
    var originalConfig;
    //extend the config object with the available object passed in globally
    loadService.load = function(configObj) {
      originalConfig = configObj;
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
      // c = verify(configObj);
      //extend new properties onto the config obj
      _.extend(config, configObj);
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
        // if(obj.display === true) {
        obj.display = option;
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
        // }
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
        config: {
          globalConfig: config,
          localConfig: null
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
  //check if its a font awesome icon
  var checkClass;

  var templates = {
    'load-bar-inbox': '<div class="'+ checkClass+' fade-out">' + '<div class="' + checkClass +  '"></div>' + '</div>',
    'spinner': '<div class="'+ checkClass +' fade-out">' + '<div class="svg-wrapper">' + '<svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">' + '<circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>' + '</svg>' + '<div>' + '</div>'
  };

  var directive = {
    restrict: 'EAC',
    scope: {},
    replace: true,
    template: function() {
      console.log(loading, 'heres the directive running in the template function');
      // if(loading.config.class === '') {
      //   loading.config.class = 'spinner';
      // }
      // checkClass = loading.config.icon.slice(0, 2);

      // if(loading.config.icon) {
      //   return '<div class="' + loading.config.overlay.display + ' fade-out">' + '<div class="wrapper">' + '<i class="' + loading.config.icon +  '"></i></div>' + '</div>'
      // }
      if(loading.config.localConfig) {
        console.log(loading.config, 'local-config');
        if(loading.config.localConfig.class) {
          checkClass = loading.config.localConfig.class;
          return templates[loading.config.localConfig.class];
        }
      } else {
        console.log(loading.config, 'global-config');
        checkClass = loading.config.globalConfig.class;
        return templates[loading.config.globalConfig.class];
      }
    },
    compile: function(elem) {
      console.log('its compiling');
      if(loading.config.localConfig) {
        if(loading.config.localConfig.overlay) {
          if(loading.config.localConfig.overlay.display !== 'overlay') {
            loading.config.localConfig.overlay.display = loading.config.localConfig.overlay.display || '';
          }
          elem[0].style.background = loading.config.localConfig.overlay.color;
          elem[0].style.transition = loading.config.localConfig.transitionSpeed;
        }  
      } else {
        if(loading.config.globalConfig.overlay) {
          if(loading.config.globalConfig.overlay.display !== 'overlay') {
            loading.config.globalConfig.overlay.display = loading.config.globalConfig.overlay.display || '';
          }
          elem[0].style.background = loading.config.globalConfig.overlay.color;
          elem[0].style.transition = loading.config.globalConfig.transitionSpeed;
        }
      }
      return {
        pre: function() {
          console.log('the prelink function');
        },
        post: function() {
          console.log('the link function');
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
    div = $compile('<loader></loader>')($rootScope);
    // console.log(div, 'div');
    body.append(div);
    $timeout(function() {
      div.removeClass('fade-out');
      div.addClass('fade-in');
    }, 200);
  };

  // Remove div from the DOM and fade-out
  var remove = function() {
    $timeout(function() {
      div.addClass('fade-out');
    }, 3000).then(function() {
      $timeout(function() {
        div.remove();
      },700);
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
