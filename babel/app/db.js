const db = module.exports = {};

db.query = (id) => {
  return new Promise((resolve, reject) => {    
    if (id === undefined) {
      reject('Invalid id');
    }
    resolve({
      user: `user_${id}`,
      status: 'ok'
    })
  });
}