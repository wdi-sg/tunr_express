var React = require('react');
var Layout = require("./layout");

class Artistdeleteform extends React.Component {

    render() {

        let artist = this.props.artist[0];
        let deleteAction = `/artists/${artist.id}?_method=delete`;

        return (
            <Layout>
                <h1>Delete Artist</h1>
                    <form method="POST" action={deleteAction}>
                        Artist Name: <br/>
                            <p>{artist.name}</p>
                        Photo: <br/>
                            <img src={artist.photo_url} alt="artist image"/><br/>
                        Nationality: <br/>
                            <p>{artist.nationality}</p>
                        <input type="submit" value="Delete"/>
                    </form>
            </Layout>
        );
    }
}

module.exports = Artistdeleteform;