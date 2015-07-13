var expect = require('chai').expect
  , config = {name: 'mxl'}
  , pkg = '../../package.json'
  , program = require('../../lib/mxl');

describe('mxl:', function() {

  it('should list aliases', function(done) {
    var args = ['alias', '--no-color'];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      done();
    })
    def.parse(args);
  });

});
