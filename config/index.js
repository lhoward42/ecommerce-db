require("dotenv").config();

const config = {
  appPort: parseInt(process.env.PORT),
  dbName: process.env.DB_NAME,
  dbURL:
    process.env.NODE_ENV === "production"
      ? `${process.env.DATABASE_URL}?sslmode=no-verify`
      : `postgres://${process.env.DB_USER}:${process.env.DB_PWD}@${
          process.env.DB_HOST
        }:${parseInt(process.env.DB_PORT)}/${process.env.DB_NAME}`,
  stripe: require("stripe")(`${process.env.SECRET_KEY}`),
  jwtSecret: process.env.JWT_KEY,
  client_url: process.env.CLIENT_URL,
  webhook_secret: process.env.WEB_HOOK_SECRET,
  sender: process.env.SENDER,
  host: process.env.EMAIL_HOST,
  pass: process.env.PASSWORD,
  admin_email: process.env.ALLOWED_EMAIL,
  dev_email: process.env.OTHER_ALLOWED_EMAIL,
};

module.exports = config;
