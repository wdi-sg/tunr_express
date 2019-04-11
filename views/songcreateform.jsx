var React = require("react");
var Layout = require("./layout");

class Songcreateform extends React.Component {
    render() {

    let artistIdInput = this.props.artist[0].id

    return (
        <Layout>
            <h3>Add new song for {this.props.artist[0].name}:</h3>
                <form method="POST" action={`/artists/${artistIdInput}/songs`}>
                    Song Title: <br/>
                        <textarea name="title" cols="40" rows="10" value="e.g. Half Moon"></textarea><br/>
                    Album Name: <br/>
                    <textarea name="album" cols="40" rows="10" value="e.g. We Are The Tide"></textarea><br/>
                    Song Preview URL: <br/>
                    <textarea name="preview_link" cols="40" rows="10" value="e.g. https://open.spotify.com/track/6jAyMqsMuu7NTmefJVE8Pc?si=1P9QnOSzQCu_52qF-8eoeg"></textarea><br/>
                    Artwork URL: <br/>
                    <textarea name="artwork" cols="40" rows="10" value="e.g. blindpilot.jpg"></textarea><br/>
                <input type="submit" value="Add New Song"/>
            </form>
        </Layout>
    );
  }
}

module.exports = Songcreateform;