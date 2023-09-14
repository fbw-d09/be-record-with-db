require("dotenv").config();
const jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {
  try {
    //das token wird im request des Nutzers im cookie mitgesendet
    let token = req.cookies.access_token;
    // wir lesen das tocken aus dem cookie aus
    const verifiedUser = jwt.verify(token, process.env.SECRET_TOKEN);
    console.log("verifiedUser", verifiedUser);
    // wir holen uns die ID aus dem token (cookie) und erweitern das request object um einen weiteren key - value 
    // der ID des eingeloggten Nutzers
    req.tokenUser = verifiedUser.userId;
    // im request objekt ist nun zusätzlich die ID des eingeloggten Nutzers gespeichert worden und wir rufen mit next 
    //die nächste Funktion (unseren controller) auf
    next();

  } catch (e) {
    res.status(401).json({
      success: false,
      message: "You are not logged in!",
    });
  }
};

module.exports = userAuth;
