const { describe, it } = require('mocha');
const { expect } = require('chai');
const templater = require('../../src/js/templater');

describe('templater', function () {
  var testobj = {
    a: "hallo",
    b: {
      c: "deep"
    },
    d:["array"]
  };
  
  var testhtmlA = "{{a}}";
  var testhtmlB = "{{b.c}}";
  var testhtmlC = "{{c}}";
  var testhtmlD = "{{d.0}}";
  
  var resultA = templater(testhtmlA, testobj);
  var resultB = templater(testhtmlB, testobj);
  var resultC = templater(testhtmlC, testobj);
  var resultD = templater(testhtmlD, testobj);

  it('should replace {{a}} with "hello"', () => {
    expect(resultA).to.equal('hallo');
  })
  it('should replace {{b.c}} with "deep"', () => {
    expect(resultB).to.equal('deep');
  })
   it('should not replace {{c}}', () => {
    expect(resultC).to.equal('{{c}}');
  })
  it('should replace {{d.0}} with "array"', () => {
    expect(resultD).to.equal('array');
  })
});
