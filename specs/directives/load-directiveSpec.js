describe('load-directive', function() {
  var $scope, $element, isolate;
  beforeEach(module('ngLoading'));
  beforeEach(inject(function($rootScope, $compile) {
    $scope = $rootScope.$new();
    $element = angular.element('<loader></loader>');
    $compile($element)($scope);
    $scope.$digest();
    isolate = $element.isolateScope();
  }));

  it('should have isolate scope', function() {
    expect(isolate).to.be.an('object');
  });

  it('should have a child element with a default class of load-bar-inbox', function() {
    expect($element.children().hasClass('load-bar-inbox')).to.be(true);
  });

});