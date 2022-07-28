const { stripe } = require("../config/index");

const createShippingOption = async (req, res) => {
    const { display_name, amount, currency } = req.body;

    let shippingObject;



    try {
        shippingObject = await stripe.shippingRates.create({
            display_name,
            type: 'fixed_amount',
            fixed_amount: { amount, currency },
            // delivery_estimate: { minimum, maximum },
        })
        res.status(200).json({ shippingId: shippingObject.id });
    }
    catch (err) {
        res.status(400).json({ err: "an error occurred, unable to create shipping option", stripe });
    }
}

const getShippingOptions = async (req, res) => {

}

module.exports = {
    createShippingOption, 

}