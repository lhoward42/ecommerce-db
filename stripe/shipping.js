const { stripe } = require("../config/index");

const createShippingOption = async (req, res) => {
    const { display_name, amount, currency, minItems, maxItems, distance, delivery_estimate  } = req.body;

    let shippingObject;



    try {
        shippingObject = await stripe.shippingRates.create({
            display_name,
            type: 'fixed_amount',
            fixed_amount: { amount, currency },
            metadata: { minItems, maxItems, distance, minMiles, maxMiles },
            // delivery_estimate: { minimum, maximum },
        })
        res.status(200).json({ shippingId: shippingObject.id });
    }
    catch (err) {
        res.status(400).json({ err: "an error occurred, unable to create shipping option", stripe });
    }
}

const getShippingOptions = async (req, res) => {
    let message;
   try {
     let shippingRates = await stripe.shippingRates.list({});
     message = {
        message: "Shipping rates have been retrieved",
        data: shippingRates
     }
     
     
   } catch (err) {
    message = { message: "an error occurred, could not retrieve shipping options", err, stripe };
   }
   res.json(message);
}


module.exports = {
    createShippingOption, 
    getShippingOptions
}