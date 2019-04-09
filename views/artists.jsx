var React = require("react");
var Layout = require("./layout");

class Artists extends React.Component {
  render() {
    console.log("Printing out this.props: "+this.props);
      console.log("Printing out this.props.artists: "+this.props.artists);

      console.log("Creating a loop now");

      let allArtistsStatsArr = this.props.artists.map(thisArtistStats=>{
        let id = parseInt(thisArtistStats.id);
        let name = thisArtistStats.name;
        let photo = thisArtistStats.photo_url;
        let nationality = thisArtistStats.nationality;
          return(
            // <li>{id} {num} {name}</li>
            <div>
              <h3>Artist ID: </h3>
              <p>{id}</p>
              <h4>Artist's Name: </h4>
                <a href={`/artist/${id}`}>
                  <p>{name}</p>
                </a>
              <h4>Photo: </h4>
              <img src = {photo}/>
              <h4>Artist's Nationality: </h4>
              <p>{nationality}</p>
            </div>
          )
      });
      return (<Layout>
        <div>
          {allArtistsStatsArr}
        </div>
      </Layout>)
  }
}

module.exports = Artists;
