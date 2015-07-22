var expect = require('chai').expect
  , path = require('path')
  , config = require('../config')
  , program = require('../../lib/mxl');

describe('mxl:', function() {

  it('should error on missing source file', function(done) {
    var args = ['--no-color', '../missing.tmux.conf'];
    var def = program(require(config.pkg), config.name)
    def.program.on('error', function(err) {
      expect(err.code).to.be.gt(0);
      function fn() {
        throw err;
      }
      expect(fn).throws(Error);
      expect(fn).throws(/no such file or directory/i);
      done();
    })
    def.parse(args);
  });

  it('should error on missing source file w/ run command', function(done) {
    var args = ['run', '--no-color', '../missing.tmux.conf'];
    var def = program(require(config.pkg), config.name)
    def.program.on('error', function(err) {
      expect(err.code).to.be.gt(0);
      function fn() {
        throw err;
      }
      expect(fn).throws(Error);
      expect(fn).throws(/no such file or directory/i);
      done();
    })
    def.parse(args);
  });

  it('should error on missing alias', function(done) {
    var args = ['--no-color', '@non-existent-alias'];
    var def = program(require(config.pkg), config.name)
    def.program.on('error', function(err) {
      expect(err.code).to.be.gt(0);
      function fn() {
        throw err;
      }
      expect(fn).throws(Error);
      expect(fn).throws(/alias not found/i);
      done();
    })
    def.parse(args);
  });

  it('should error on bad commands (duplicate session)', function(done) {
    var args = ['--no-color', '../error.tmux.conf'];
    var def = program(require(config.pkg), config.name)
    def.program.on('error', function(err) {
      expect(err.code).to.eql(1);
      function fn() {
        throw err;
      }
      expect(fn).throws(Error);
      expect(fn).throws(/command failed/i);
      done();
    })
    def.parse(args);
  });

  it('should error on bad commands w/ run command (duplicate session)',
    function(done) {
      var args = ['run', '--no-color', '../error.tmux.conf'];
      var def = program(require(config.pkg), config.name)
      def.program.on('error', function(err) {
        expect(err.code).to.eql(1);
        function fn() {
          throw err;
        }
        expect(fn).throws(Error);
        expect(fn).throws(/command failed/i);
        done();
      })
      def.parse(args);
    }
  );

  it('should error on pattern match', function(done) {
    var args = ['--no-color', '-p', 'missing'];
    var def = program(require(config.pkg), config.name)
    def.program.on('error', function(err) {
      function fn() {
        throw err;
      }
      expect(fn).throws(Error);
      expect(fn).throws(/no patterns match/i);
      done();
    })
    def.parse(args);
  });

  it('should error on pattern match w/ run command', function(done) {
    var args = ['run', '--no-color', '-p', 'missing'];
    var def = program(require(config.pkg), config.name)
    def.program.on('error', function(err) {
      function fn() {
        throw err;
      }
      expect(fn).throws(Error);
      expect(fn).throws(/no patterns match/i);
      done();
    })
    def.parse(args);
  });

  it('should error on no files found', function(done) {
    var args = ['--no-color', '../empty'];
    var def = program(require(config.pkg), config.name)
    def.program.on('error', function(err) {
      function fn() {
        throw err;
      }
      expect(fn).throws(Error);
      expect(fn).throws(/no files found/i);
      done();
    })
    def.parse(args);
  });

  it('should error on no files found w/ run command', function(done) {
    var args = ['run', '--no-color', '../empty'];
    var def = program(require(config.pkg), config.name)
    def.program.on('error', function(err) {
      function fn() {
        throw err;
      }
      expect(fn).throws(Error);
      expect(fn).throws(/no files found/i);
      done();
    })
    def.parse(args);
  });

  it('should find no files w/ ls command', function(done) {
    var args = ['ls', '-a', '--no-color', '../empty'];
    var def = program(require(config.pkg), config.name)
    def.program.on('error', function(err) {
      function fn() {
        throw err;
      }
      expect(fn).throws(Error);
      expect(fn).throws(/no files found/i);
      done();
    })
    def.parse(args);
  });

  it('should error on bad pattern regexp', function(done) {
    var args = ['run', '--no-color', '-p', '+'];
    var def = program(require(config.pkg), config.name)
    def.program.on('error', function(err) {
      function fn() {
        throw err;
      }
      expect(fn).throws(Error);
      expect(fn).throws(/nothing to repeat/i);
      done();
    })
    def.parse(args);
  });

  it('should error on non-conf file', function(done) {
    var args = [
      '--no-color', '--noop', path.join(process.cwd(), '../alt-file.txt')];
    var def = program(require(config.pkg), config.name)
    def.program.on('error', function(err) {
      function fn() {
        throw err;
      }
      expect(fn).throws(Error);
      expect(fn).throws(/bad file name/i);
      expect(fn).throws(/should end with/i);
      done();
    })
    def.parse(args);
  });

  it('should error on no files found (index file search)', function(done) {
    process.chdir('..');
    var args = ['ls', '--no-color'];
    var def = program(require(config.pkg), config.name)
    def.program.on('error', function(err) {
      process.chdir('conf');
      function fn() {
        throw err;
      }
      expect(fn).throws(Error);
      expect(fn).throws(/no files found/i);
      expect(fn).throws(/try -a/i);
      done();
    })
    def.parse(args);
  });

  it('should error using bad pattern with each', function(done) {
    var args = [
      'run', 'project', '-c', 'project', '--each', '-p', '+'];
    var def = program(require(config.pkg), config.name);
    def.program.on('error', function(err) {
      function fn() {
        throw err;
      }
      expect(fn).throws(Error);
      expect(fn).throws(/nothing to repeat/i);
      done();
    })
    def.parse(args);
  });

  it('should error using unknown pattern with each',
    function(done) {
      var args = [
        'run', '--noop', '-c', 'project', '--each', '-p', 'unknown'];
      var def = program(require(config.pkg), config.name)
      def.program.on('error', function(err) {
        function fn() {
          throw err;
        }
        expect(fn).throws(Error);
        expect(fn).throws(/no patterns match/i);
        done();
      })
      def.parse(args);
    }
  );

  it('should error on add bad alias by reference', function(done) {
    var args = ['alias', '--no-color', '@foo=@missing'];
    var def = program(require(config.pkg), config.name)
      def.program.on('error', function(err) {
        function fn() {
          throw err;
        }
        expect(fn).throws(Error);
        expect(fn).throws(/bad alias reference/i);
        done();
      })
    def.parse(args);
  });

});
