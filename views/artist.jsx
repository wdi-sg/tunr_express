var React = require('react');
var Default = require('./default')

class Artist extends React.Component {
    render() {
        return (
            <Default>
                <h1>{this.props.artist.name}</h1>
                <p>{this.props.artist.nationality}</p>
                <img src={this.props.artist.photo_url}/>
                <form method='GET' action={'/artists/' + this.props.artist.id + '/edit'}>
                    <input type='submit' value='Edit'/>
                </form>
                <form method="POST" action ={'/artists/' + this.props.artist.id + '/delete?_method=DELETE'}>
                    <input type="submit" value="Delete"/>
                </form>
            </Default>
        );
    }
}

module.exports = Artist;
