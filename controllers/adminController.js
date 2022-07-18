const Express = require("express");
const router = Express.Router();

router.get('/register', (req, res) => {
    res.send('Hey this is the register route!')
});

module.exports = router;