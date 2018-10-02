var React = require('react');

class Artists extends React.Component {
  render() {

   // console.log("INSIDE REACT INDEX", this.props.artists );

    const artistsElements = this.props.artists.map((artist)=>{

        let linkPath = "/index";

        return (<li >
                <h6>{artist.id} : {artist.name} :
                <a href={linkPath}>add song for {artist.name}</a></h6>
                <img src={artist.photo_url} />
            </li>);

    });


    return (
      <div>
        <h1>All Owners</h1>
        <ul>
            {artistsElements}
        </ul>
      </div>
    );
  }
}

module.exports = Artists;