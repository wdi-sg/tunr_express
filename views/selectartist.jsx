var React = require('react');


class SelectArtist extends React.Component {
    render() {
        const artists = this.props.artists.map((artist) => {
            return <li>{artist.name}</li>
        });

        return (
            <ul>
              {artists}
            </ul>
            );

    }
}

module.exports = SelectArtist;