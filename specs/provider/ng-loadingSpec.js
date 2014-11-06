describe('ng-loading', function() {
  var provider;

  beforeEach(function() {
    //create a test module to inject the loading provider into
    angular.module('test-app', [])
      .config(function(loadingProvider) {
        provider = loadingProvider;
      });
      //initailize the modules for testing
      module('ng-loading', 'test-app');
      //make the injectors register again
      inject(function(){});
  });

  it('should exist', function() {
    expect(provider).to.not.be(null);
  });

});