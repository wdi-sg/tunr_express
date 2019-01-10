var React = require('react');
var Default = require('./default')

class Song extends React.Component {
    render() {
        return (
            <Default>
                <h1>{this.props.song.title}</h1>
                <p>{this.props.song.album}</p>
                <a href={this.props.song.preview_link}>Preview</a>
                <a href={this.props.song.artwork}>Artwork</a>
                <p>Artist ID: {this.props.song.artist_id}</p>
                {/* <form method='GET' action={'/songs/' + this.props.song.id + '/edit'}>
                    <input type='submit' value='Edit'/>
                </form>
                <form method="POST" action ={'/songs/' + this.props.song.id + '/delete?_method=DELETE'}>
                    <input type="submit" value="Delete"/>
                </form> */}
            </Default>
        );
    }
}

module.exports = Song;
