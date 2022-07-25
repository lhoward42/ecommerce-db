const { client_url, jwtSecret } = require("../config/index");
const { UniqueConstraintError } = require("sequelize/lib/errors");
const Express = require("express");
const router = Express.Router();
const { Admin, Token } = require("../models");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

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

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const loginAdmin = await Admin.findOne({
        where: {
          emailAddress: email,
        },
      });
      console.log("loginAdmin ----->", loginAdmin);
      if (
         email === "v@vtingz.com" || 
         email === "jess@nap.com"
        
      ) {
        const passwordComparison = await bcrypt.compare(
          password,
          loginAdmin.passwordHash
        );
        console.log(password, loginAdmin.passwordHash);
          console.log("passwordComparison ----->",passwordComparison);
        if (passwordComparison) {
          const token = jwt.sign({ id: loginAdmin.id }, jwtSecret, {
            expiresIn: 60 * 60 * 24,
          });
          res.status(200).json({
            user: loginAdmin.emailAddress,
            message: "Admin successfully logged in!",
            sessionToken: token,
          });
        }
      } else {
        res.status(401).json({
          message: "Incorrect email or password",
        });
      }
    } catch (err) {
      res.status(500).json({
        message: "Failed to register admin",
      });
    }
    res.json()
  });

  router.post("/reset-request", async (req, res) => {
    const { email } = req.body;
    let message;
    const admin = await Admin.findOne({
        where: {
            emailAddress: email,
        },
    });
    console.log("admin ----->", admin.id);
    if(!admin) {
        console.log("email does not exist");
    }

    let token = await Token.findOne({
        where: {
            AdminId: admin.id,
        },
    });
    if (token) {
        await Token.destroy({
            where: {
                AdminId: admin.id,
            },
        });
    }
    try {
        const resetToken = crypto.randomBytes(32).toString("hex");
        const expireDate = new Date(new Date().getTime() + (60 * 60 * 1000))
        console.log("resetToken ----->>", resetToken);
        const hash = await bcrypt.hashSync(resetToken, 13)
        if (admin) {
            await Token.create({
                token: hash,
                tokenExpires: expireDate,
                AdminId: admin.id
            })
            const link = `${client_url}/passwordReset/${resetToken}/${admin.id}`;
            console.log(link);
        }
        
        
    } catch (err) {

    }

    res.json({ status: "ok"})
  })

module.exports = router;
