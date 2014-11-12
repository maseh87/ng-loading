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
angular.module('ngLoading.directives', [])

//directive to be attached to the DOM
.directive('loader', ['loading', '$compile', function(loading, $compile) {
  //check if its a font awesome icon
  var checkClass;

  var templates = {
    'load-bar-inbox': '<div class="'+ loading.config.overlay.display +' fade-out">' + '<div class="' + loading.config.class +  '"></div>' + '</div>',
    'spinner': '<div class="'+ loading.config.overlay.display +' fade-out">' + '<div class="svg-wrapper">' + '<svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">' + '<circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>' + '</svg>' + '<div>' + '</div>'
  };

  var directive = {
    restrict: 'EAC',
    scope: {},
    replace: true,
    // link: link,
    template: function() {
      if(loading.config.class === '') {
        loading.config.class = 'load-bar-inbox';
      }
      checkClass = loading.config.icon.slice(0, 2);

      if(loading.config.icon) {
        return '<div class="' + loading.config.overlay.display + ' fade-out">' + '<div class="wrapper">' + '<i class="' + loading.config.icon +  '"></i></div>' + '</div>'
      }

      return templates[loading.config.class];
    },
    compile: function(elem) {


      if(loading.config.overlay) {
        if(loading.config.overlay.display !== 'overlay') {
          loading.config.overlay.display = loading.config.overlay.display || '';
        }
        elem[0].style.background = loading.config.overlay.color;
        elem[0].style.transition = loading.config.transitionSpeed;
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
  var div = '<loader></loader>';
  div = $compile(div)($rootScope);

  var append = function() {
    // body = angular.element($document[0].body);
    // div = '<loader></loader>';
    // div = $compile(div)($rootScope);
    body.append(div);
  };

  var fadeIn = function() {
    $timeout(function() {
      div.removeClass('fade-out');
      div.addClass('fade-in');
    }, 200);
  };

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
    fadeIn: fadeIn,
    remove: remove
  };
}]);
angular.module('ngLoading.interceptor', [])
.factory('Interceptor', ['$document', '$injector', '$q', 'loading', '$log', function($document, $injector, $q, loading, $log) {
  var defer = $q.defer();
  var overlay, loadConfig;
  return {
    start: function() {
      $injector.invoke(function(compileFactory) {
        compileFactory.append();
        compileFactory.fadeIn();
        // defer.resolve(config);
      });
    },
    end: function() {
      $injector.invoke(function(compileFactory) {
        compileFactory.remove();
      });
    },
    request: function(config) {
      //disable loading screen for a per request basis
      if(config.showLoading === false) return config;

      if(config.loadingConfig) {
        loadConfig = _.extend(loading.config, loading.verify(config.loadingConfig));
        if(config.loadingConfig.overlay.display === true){
          overlay = _.extend(loading.config.overlay, loading.verify(config.loadingConfig.overlay, 'overlay'));
        }
        loading.config = loadConfig;
        loading.config.overlay = overlay;
      }

      $injector.invoke(function(compileFactory) {
        compileFactory.append();
        compileFactory.fadeIn();
        defer.resolve(config);
      });
      return defer.promise;
    },
    response: function(response) {
      $injector.invoke(function(compileFactory) {
        compileFactory.remove();
      });
      return response;
    }
  };
}]);