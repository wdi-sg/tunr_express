var React = require('react');
var Default = require('./default')

class Artists extends React.Component {
    render() {
        let artists = this.props.artists.map(artist => {
            let artistLink = '/artists/' + artist.id;
            return (
                <div key={artist.id}>
                    <a href={artistLink} >
                        <p>{artist.id}. {artist.name} ({artist.nationality})</p>
                    </a>
                </div>
            )
        })
        return (
            <Default>
                {artists}
            </Default>
        );
    }
}

module.exports = Artists;
