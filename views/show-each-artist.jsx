var React = require("react");

class ShowEachArtist extends React.Component {
  render() {

    const eachArtist = this.props.artist.map ((byArtist,index)=>{
        let link = `/artist/${byArtist.id}/edit`;
        return <div key = {index}>
               <h1 >Artist Name: {byArtist.name}</h1>
               <img src={byArtist.photo_url} alt="artist_photo" height="150" width="200"/>
               <h3>Nationality: {byArtist.nationality}</h3>
               <button><a href= {link}> edit </a></button>
               <button><a href="/artists/"> home </a></button>
               </div>
    })

    return (
      <html>
        <body>
          {eachArtist}
        </body>
      </html>
    );
  }
}

module.exports = ShowEachArtist;