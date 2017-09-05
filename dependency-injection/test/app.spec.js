let chai = require('chai')
let expect = chai.expect

let app = require('../app.js')
let fakeData = require('./fakeData.json');

describe('App', function(){
  it('should exist', () => expect(app).to.not.be.undefined);
  describe('.makeFetch', () => {
    it('should exist', () => expect(app.makeFetch).to.not.be.undefined);
    describe('fetch', () => {
      let axios = {
        get(){
          return Promise.resolve(fakeData)
        }
      }
      let fetch = app.makeFetch(axios)
      it('should return a function', () => expect(fetch).to.be.a('function'))
      it('should return data after fetching', (done) => {
        let input =  'http://fakeapi.com/fruit'
        let actual = {
          data: [
            {id: "1", fruit: "banana", color: "yellow"},
            {id: "2", fruit: "apple", color: "red"},
            {id: "3", fruit: "pear", color: "green"},
            {id: "4", fruit: "orange", color: "salmon"},
            {id: "5", fruit: "chocolate", color: "brown"}
          ]
        }
        fetch(input).then(data => {
          expect(data).to.eql(actual)
          done()
        })
      })
    })
  })
  describe('.parseFruit', () => {
    it('should exist', () => expect(app.parseFruit).to.not.be.undefined);
    it('should transform a fruit object', () => {
      let fruit = {
        id: 1,
        fruit: 'banana',
        color: 'yellow'
      }
      let input = app.parseFruit(fruit)
      let actual = {
        fruit: 'banana with color of yellow'
      }
      expect(input).to.eql(actual)
    })
  })
})
