describe('load-directive', function() {
  var $scope, element, isolate;
  beforeEach(module('ngLoading'));
  beforeEach(inject(function($rootScope, $compile) {
    $scope = $rootScope.$new();
    element = '<loader></loader>';
    element = $compile(element)($scope);
    $scope.$digest();
    isolate = element.isolateScope();
  }));

  it('should have isolate scope', function() {
    expect(isolate).to.be.an('object');
  });

});