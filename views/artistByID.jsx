var React = require("react");
var DefaultLayout = require('./layouts/default');


class artistByID extends React.Component {

  render() {
    let artist = this.props;
    return (

    <DefaultLayout>
        <body>
            <p className="h5">{artist.name}, {artist.nationality}</p>
            <img src={artist.photo_url}/>
        </body>
    </DefaultLayout>

    )

  }
}

module.exports = artistByID;
