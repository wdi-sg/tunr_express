var React = require("react");

class ArtistNew extends React.Component {
  render() {

    return (
      <html>
        <head />
        <body>
          <p> Create New Artist </p>
            <form method="post" action="/artist/new">
            <label for="id">Name</label>
            <input type="text" name="name"/>

            <label for="id">Nationality</label>
            <input type="text" name="nationality"/>

            <label for="id">Photo URL</label>
            <input type="text" name="photo_url"/> <br/>

            <input type="submit" value="Submit"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = ArtistNew;



            // <input type="text" name="id" value={json.pokemon.length + 1} readonly="readonly"/>

            // <label for="num">num</label>
            // <input type="text" name="num" value={json.pokemon.length + 1} readonly="readonly"/>

            // <br/> <br/>

            // <label for="name">name</label>
            // <input type="text" name="name"/>

            // <label for="img">img</label>
            // <input type="text" name="img"/>

            // <label for="height">height</label>
            // <input type="text" name="height"/>

            // <label for="weight">weight</label>
            // <input type="text" name="weight"/>