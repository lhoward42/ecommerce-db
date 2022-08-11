const { stripe } = require("../config/index");

async function createCheckoutSession (req, res) {
    const domainURL = process.env.WEB_APP_URL;
    const { line_items, customer_email, shipping_rate, city, state, postal_code, line_1, shipping_recipient  } = req.body;

    if(!line_items || !customer_email ) {
        return res.status(400).json({ error: 'missing require session parameters' });
    }

    let session;

    try {
        session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items,
            customer_email,
            success_url: `${domainURL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${domainURL}/canceled`,
            shipping_address_collection: { allowed_countries: ['GB', 'US'] },
            shipping_cost: [{ shipping_rate }],
           
          }); 
          res.status(200).json({ sessionId: session.id, });
        } catch (error) {
          console.log(error, stripe);
          res.status(400).json({ error: 'an error occurred, unable to create session', stripe });
        }
}

module.exports = createCheckoutSession;