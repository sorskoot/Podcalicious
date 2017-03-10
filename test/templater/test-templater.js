const { describe, it } = require('mocha');
const { expect } = require('chai');
const templater = require('../../src/js/templater');

describe('templater', function () {
  var testobj = {
    a: "hallo",
    b: {
      c: "deep"
    },
    d:["array"],
    "itunes:image":"image",
    e:{
      $:{
        u:"something"
      }
    }
  };
  
  var testhtmlA = "{{a}}";
  var testhtmlB = "{{b.c}}";
  var testhtmlC = "{{c}}";
  var testhtmlD = "{{d.0}}";
  var testhtmlE = "{{itunes:image}}";
  var testhtmlF = "{{e.$.u}}";
  
  var resultA = templater(testhtmlA, testobj);
  var resultB = templater(testhtmlB, testobj);
  var resultC = templater(testhtmlC, testobj);
  var resultD = templater(testhtmlD, testobj);
  var resultE = templater(testhtmlE, testobj);
  var resultF = templater(testhtmlF, testobj);

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
  it('should replace {{itunes:image}} with "image"', () => {
    expect(resultE).to.equal('image');
  })
   it('should replace {{e.$.u}} with "something"', () => {
    expect(resultF).to.equal('something');
  })
});

