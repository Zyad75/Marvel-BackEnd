const express = require("express");
const axios = require("axios");
const router = express.Router();
const apiKey = process.env.API_KEY;
router.get("/characters", async (req, res) => {
  let filters = "";
  if (req.query.skip) {
    filters += `&skip=${req.query.skip}`;
  }
  if (req.query.limit) {
    filters += `&limit=${req.query.limit}`;
  }
  if (req.query.name) {
    filters += `&name=${req.query.name}`;
  }
  try {
    const characters = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${apiKey}${filters}`
    );

    // console.log(characters.data);

    res.status(200).json(characters.data);
  } catch (error) {
    console.log(error.message);
  }
});
module.exports = router;
