let starting = module.exports = {};

let db;

starting.setup = (secret) => {
  db = secret;
}

starting.getSecretQuestion = () => {
  return db.question;
}

starting.answerSecret = (secret) => {
  if (db.answer === secret) {
    return true
  } else {
    return false
  }
}