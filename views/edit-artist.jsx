var React = require("react");

class EditArtist extends React.Component {
  render() {

        // console.log("new-artists.jsx");
        let artistData = this.props.artist;

        // link to reset Artist
        const artistEditLink = "/artists/" + artistData.id+ "/edit";
        // link to edit query link (PUT) action for submit
        const artistLink = '/artists/'+ artistData.id + "?_method=put";

        //Form Items
        const artistsKeys = ['Name', 'Photo_url', 'Nationality'];
        const artistFormInput = artistsKeys.map((artistsKey) => {
            return <p key={artistsKey}>{artistsKey}: <input name= {artistsKey.toLowerCase()} value={artistData[artistsKey.toLowerCase()]}/></p>;
        });



    return (
      <html>
        <head />
        <body>
            <p><a href={artistEditLink}>Reset</a></p>
            <h3>Add New Artist</h3>
            <form action={artistLink} method="POST">
                {artistFormInput}
                <p><input type="submit" /></p>
            </form>
        </body>
      </html>
    );
  }
};

module.exports = EditArtist;
