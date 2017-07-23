let chai = require('chai');
let expect = chai.expect;
let sinon = require('sinon');
let db = require('../db');
let Utils = require('../Utils');

describe('#db', () => {
  it('should exist', () => expect(db).to.be.ok);

  describe('.fetchSync', () => {
    let fetchSync = db.fetchSync;
    it('should exist', () => expect(fetchSync).to.be.ok );
    it('should return names when given param names', () => {
      let input = 'names';
      let actual = {
        names: [
          {name: "joe"},
          {name: "jane"},
          {name: "jill"},
          {name: "jack"}
        ]
      };
      expect(fetchSync(input)).to.eql(actual);
    });
    it('should return colors when given param colors', () => {
      let input = 'colors';
      let actual = {
        colors: [
          {color: "red"},
          {color: "blue"},
          {color: "purple"},
          {color: "black"}
        ]
      };
      expect(fetchSync(input)).to.eql(actual);
    });
    it('should throw error if filename does not exist', () => {
      let input = 'banana';
      let err = 'File does not exist bro';
      expect(() => fetchSync(input)).to.throw(err);
    })

    it('should throw error if given falsey values', () => {
      let input = [undefined, null, false, ''];
      let err = 'Invalid param';
      input.forEach(el => {
        expect(() => fetchSync(el)).to.throw(err);
      })
    })
  });

  describe('.fetchAsync', () => {
    let fetchAsync = db.fetchAsync;

    it('should exist', () => expect(fetchAsync).to.be.ok );
    it('should be a promise', () => {
      let input = 'colors.json';
      expect(fetchAsync(input)).to.be.a('promise');
    });

    it('should fetch data aysnc', (done) => {
      let input = 'colors.json';
      let actual = {
        colors: [
          {color: "red"},
          {color: "blue"},
          {color: "purple"},
          {color: "black"}
        ]
      };
      
      fetchAsync(input).then(data => {
        let json = JSON.parse(data);
        expect(json).to.eql(actual);
        done();
      })
    });
  });

  describe('fetch and capitalize', () => {
    let fetchAsync = db.fetchAsync;
    let capitalize = Utils.capitalize;
    it('should fetch and transform data', (done) => {
      let input = 'colors.json';
      let actual = {
        colors: [
          {color: "Red"},
          {color: "Blue"},
          {color: "Purple"},
          {color: "Black"}
        ]
      };

      fetchAsync(input, 'utf-8').then(data => {
        let payload = JSON.parse(data);
        let transformed = Object.assign({}, payload);
        transformed.colors.forEach(el => el.color = capitalize(el.color))
        expect(transformed).to.eql(actual);
        done();
      })
    });
  });

  describe('.fetchGithub', () => {
    let fetchGithub = db.fetchGithub;
    it('should exist', ()=> expect(fetchGithub).to.be.ok);

    // Doing the test by actually hitting the API
    // it('should return data when testing with axios', (done) => {
    //   let axios = require('axios');
    //   let actual = 'Sydney'
    //   fetchGithub('howardmann').then(data => {
    //     let input = data.data.location;
    //     expect(input).to.equal(actual);
    //     done();
    //   })
    // });

    // Doing the test again but with our own authored stub
    it('should return data when testing with stub', (done) => {
      let fakeData = {
        data: {
          login: "howardmann",
          id: 17248926,
          avatar_url: "https://avatars0.githubusercontent.com/u/17248926?v=4",
          gravatar_id: "",
          url: "https://api.github.com/users/howardmann",
          html_url: "https://github.com/howardmann",
          location: "Sydney"
        }
      };
      let actual = 'Sydney'

      // Write our own stub. We require the object we are stubbing and save the original method so we can restore
      let axios = require('axios');
      let original = axios.get;
      
      // Now we replace the method with our own Promise which resolves to our fakeData
      axios.get = function(url){
        return Promise.resolve(fakeData)
      }
      
      fetchGithub('howardmann').then(data => {
        let input = data.data.location;
        expect(input).to.equal(actual);
        // When complete we restore the stub, so other tests can use it (this is best practice)
        axios.get = original
        done();
      })
    });

    // Once again same thing but this time using 3rd party library sinon
    it('should return data when testing with stub', (done) => {
      let fakeData = {
        data: {
          login: "howardmann",
          id: 17248926,
          avatar_url: "https://avatars0.githubusercontent.com/u/17248926?v=4",
          gravatar_id: "",
          url: "https://api.github.com/users/howardmann",
          html_url: "https://github.com/howardmann",
          location: "Sydney"
        }
      };
      let actual = 'Sydney'
      
      // Sinon stub axios
      let axios = require('axios');
      let stub = sinon.stub(axios, 'get').returns(Promise.resolve(fakeData));
      
      fetchGithub('howardmann').then(data => {
        let input = data.data.location;
        expect(input).to.equal(actual);
        // restore stub
        stub.restore();
        done();
      })
    });
    

  })
  
})