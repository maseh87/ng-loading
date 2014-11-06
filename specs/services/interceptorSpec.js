describe('interceptor-factory', function() {
  var interceptor;
  beforeEach(module('ng-loading','services'));

  beforeEach(inject(function(Interceptor) {
    interceptor = Interceptor;
  }));

  it('should exist', function() {
    expect(interceptor).to.be.an('object');
  });

  it('should have a request property', function() {
    expect(interceptor.request).to.be.a('function');
  });

  it('should have a response property', function() {
    expect(interceptor.response).to.be.a('function');
  });
});