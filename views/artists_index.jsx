

var React = require('react');

class ArtistsIndex extends React.Component {

    render() {

        console.log ( "Rendering Artists Index: ", this.props.artists );

        const artistsElements = this.props.artists.map( (artist) => {

            let linkPath = `/song/new?artist_id=${artist.id}`;

            return (

                <li>{artist.id}. <a href={`/artists/${artist.id}`}>{artist.name}
                </a> ---------- <a href={linkPath}>(add song)
                </a> ---------- <form method="POST" action={`/artists/${artist.id}?_method=DELETE`} onSubmit={this.handleSubmit} style={{display: 'inline-block'}}>
                    <input type="hidden" name="id" value={artist.id} />
                    <input type="submit" value="Delete" />
                </form>
                </li>
            );
        });


        return (

            <div>

                <h1>All Artists</h1>

                <ul>

                <a href='/artists/new'>( Add new Artist )<br />&zwnj;</a>

                {artistsElements}

                </ul>

            </div>

        );
    };
};


module.exports = ArtistsIndex;