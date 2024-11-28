const express = require("express");
const axios = require("axios");
const router = express.Router();
const apiKey = process.env.API_KEY;

router.get("/comic/:comicId", async (req, res) => {
  const comic = req.params.comicId;
  try {
    const comicbyId = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${comic}?apiKey=${apiKey}`
    );
    // console.log(comicbyId.data);
    res.status(200).json(comicbyId.data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
