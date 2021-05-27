const randomstring = require("randomstring");

module.exports = oauth2 => {
  // Authorization uri definition
  const authorizationUri = oauth2.authorizationCode.authorizeURL({
    redirect_uri: "http://localhost:3000/callback",
    scope: process.env.SCOPES || "repo,user",
    state: randomstring.generate(32)
  });

  return (req, res, next) => {
    res.redirect(authorizationUri);
  };
};
