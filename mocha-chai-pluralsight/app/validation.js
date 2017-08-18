let validation = module.exports = {};

validation.checkEmail = function(email) {
  if (email && email.length > 3 && email.indexOf("@") > -1){
    return true;
  } else {
    throw new Error('Invalid email');
  }
}

validation.checkWeight = function(weight) {
  let valid = weight && weight <= 100
  if (!valid) { throw new Error('Invalid weight')}
  return true;
}

validation.checkFirst = function(first) {
  if (first && (typeof first === 'string')) {
    return true;
  } else {
    throw new Error('First name needed');
  }  
}

validation.checkLast = function(last) {
  if (last && (typeof last === 'string')) {
    return true;
  } else {
    throw new Error('Last name needed');
  }  
}

validation.checkAll = function(opts) {
  return  validation.checkEmail(opts.email) && 
          validation.checkWeight(opts.weight) && 
          validation.checkFirst(opts.first) &&
          validation.checkFirst(opts.last)
}