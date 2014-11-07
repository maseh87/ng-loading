describe('configOptions', function() {
  var provider,
      config;

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
    expect(provider.load).to.be.an('function');
    dump(provider.load);
  });

  it('should have a default class of load-bar-inbox', function() {

  });

});