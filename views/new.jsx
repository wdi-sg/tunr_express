var React = require("react");

class NewArtist extends React.Component {
  render() {
        console.log("new.jsxxxxxxxxxxxxx");

        const artistsKeys = ['Name', 'Photo_url', 'Nationality'];
        const formInput = artistsKeys.map((artistsKey) => {
            return <p>{artistsKey}: <input name= {artistsKey.toLowerCase()} /></p>;
        });

    return (
      <html>
        <head />
        <body>
          <h3>Add New Artist</h3>
          <form action="/artists" method="POST">
            {formInput}

            <button type="submit" value="submit">Add</button>
          </form>
        </body>
      </html>
    );
  }
};

module.exports = NewArtist;
