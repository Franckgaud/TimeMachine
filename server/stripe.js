// const app = require("./app");

// const stripe = require("stripe")(
//   "sk_test_51HyU7jEDGoksVgQazoYuaLO13uTFVikaAG6GebNDwmzTlOoOu4Cb6HPQxpZNyA3R7hLWSJU6OHPFtVPKsrAd90ix00rOfEPzrv"
// );
// // Create User Account
// app.post("/api/createuser", async (req, res) => {
//   console.log(app);

//   const account = await stripe.accounts.create({
//     country: "JP",
//     type: "express",
//     capabilities: {
//       card_payments: {
//         requested: true,
//       },
//       transfers: {
//         requested: true,
//       },
//     },
//   });
//   const accountLinks = await stripe.accountLinks.create({
//     account: account.id,
//     refresh_url: "http://localhost.com/3000",
//     return_url: "http://localhost.com/3000",
//     type: "account_onboarding",
//   });

//   console.log(accountLinks);
//   return res.send(accountLinks.url);
// });

// app.post("/api/checkout", async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     line_items: [
//       {
//         price_data: {
//           currency: "jpy",
//           product_data: {
//             name: "Stubborn Attachments",
//             images: ["https://i.imgur.com/EHyR2nP.png"],
//           },
//           unit_amount: 4000,
//         },
//         quantity: 1,
//       },
//     ],
//     payment_intent_data: {
//       application_fee_amount: 123,
//       transfer_data: {
//         destination: "acct_1HyYrR2ZGCgpwXOE",
//       },
//     },
//     mode: "payment",
//     success_url: `${YOUR_DOMAIN}/success.html`,
//     cancel_url: `${YOUR_DOMAIN}/cancel.html`,
//   });
// });
