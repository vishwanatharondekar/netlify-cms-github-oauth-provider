const simpleOauthModule = require("simple-oauth2");
const authMiddleWareInit = require("./auth.js");
const callbackMiddleWareInit = require("./callback");
const oauthProvider = process.env.OAUTH_PROVIDER || "github";
const loginAuthTarget = process.env.AUTH_TARGET || "_self";

const oauth2 = simpleOauthModule.create({
  client: {
    // id: "Iv1.0e7a99f48e44e0c2", //process.env.OAUTH_CLIENT_ID,
    // secret: "68362506b7ef09a4ea9a99f15e8fc474010abc1a" //process.env.OAUTH_CLIENT_SECRET
    id: "4f3bdee72718f183ce6c",
    secret: "6916745ef44906f67b43af359d29c4381111e804"
  },
  auth: {
    // Supply GIT_HOSTNAME for enterprise github installs.
    tokenHost: process.env.GIT_HOSTNAME || "https://github.com",
    tokenPath: process.env.OAUTH_TOKEN_PATH || "/login/oauth/access_token",
    authorizePath: process.env.OAUTH_AUTHORIZE_PATH || "/login/oauth/authorize"
  }
});

function indexMiddleWare(req, res) {
  res.send(`Hello<br>
    <a href="/auth" target="${loginAuthTarget}">
      Log in with ${oauthProvider.toUpperCase()}
    </a>`);
}

module.exports = {
  auth: authMiddleWareInit(oauth2),
  callback: callbackMiddleWareInit(oauth2, oauthProvider),
  success: (req, res) => {
    res.send("");
  },
  index: indexMiddleWare
};
