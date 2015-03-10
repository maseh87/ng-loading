angular.module('ngLoading.directives', [])

//directive to be attached to the DOM
.directive('loader', ['loading', '$compile', function(loading, $compile) {
  //check if its a font awesome icon

  var directive = {
    restrict: 'EAC',
    scope: {},
    replace: true,
    template: function() {
      var checkClass;

      var templates = {
        'load-bar-inbox': '<div class="'+ loading.config.globalConfig.overlay.display +'">' + '<div class="' + loading.config.globalConfig.class +  '"></div>' + '</div>',
        'spinner': '<div class="'+ loading.config.globalConfig.overlay.display +' fade-out">' + '<div class="svg-wrapper">' + '<svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">' + '<circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>' + '</svg>' + '<div>' + '</div>'
      };
      if(loading.localConfig) {
        if(loading.localConfig.class) {
          checkClass = loading.localConfig.class;
          return templates[loading.localConfig.class];
        }
      } else {
        checkClass = loading.config.globalConfig.class;
        return templates[loading.config.globalConfig.class];
      }
    },
    compile: function(elem) {
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
