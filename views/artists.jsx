var React = require("react");

class Artists extends React.Component {
  render() {
    console.log("Printing out this.props: "+this.props);
      console.log("Printing out this.props.artists: "+this.props.artists);
      //this.props refers to the pokeList which is an array of pokemons' stats.
      console.log("Creating a loop now");

      let allArtistsStatsArr = this.props.artists.map(thisArtistStats=>{
        let id = parseInt(thisArtistStats.id);
        let name = thisArtistStats.name;
        let photo = thisArtistStats.photo_url;
        let nationality = thisArtistStats.nationality;
          return(
            // <li>{id} {num} {name}</li>
            <div>
              <h5>Artists ID: </h5>
              <p>{id}</p>
              <h4>Artist's Name: </h4>
              <p>{name}</p>
              <h4>Photo: </h4>
              <img src = {photo}/>
              <h4>Artist's Nationality: </h4>
              <p>{nationality}</p>
            </div>
          )
      });
      return (
        <div>
          {allArtistsStatsArr}
        </div>
      )
  }
}

module.exports = Artists;
