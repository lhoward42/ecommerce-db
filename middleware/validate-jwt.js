const jwt = require("jsonwebtoken");
const { Admin } = require("../models");
const { jwtSecret } = require("../config");

const validateToken = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  } else {
    try {
      if (
        req.headers.authorization &&
        req.headers.authorization.includes("Bearer")
      ) {
        const { authorization } = req.headers;

        const payload = authorization
          ? jwt.verify(
              authorization.includes("Bearer")
                ? authorization.split(" ")[1]
                : authorization,
              jwtSecret
            )
          : undefined;

        if (payload) {
          let foundAdmin = await Admin.findOne({ where: { id: payload.id } });

          if (foundAdmin) {
            req.user = foundAdmin;
            next();
          } else {
            res.status(400).send({ message: "Not Authorized" });
          }
        } else {
          res.status(401).send({ message: "Invalid token" });
        }
      } else {
        res.status(403).send({ message: "Forbidden" });
      }
    } catch (err) {
      res.status(500).send({ message: "validate failed" });
    }
  }
};

module.exports = validateToken;
