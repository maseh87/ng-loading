describe('loadingProvider', function() {
  var provider,
      config;

  beforeEach(function() {
    //create a test module to inject the loading provider into
    angular.module('test-app', ['ngLoading'])
      .config(function(loadingProvider) {
        provider = loadingProvider;
      });
      //initailize the modules for testing
      module('ngLoading', 'test-app');
      //make the injectors register again
      inject(function(){});

      config = provider.$get();
  });

  it('should exist', function() {
    expect(provider).to.not.be(null);
  });

  it('should have a load method', function() {
      expect(provider.load).to.be.a('function');
  });

  it('should return an object', function() {
    expect(config).to.be.an('object');
  });

  it('should return the config object', function() {
    expect(config.config).to.be.an('object');
  });

  it('should have a verify method', function() {
    expect(config.verify).to.be.a('function');
  });

});