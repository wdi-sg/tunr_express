var React = require('react');
var Navbar = require('./navbar');

class PlayItems extends React.Component{
    render(){
        return(
            <React.Fragment>
                <li class="list-group-item">
                    Title: {this.props.list.title}
                    <br/>
                    Album: {this.props.list.album}
                    <br/>
                    Preview-Link: {this.props.list.preview_link}
                    <br/>
                </li>
            </React.Fragment>
        );
    }
}
// Artist: {this.props.list.artist_name}
         
class PlayList extends React.Component{
    render(){
        const playlists = this.props.list.map( playSongs => {
            return <PlayItems list={playSongs}></PlayItems>;
        });
        return(
            <Navbar>
                <div>
                    <ul class="list-group">
                      <li class="list-group-item active">{this.props.list[1].playlist}</li>
                      {playlists}
                    </ul>
                </div>
            </Navbar>
            );
    }
}

module.exports = PlayList;