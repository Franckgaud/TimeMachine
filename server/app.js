// server/app.js
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const db = require("./knex.js");
const bodyParser = require("body-parser");
const app = express();
const stripe = require("stripe")(
  "sk_test_51HyU7jEDGoksVgQazoYuaLO13uTFVikaAG6GebNDwmzTlOoOu4Cb6HPQxpZNyA3R7hLWSJU6OHPFtVPKsrAd90ix00rOfEPzrv"
);
//CORS trial
const cors = require("cors");
app.use(cors({ origin: true, credentials: true }));

//body-parser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// Setup logger
// app.use(
//   morgan(
//     ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
//   )
// );

// Serve static assets
app.use(express.static(path.resolve(__dirname, "..", "build")));

// Middleware to try and solve CORS error on cloud app
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});

// GET all information
app.get("/item/", async (req, res, next) => {
  try {
    const itemLists = await db.select().table("item_lists");
    console.log("allMemo!");
    res.json(itemLists);
  } catch (err) {
    console.error("Error loading lists!", err);
    res.sendStatus(500);
  }
});

//Post new memo
app.post("/item/", async (req, res) => {
  try {
    const postData = req.body;
    console.log("POSTメソッド");
    console.log("req.body", req.body);
    await db
      .into("item_lists")
      .returning([
        "buyer_address",
        "buyer_family_name",
        "buyer_name",
        "buyer_phone",
        "buyer_postal_code",
        "game_condition",
        "game_console",
        "game_price",
        "game_publisher",
        "game_title",
        "image_URL",
        "movie_URL",
        "seller_address",
        "seller_family_name",
        "seller_name",
        "seller_phone",
        "seller_postal_code",
      ])
      .insert(postData);
    const itemLists = await db.select().table("item_lists");
    console.log("app内のpostの挙動", itemLists);
    //INSERT INTO tableName (column1, column2) VALUE (value1, value2)
    res.send(itemLists);
  } catch (err) {
    console.error("Error loading post!", err);
    res.sendStatus(500);
  }
});

//Delete memo of id
app.delete("/:id", async (req, res) => {
  try {
    await db("item_lists").where({ id: req.params.id }).delete();
    const itemLists = await db.select().table("item_lists");
    res.send(itemLists);
  } catch (err) {
    console.error("Error deleting post!", err);
    res.sendStatus(500);
  }
});

//Put memo of id
app.patch("/:id", async (req, res) => {
  try {
    const postData = req.body;
    console.log("patchのメソッドをチェック中", postData[0].title);
    await db("item_lists")
      .where({ id: req.params.id })
      .update(postData[0])
      .returning("*");
    const itemLists = await db.select().table("item_lists");
    res.send(itemLists);
  } catch (err) {
    console.error("Error deleting post!", err);
    res.sendStatus(500);
  }
});

//Put all order info
app.put("/:id", async (req, res) => {
  try {
    const postData = req.body;
    console.log("putのメソッドをチェック中", postData[0].title);
    await db("item_lists")
      .where({ id: req.params.id })
      .update({ buyer_address: postData[0].buyer_address });
    await db("item_lists")
      .where({ id: req.params.id })
      .update({ buyer_family_name: postData[0].buyer_family_name });
    await db("item_lists")
      .where({ id: req.params.id })
      .update({ buyer_name: postData[0].buyer_name });
    await db("item_lists")
      .where({ id: req.params.id })
      .update({ buyer_phone: postData[0].buyer_phone });
    await db("item_lists")
      .where({ id: req.params.id })
      .update({ buyer_postal_code: postData[0].buyer_postal_code });
    await db("item_lists")
      .where({ id: req.params.id })
      .update({ game_condition: postData[0].game_condition });
    await db("item_lists")
      .where({ id: req.params.id })
      .update({ game_console: postData[0].game_console });
    await db("item_lists")
      .where({ id: req.params.id })
      .update({ game_price: postData[0].game_price });
    await db("item_lists")
      .where({ id: req.params.id })
      .update({ game_publisher: postData[0].game_publisher });
    await db("item_lists")
      .where({ id: req.params.id })
      .update({ game_title: postData[0].game_title });
    await db("item_lists")
      .where({ id: req.params.id })
      .update({ image_URL: postData[0].image_URL });
    await db("item_lists")
      .where({ id: req.params.id })
      .update({ movie_URL: postData[0].movie_URL });
    await db("item_lists")
      .where({ id: req.params.id })
      .update({ seller_address: postData[0].seller_address });
    await db("item_lists")
      .where({ id: req.params.id })
      .update({ seller_family_name: postData[0].seller_family_name });
    await db("item_lists")
      .where({ id: req.params.id })
      .update({ seller_name: postData[0].seller_name });
    await db("item_lists")
      .where({ id: req.params.id })
      .update({ seller_phone: postData[0].seller_phone });
    await db("item_lists")
      .where({ id: req.params.id })
      .update({ seller_postal_code: postData[0].seller_postal_code });

    const itemLists = await db.select().table("item_lists");
    res.send(itemLists);
  } catch (err) {
    console.error("Error deleting post!", err);
    res.sendStatus(500);
  }
});

// Always return the main index.html, so react-router render the route in the client
app.get("*", (req, res, next) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
});

// Create User Account
app.post("/api/createuser", async (req, res) => {
  const account = await stripe.accounts.create({
    country: "JP",
    type: "express",
    capabilities: {
      card_payments: {
        requested: true,
      },
      transfers: {
        requested: true,
      },
    },
  });

  // HERE WE CAN PUSH account.id to our database seller table

  const accountLinks = await stripe.accountLinks.create({
    account: account.id,
    refresh_url: "http://localhost.com/3000",
    return_url: "http://localhost.com/3000",
    type: "account_onboarding",
  });

  return res.send(accountLinks.url);
});
// create a checkout sessions to sell a product
app.post("/api/checkout", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "jpy",
          product_data: {
            name: req.body.name,
            images: [`${req.body.img}`],
          },
          unit_amount: req.body.price,
        },
        quantity: 1,
      },
    ],
    payment_intent_data: {
      application_fee_amount: 123,
      transfer_data: {
        destination: req.body.seller_id,
      },
    },
    mode: "payment",
    success_url: `http://www.google.com`,
    cancel_url: `http://www.youtube.com`,
  });
  return res.send(session);
});

module.exports = app;
