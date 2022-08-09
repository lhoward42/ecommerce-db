const { UniqueConstraintError } = require("sequelize/lib/errors");
const router = require("express").Router();
const { Email, Product } = require("../models");

router.post("/sign-up", async (req, res) => {
   
    const { email, name } = req.body;
    try {
        const newHeartBeat = await Email.create({
            emailAddress: email,
            name,
        })

        res.status(201).json({
        message: "Email successfully added",
        data: newHeartBeat
        })

    } catch (err) {
        if (err instanceof UniqueConstraintError) {
           res.status(409).json({
            message: "email already in use"
           })
        } else {           
            res.status(500).json({
                 message: "Email could not be added"
            });     
        }
    };

});

router.delete("/:id/:name", async (req, res) => {
    const { id, name } = req.params;
    try {
        const response = await Email.destroy({
            where: {
                id,
                name
            }
        });
        res.status(201).json({
            message: "Heart Beat has been deleted"
        })
    } catch (err) {
        res.status(500).json({
            message: "Heart Beat could not be deleted", err
        })
    }

})

router.get("/all", async(req, res) => {
    try {
        const currentEmailList = await Email.findAll();
        res.send(currentEmailList);
    } catch (err) {
        res.status(500).json({
            message: "Could not get email list"
        });
    }
})

module.exports = router;
