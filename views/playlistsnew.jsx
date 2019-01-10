var React = require('react');
var Defaultcss = require('./defaultcss');

class Playlistsnew extends React.Component{
    render(){
        return(
            <Defaultcss>
                <div>
                    <div className="alert alert-danger alert-dismissible fade show text-white" role="alert">
                      <strong>Please Read!</strong><br /> All fields must be filled
                      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <form method="POST" action="/playlists/playlist/add">
                    <h3>Create a new Playlist: </h3><br />
                    Playlist Id:
                    <input type="text" className="form-control form-control-sm" name="id" readOnly placeholder="Auto generated" /><br />
                    Playlist Title:
                    <input type="text" className="form-control form-control-sm" name="title" required="required" minLength="5" pattern="[ a-zA-Z ]*$" placeholder="No special characters and numbers"/><br />
                        <select name="song">
                            <option value="1">Song Title: Zero</option>
                            <option value="2">Song Title: Phenomena</option>
                            <option value="3">Song Title: Runaway</option>
                            <option value="4">Song Title: Heads Will Roll</option>
                            <option value="5">Song Title: Aquarium</option>
                            <option value="6">Song Title: Coat of Arms</option>
                            <option value="7">Song Title: Feelin' the Same Way</option>
                            <option value="">Song Title: Love Me Like I'm Not Made of Stone</option>
                        </select>
                        <br />
                        <br />
                    <input type="submit" value="Create" />
                    </form>
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

module.exports = Playlistsnew;