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
    console.log(loading.config, 'directives loading config!');
    }
  };
  //return the directive object
  return directive;
}]);
