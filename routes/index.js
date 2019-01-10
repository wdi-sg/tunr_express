const Artists = require("../controllers/artist");

module.exports = app => {
  app.get("/", (req, res) =>
    res.status(200).send({
      message: "Welcome to the tunr API!"
    })
  );

  app.get("/artists", Artists.listAll);

  // app.post('/recipes', Recipes.createNew);

  // app.get('/recipes/:id/edit', Recipes.getOne);

  // app.put('/recipes/:id', Recipes.updateOne)
  // app.delete('/recipes/:id', Recipes.deleteOne)
};
