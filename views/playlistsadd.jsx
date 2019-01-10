var React = require('react');
var Defaultcss = require('./defaultcss');

class Playlistsadd extends React.Component{
    render(){
        return(
            <Defaultcss>
                <div className="alert alert-danger alert-dismissible fade show text-white" role="alert">
                  <strong>Congratulations!</strong><br /> You have successfully created a new Playlist {this.props.list[1]}
                  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div>
                    <h3>New Playlist </h3>
                    <br />
                    Playlist Title: {this.props.list[0]}
                    <br />
                    <br />
                    <form method="GET" action="/playlists">
                        <input type="submit" value="Back" />
                    </form>
                </div>
            </Defaultcss>
            );
    }
}

module.exports = Playlistsadd;