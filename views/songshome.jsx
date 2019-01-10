var React = require("react");
var Defaultcss = require('./defaultcss');

class Songlist extends React.Component{
    render(){
        return(
                <div>
                    <div className="card">
                      <div className="card-header">
                        <strong>Artist ID:</strong> {this.props.list.artist_id}
                      </div>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item"><strong>Song Title:</strong> {this.props.list.title}</li>
                        <li className="list-group-item"><strong>Song Album:</strong> {this.props.list.album}</li>
                        <li className="list-group-item"><strong>Song Preview Link:</strong> {this.props.list.preview_link}</li>
                        <li className="list-group-item"><strong>Song Artwork:</strong> {this.props.list.artwork}}</li>
                      </ul>
                    </div>
                </div>
            );
    }
}

class Songhome extends React.Component {
  render() {
    const songs = this.props.list.map( song => {
            return <Songlist list={song}></Songlist>;
        });
    return (
        <Defaultcss>
            {songs}
        </Defaultcss>
    );
  }
}

module.exports = Songhome;