var React = require('react');
var Layout = require("./layout");

class Artistcreated extends React.Component {

    render() {

        let artist = this.props.artist[0];

        return (
            <Layout>
                <h1>Artist Created:</h1>
                    <div>Artist Name:
                        <p>{artist.name}</p>
                    </div>
                    <div>Photo URL:
                        <div>
                        <img src = {artist.photo_url}/>
                        </div>
                    </div>
                    <div>Nationality:
                        <p>{artist.nationality}</p>
                    </div>
            </Layout>
        );
    }
}

module.exports = Artistcreated;