const validateToken = require("../middleware/validate-jwt");
const { UniqueConstraintError } = require("sequelize/lib/errors");
const router = require("express").Router();

router.post("/create", validateToken, async (req, res) => {
    let message; 
    const { price } = req.body;
    try {
        let u = await Admin.findOne({ where: { id: req.user.id }});
        if (u) {
            let newProduct = await u.createProduct({
                price
            });
            await u.addProduct(newProduct);
            
            message = { 
                message: "Product successfully created",
                data: newProduct,
            };
        }
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            message = {
                message: "Product creation failed, expected unique product name",
            };
        } else {
            message = {
                message: "Product creation failed"
            }
        }
    }
    res.json(message);
})

module.exports = router;