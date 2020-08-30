var React = require("react");

class New extends React.Component {
  render() {

    let {name,photo_url}=this.props.rows[0];
    console.log(photo_url);
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
          <h3>{name}</h3>
          <h4><img src ={photo_url} alt="bitch face" height='200' width ='200'/></h4>
            <p>{songList}</p>
        </body>
      </html>
    );
  }
}

module.exports = New;
