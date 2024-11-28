const express = require("express");
const axios = require("axios");
const router = express.Router();
const apiKey = process.env.API_KEY;

router.get("/character/:characterId", async (req, res) => {
  try {
    const characters = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${apiKey}`
    );
    //console.log(characters.data);
    //console.log(req.params.characterId);
    const idOfcharacterToFound = req.params.characterId;
    const character = characters.data.results;

    let result;

    for (let i = 0; i < character.length; i++) {
      if (character[i]._id === idOfcharacterToFound) {
        result = character[i];
      }
    }

    res.status(200).json(result);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
