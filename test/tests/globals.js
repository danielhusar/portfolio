var expect = chai.expect,
		should = chai.should();


describe('Portfolio', function() {

	describe('Globals', function() {
	  it('Prototypes exists.', function () {
	  	DanielHusar.should.be.a('function');
	  	DanielHusar.prototype.device.should.be.a('object');
	  	DanielHusar.prototype.isDevice.should.be.a('function');
	  	DanielHusar.prototype.log.should.be.a('function');
	  	DanielHusar.prototype.prefix.should.be.a('function');
	  	DanielHusar.prototype.hash.should.be.a('function');
	  	DanielHusar.prototype.fmt.should.be.a('function');
	  });

	  it('DH instance exists.', function () {
	  	DH.should.be.a('object');
	  });

	  it('FMT is working.', function () {
	  	DH.fmt("test%@1%@2", 1, 2).should.equal('test12');
	  });
  });

  describe('Settings', function() {
	  it('We should be on development environment.', function () {
	  	DH.settings.environment.isProduction.should.equal(false);
	  });
	})


	describe('Events', function() {
	  it('Events object exists.', function () {
	  	DH.events.should.be.a('object');
	  });
	});

	describe('Libraries', function() {
	  it('Libraries object exists.', function () {
	  	DH.libraries.should.be.a('object');
	  });
	})



});

