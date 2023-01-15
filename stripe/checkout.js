const { stripe } = require("../config/index");

async function createCheckoutSession (req, res) {
    const domainURL = process.env.WEB_APP_URL;
    const { line_items, customer_email, shipping_rate, shipping_amount } = req.body;
    let message;
    console.log("req.body", req.body)
    console.log(line_items, customer_email, shipping_rate, shipping_amount)
    if(!line_items || !customer_email ) {
        return res.status(400).json({ error: 'missing require session parameters' });
    }

    

    try {
        // let session = await stripe.checkout.sessions.create({
        //     payment_method_types: ['card'],
        //     mode: 'payment',
        //     line_items,
        //     customer_email,
        //     success_url: `${domainURL}/success?session_id={CHECKOUT_SESSION_ID}`,
        //     cancel_url: `${domainURL}/canceled`,
        //     // shipping_address_collection: { allowed_countries: ['GB', 'US'] },
        //     // shipping_options: [{ shipping_rate }],
           
        //   }); 
        //   console.log("session id",session.url)
        //   console.log("session id", session.id)
        //   message = {
        //     message: "success",
        //     data: session.id 
        //   }
          // res.redirect(303, session.url)
          res.status(200).json()
        } catch (error) {
          console.log(error, stripe);message = {
            message: err,
          }
          res.status(400).json({ error: 'an error occurred, unable to create session', stripe });
        }
      res.json()
}

module.exports = createCheckoutSession;