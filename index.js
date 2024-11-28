require("dotenv").config();
const express = require("express"); //premet de créer le serveur et les routes
const cors = require("cors"); // permet d'interroger les routes depuis n'importe ou
const app = express();
const axios = require("axios"); // axios va permettre de faire des requetes à l'api marvel afin de recuperer la data
// et ensuite de pouvoir envoyer cette data en response vers le front
app.use(cors());
app.use(express.json()); // pour lire les paramettre body
const apiKey = process.env.API_KEY;
//-------------------------------//
//import des routes//
const charactersRouter = require("./routes/characters");
const comicsRouter = require("./routes/comics");
const characterByIdRouter = require("./routes/characterById");
const comicsOfCharRouter = require("./routes/comicsOfChar");
const comicByIdRouter = require("./routes/comicById");
//-------- route pour obtenir la liste de tous les personnages marvel -------//

// app.get("/characters", async (req, res) => {
//   try {
//     const characters = await axios.get(
//       `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${apiKey}`
//     );

//     // console.log(characters.data);

//     res.status(200).json(characters.data);
//   } catch (error) {
//     console.log(error.message);
//   }
// });

app.use(charactersRouter);

// en interrogeant cette route depuis le front (axios.get("http://localhost:3000/characters")) alors le client interrogera mon serveur
// puis mon serveur effectuera a son tour une requete vers l'api de marvel pour obtenir les personnages
// puis il enverra en reponse au front la la data qui contient tous les personnages

//-------------------------------------------------------------------------------------------------------------------------------------------//

//-------- route pour obtenir la liste de tous les comics marvel -------//

// app.get("/comics", async (req, res) => {
//   try {
//     const comics = await axios.get(
//       `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apiKey}`
//     );

//     console.log(comics.data);

//     res.status(200).json(comics.data);
//   } catch (error) {
//     console.log(error);
//   }
// });

app.use(comicsRouter);

// en interrogeant cette route depuis le front (axios.get("http://localhost:3000/comics")) alors le client interrogera mon serveur
// puis mon serveur effectuera a son tour une requete vers l'api de marvel pour obtenir les comics
// puis il enverra en reponse au front la la data qui contient tous les comics

//-------------------------------------------------------------------------------------------------------------------------------------------//

// ----------------------- Pour obtenir un personnage marvel en fonction de son id ---------------- //

// app.get("/character/:characterId", async (req, res) => {
//   try {
//     const characters = await axios.get(
//       `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${apiKey}`
//     );
//     //console.log(characters.data);
//     //console.log(req.params.characterId);
//     const idOfcharacterToFound = req.params.characterId;
//     const character = characters.data.results;

//     let result;

//     for (let i = 0; i < character.length; i++) {
//       if (character[i]._id === idOfcharacterToFound) {
//         result = character[i];
//       }
//     }

//     res.status(200).json(result);
//     console.log(result);
//   } catch (error) {
//     console.log(error);
//   }
// });

app.use(characterByIdRouter);

// en interrogeant cette route depuis le front (axios.get("http://localhost:3000/character/:characterId")) alors le client interrogera mon serveur
// puis mon serveur effectuera a son tour une requete vers l'api de marvel pour obtenir les personnages
// une fois les personnages obtenus on parcours la liste des personnages qui est un tableau dans la clé results
// ensuite si on trouve un id d'un personnage correspondant à l'id transmit en params,
// alors on ajoute les infos du personnage qui possède cet id dans une variable result
// puis on renvoi la variable result en reponse
// puis il enverra en reponse au front la la data qui contient le personnage choisi avec l'id

//-------------------------------------------------------------------------------------------------------------------------------------------//

// ----------------------- Pour obtenir les comics marvel liés à un personnage ---------------- //

// app.get("/comics/:characterId", async (req, res) => {
//   try {
//     const character = req.params.characterId;
//     const comicsofCharacter = await axios.get(
//       `https://lereacteur-marvel-api.herokuapp.com/comics/${character}?apiKey=${apiKey}`
//     );
//     console.log(comicsofCharacter.data);
//     res.status(200).json(comicsofCharacter.data.comics);
//   } catch (error) {
//     console.log(error);
//   }
// });

app.use(comicsOfCharRouter);

// en interrogeant cette route depuis le front (axios.get("http://localhost:3000/comics/:characterId")) alors le client interrogera mon serveur
// puis mon serveur effectuera a son tour une requete vers la route /comics/:characterId de l'api  de marvel pour obtenir les comics d'un personnage
// puis il enverra en reponse au front la la data qui contient tous les comics d'un personnage choisit

//-------------------------------------------------------------------------------------------------------------------------------------------//

// ----------------------- Route pour obtenir un comic en particulier à partir de son id ---------------- //

// app.get("/comic/:comicId", async (req, res) => {
//   const comic = req.params.comicId;
//   try {
//     const comicbyId = await axios.get(
//       `https://lereacteur-marvel-api.herokuapp.com/comic/${comic}?apiKey=${apiKey}`
//     );
//     console.log(comicbyId.data);
//     res.status(200).json(comicbyId.data);
//   } catch (error) {
//     console.log(error);
//   }
// });

app.use(comicByIdRouter);

// en interrogeant cette route depuis le front (axios.get("http://localhost:3000/comic/:comicId")) alors le client interrogera mon serveur
// puis mon serveur effectuera a son tour une requete vers la route /comics/:comicId de l'api  de marvel pour obtenir un comic
// puis il enverra en reponse au front la data qui contient  les infos du comic lié à cet id

//-------------------------------------------------------------------------------------------------------------------------------------------//

app.all("*", (req, res) => {
  res.status(400).json({ message: "route not found" });
});
// PORT (northflank ou local)
const PORT = 3000;
app.listen(process.env.PORT || PORT, () => {
  console.log("server started");
});
