

const mwAuth = (req, res, next) => {
  console.log("Hey, im going to authenticate")
  next()
}

module.exports = mwAuth