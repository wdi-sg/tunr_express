var React = require('react');

class Add extends React.Component {

  render() {
    let artistId = this.props.artistId;

    return (
    <html>
        <body>
            <div><h1>Add new song</h1></div>
            <form method="POST" action={`/artist/${artistId}/songs`}>
                <div>Title:<input type="text" name="title"/></div>  <br/>
                <div>Album:<input type="text" name="album"/></div>  <br/>
                <div>Preview link:<input type="text" name="preview_link"/></div>  <br/>
                <div>Artwork:<input type="text" name="artwork"/></div>  <br/>
                <div><input type="hidden" name="artist_id" value={artistId}/></div>
                <input type="submit" value="Submit"/>
            </form>
        </body>
    </html>
    );

  }


}

module.exports = Add;