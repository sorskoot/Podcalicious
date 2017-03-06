const { describe, it } = require('mocha');
const { expect } = require('chai');
const templater = require('../../src/js/templater');

describe('templater', function () {
  var testobj = {
    a: "hallo",
    b: {
      c: "deep"
    }
  };
  
  var testhtmlA = "{{a}}";
  var testhtmlB = "{{b.c}}";
  var testhtmlC = "{{c}}";
  
  
  var resultA = templater(testhtmlA, testobj);
  var resultB = templater(testhtmlB, testobj);
  var resultC = templater(testhtmlC, testobj);

  it('should replace {{a}} with "hello"', () => {
    expect(resultA).to.equal('hallo');
  })
  it('should replace {{b.c}} with "deep"', () => {
    expect(resultB).to.equal('deep');
  })
   it('should not replace {{c}}', () => {
    expect(resultC).to.equal('{{c}}');
  })
});