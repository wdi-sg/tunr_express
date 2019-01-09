var React = require('react');
var Default = require('./default')

class Artist extends React.Component {
    render() {
        return (
            <Default>
                <h1>{this.props.artist.name}</h1>
                <p>{this.props.artist.nationality}</p>
                <img src={this.props.artist.photo_url}/>
            </Default>
        );
    }
}

module.exports = Artist;
