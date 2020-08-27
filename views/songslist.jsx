var React = require("react");

class New extends React.Component {
  render() {

            let songList = this.props.rows.map((song,index)=>{
              return <div>
                        <h2>{index+1}. {song.title}</h2><p>Album: {song.album}<br/><br/>Preview:<br/>
                        <audio controls>
                        <source src={song.preview_link} type ="audio/mpeg"/><br/></audio><br/>
                        <img src={song.artwork}/><br/></p>
                    </div>
            })
    return (
      <html>
        <head />
        <body>
          <h3>Songs List</h3>
            <p>{songList}</p>
        </body>
      </html>
    );
  }
}

module.exports = New;
