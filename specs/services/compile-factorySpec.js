describe('compile-factory', function() {
  var CompileFactory;
  beforeEach(module('compileFactory'));

  beforeEach(inject(function(compileFactory) {
    CompileFactory = compileFactory;
  }));

  it('should exist', function() {
    expect(CompileFactory).to.not.be(undefined);
  });
  it('should be an object', function() {
    expect(CompileFactory).to.be.an('object');
  });

  it('should have an append property', function() {
    expect(CompileFactory.append).to.be.a('function');
  });

  it('should have a remove property', function() {
    expect(CompileFactory.remove).to.be.a('function');
  });

  it('should have an fadeIn property', function() {
    expect(CompileFactory.fadeIn).to.be.a('function');
  });
});
