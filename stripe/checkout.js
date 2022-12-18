const { stripe } = require("../config/index");

async function createCheckoutSession (req, res) {
    const domainURL = process.env.WEB_APP_URL;
    const { line_items, customer_email } = req.body;
    let message;
    console.log(line_items, customer_email)
    if(!line_items || !customer_email ) {
        return res.status(400).json({ error: 'missing require session parameters' });
    }

    

    try {
        let session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items,
            customer_email,
            success_url: `${domainURL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${domainURL}/canceled`,
            // shipping_address_collection: { allowed_countries: ['GB', 'US'] },
            // shipping_cost: [{ shipping_rate }],
           
          }); 
          console.log("session id",session.url)
          res.redirect(303, session.url);
          // res.status(200).json({ sessionId: session.id, });
          
          // res.send.json({sessionId: session.id})
          // return { sessionId: session.id }
        } catch (error) {
          console.log(error, stripe);
          res.status(400).json({ error: 'an error occurred, unable to create session', stripe });
        }
        res.json()
}

module.exports = createCheckoutSession;