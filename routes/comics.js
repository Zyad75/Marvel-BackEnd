const express = require("express");
const axios = require("axios");
const router = express.Router();
const apiKey = process.env.API_KEY;
router.get("/comics", async (req, res) => {
  try {
    const comics = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apiKey}`
    );

    // console.log(comics.data);

    res.status(200).json(comics.data);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
