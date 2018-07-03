

const mwAuth = (req, res, next) => {
  console.log("Hey, im going to authenticate")
  var token = (req.body && req.body.authorization) || (req.query && req.query.authorization) || req.headers.authorization
  if (token) {
    res.send({result: "ok"})
  } else {
    console.log("There is no token inside! reject!")
    res.send({result: "error"})
  }
}
module.exports = mwAuth