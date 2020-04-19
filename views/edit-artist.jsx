var React = require("react");

class EditArtist extends React.Component {
    render() {
        var artist = this.props.artists;
        if(artist.length==0){
            artist = {
                'id' : "Not found",
                'name' : "Not found",
                'photo_url' : "Not found",
                'nationality' : "Not found",
            } 
          } else{
              artist = artist[0];
          }
        return (
            <html>
                <head>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"></link>
                </head>
                <body>
                    <h3>Edit Artist</h3>
                    <br />
                    <form method="POST" action={`/artists/${artist.artistid}?_method=put`}>
                    Name:&emsp;
                    <input type="text" name="name" defaultValue={artist.name} />
                        <br /><br />

                    Photo_url:&emsp;
                    <input type="text" name="photo_url" defaultValue={artist.photo_url} className="w-50" />
                        <br /><br />

                    Nationality:&emsp;
                    <input type="text" name="nationality" defaultValue={artist.nationality} />
                        <br /><br />
                        <button type="submit"> Submit </button>
                    </form>

                    <form method="POST" action={`/artists/${artist.artistid}?_method=delete`}>
                        <button type="submit"> Delete </button>
                    </form>

                </body>
            </html>
        );
    }
}

module.exports = EditArtist;
