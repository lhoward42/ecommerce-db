const dotenv = require("dotenv");
const Handlebars = require("handlebars");
require("dotenv").config();
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const { sender, pass, host } = require("../config/index");

const sendMail = async (email, subject, payload, template) => {
  console.log("user ----->", sender);
  try {
    const transport = nodemailer.createTransport({
      host: host,
      port: 465,
      secure: true,
      auth: {
        user: sender,
        pass: pass,
      },
    });
    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    console.log("source ---->", source);
    var compiledTemplate = Handlebars.compile(source);
    console.log(
      compiledTemplate({ name: "NewUser", link: "www.something.com" })
    );
    const options = () => {
      return {
        from: sender,
        to: email,
        subject: subject,
        text: compiledTemplate(payload),
        html: compiledTemplate(payload),
      };
    };
    transport.sendMail(options(), (error, info) => {
      if (error) {
        console.log(error);
        return error;
      } else {
        console.log("message sent");
        return res.status(200).json({
          success: true,
        });
      }
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = { sendMail };
