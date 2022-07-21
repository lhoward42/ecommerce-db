const { client_url, jwtSecret } = require("../config/index");
const Express = require("express");
const router = Express.Router();
const { Admin } = require("../models");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const pwdHash = bcrypt.hashSync(password, 13);
  await Admin.create({
    emailAddress: email,
    passwordHash: pwdHash,
  });
  res.json()
});

module.exports = router;
