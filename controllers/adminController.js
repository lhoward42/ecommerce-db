const { client_url, jwtSecret } = require("../config/index");
const { UniqueConstraintError } = require("sequelize/lib/errors");
const Express = require("express");
const router = Express.Router();
const { Admin } = require("../models");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const pwdHash = bcrypt.hashSync(password, 13);
  try {
    if (email === "v@vtingz.com"){
  const createAdmin = await Admin.create({
    emailAddress: email,
    passwordHash: pwdHash,
  });
  if (createAdmin.emailAddress === "v@vtingz.com"){
    res.status(201).json({
        message: "Admin successfully registered",
        user: createAdmin
    })
  } else {
    res.status(401).json({
        message: "Login failed",
    })
  }
}
} catch (err) {
    if (err instanceof UniqueConstraintError) {
        res.status(409).json({
            message: "Email already in use",
        }); 
    } else {
        res.status(500).json({
            message: "Failed to register admin",
        });
    }
}
  res.json()
});

module.exports = router;
