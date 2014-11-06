angular.module('directives', [])

//directive to be attached to the DOM
.directive('loader', function(loading) {
  console.log(loading, 'directive section');

  var directive = {
    restrict: 'EAC',
    scope: {},
    replace: true,
    template:
      // '<div class="box fade-out">' +
      //   '<div class="wrapper">' +
      //     '<svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">' +
      //       '<circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>' +
      //     '</svg>' +
      //   '<div>' +
      // '</div>'

      '<div class="'+ loading.config.overlay.display +' fade-out">' +
        '<div class="' + loading.config.class +  '"></div>' +
      '</div>'

      // '<div class="box fade-out">' +
      //   '<div class="wrapper">' +
      //     '<svg class="spinner" height="50" width="50">' +
      //       '<circle class="path" cx="25" cy="25.2" r="19.9" fill="none" stroke-width="6" stroke-miterlimit="10" />' +
      //     '</svg>' +
      //   '<div>' +
      // '</div>'

  };
  //return the directive object
  return directive;
});
