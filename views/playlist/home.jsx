var React = require("react");

class New extends React.Component {
  render() {
        // console.log(this.props)

            let songList = this.props.rows.map((song,index)=>{
              return <div>
                        <h3>{index+1}. {song.name}</h3>
                        {/* <p>Nationality: {song.nationality}</p><br/>
                        <img src={song.photo_url} height='300' width='300'/> */}
                    </div>
            })
    return (
      <html>
        <head />
        <body>
          <h3>Playlist</h3>
            <p>{songList}</p>
        </body>
      </html>
    );
  }
}

module.exports = New;
