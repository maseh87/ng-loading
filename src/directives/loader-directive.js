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
