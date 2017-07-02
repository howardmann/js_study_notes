let util = module.exports = {};

util.dateTransform = function(param){
  let invalid = typeof param !== 'number';
  if (invalid) return false;

  let date = new Date(param * 1000);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  return `${day}/${month}/${year}`
}