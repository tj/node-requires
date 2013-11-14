
var requires = require('..');
var fs = require('fs');

describe('requires(str)', function(){
  it('should return an array of require paths', function(){
    var a = fs.readFileSync('test/fixtures/a.js', 'utf8');
    var ret = requires(a);

    ret[0].should.eql({
      string: "require('./a.js')",
      path: './a.js',
      index: 9
    });

    ret[1].should.eql({
      string: "require('./something/here/whoop')",
      path: './something/here/whoop',
      index: 36
    });

    ret[2].should.eql({
      string: "require(\"something\")",
      path: 'something',
      index: 79
    });
  })
})