const express = require("express");
const axios = require("axios");
const router = express.Router();
const apiKey = process.env.API_KEY;
router.get("/comics/:characterId", async (req, res) => {
  try {
    const character = req.params.characterId;
    const comicsofCharacter = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${character}?apiKey=${apiKey}`
    );
    // console.log(comicsofCharacter.data);
    res.status(200).json(comicsofCharacter.data.comics);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
