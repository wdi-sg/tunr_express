var React = require("react");
var Defaultcss = require('./defaultcss');

class Details extends React.Component{
    render(){
        return(
            <div>
                <ul>{this.props.list.title}</ul>
            </div>
            );
    }
}

class Playlist extends React.Component {
  render() {
    const playlists = this.props.list.map( playlist => {
            return <Details list={playlist}></Details>;
        });
    return (
        <Defaultcss>
            Playlist Title: {this.props.title}
            <br />
            List of Songs in this playlist:-
            {playlists}
        </Defaultcss>
    );
  }
}

module.exports = Playlist;