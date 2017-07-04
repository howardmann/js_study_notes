import chai from 'chai';
import {expect} from 'chai';
import util from '../app/util.js';

describe('#util', function(){

  it('should exist', function(){
    expect(util).to.be.ok;
  });

  describe('.sayName', ()=>{
    it('should exist', () => expect(util.sayName).to.be.ok);
    it('should return the name', function(){
      let input = 'Howie';
      let actual = 'Hi my name is Howie';
      expect(util.sayName(input)).to.equal(actual);
    })
  })

  describe('.rateSong', () => {
    it('should exist', () => expect(util.rateSong).to.be.ok);
    it('should return an object with title', () =>{
      let input = 'Felix';
      let actual = {
        title: 'Felix',
        verdict: 'awesome'
      }
      expect(util.rateSong(input)).to.eql(actual);
    })

    it('should return default song if no param is given', ()=>{
      let actual = {
        title: 'michael jackson',
        verdict: 'awesome'
      }
      expect(util.rateSong()).to.eql(actual);
    })
  })

})