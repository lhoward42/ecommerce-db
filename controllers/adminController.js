const { client_url, jwtSecret } = require("../config/index");
const { UniqueConstraintError } = require("sequelize/lib/errors");
const Express = require("express");
const router = Express.Router();
const jwt = require("jsonwebtoken")
const { Admin, Token } = require("../models");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { sendMail } = require("../utils/sendMail");
const e = require("express");

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const pwdHash = bcrypt.hashSync(password, 13);
  try {
    if (
      email === "v@vtingz.com" || 
      email === "webdevlaurice@gmail.com"
    ){
      
  const createAdmin = await Admin.create({
    emailAddress: email,
    passwordHash: pwdHash,
  });
  if (
    createAdmin.emailAddress === "v@vtingz.com" || 
    createAdmin.emailAddress === "webdevlaurice@gmail.com"
  ){
    
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
         email === "webdevlaurice@gmail.com"
        
      ) {
        const passwordComparison = await bcrypt.compare(
          password,
          loginAdmin.passwordHash
        );
        
        if (passwordComparison) {
          console.log("----loginAdmin", loginAdmin, "--------");
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
        message: "Failed to login admin",
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
            sendMail(
              admin.emailAddress,
              "Password Reset Request",
              {
                name: admin.emailAddress,
                link: link,
              },
              "./template/requestResetPassword.handlebars"
            );
            message = { message: "success", resetToken};
            res.json(message);
            return link;
            
        }
    
    } catch (err) {
      return res.json({ status: "ok" })
    }
  });

  //Reset Password
  router.put('/password-reset', async (req, res) => {
    await Token.destroy({
      where: {
        tokenExpires: { [Op.lt]: new Date() },
      }
    });
    const { password, id, token } = req.body;
    let message; 

    //checks to see if a token exist for the admin requesting reset
    const passwordResetToken = await Token.findOne({
      where: {
        AdminId: id,
        tokenExpires: { [Op.gt]: new Date() },
      }
    })
    if (!passwordResetToken) {
      console.log("Invalid password or expired reset token");
      return false
    }
    const query = {
      where: {
        id,
      },
      returning: true,
    };

    //compare token from link with encrypt token in the database
    const isValid = await bcrypt.compare(token, passwordResetToken.token);

    if(!isValid) return ("Invalid or expired password");
    
    try {
    const hash = await bcrypt.hash(password, 13);
    const data = {
      passwordHash: hash,
    }
    //updates new password
    const updatePassword = await Admin.update(data, query);
    message = {
      message: "Password updated",
      data: updatePassword,
    }
    
    //destroys the token
    await Token.destroy({
      where: {
        AdminId: id,
      },
    });

   } catch (err) {
    message = {
      message: "ok",
      data: null,
    }
   }
   res.json(message);
  })


module.exports = router;
