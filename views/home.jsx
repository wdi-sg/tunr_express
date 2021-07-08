var React = require("react");
var Layout = require("./layout");

class Home extends React.Component {
  render() {
    // console.log("Printing out this.props: "+this.props);
    //   console.log("Printing out this.props.artists: "+this.props.artists);

      console.log("Creating a loop now for homeeeeee page of artists");

      let allArtistsStatsArr = this.props.artists.map(thisArtistStats=>{
        let id = parseInt(thisArtistStats.id);
        let name = thisArtistStats.name;
        let photo = thisArtistStats.photo_url;
        let nationality = thisArtistStats.nationality;
          return(
            // <li>{id} {num} {name}</li>
                <div className="card" stylename ={"width: 18rem;"}>
                <img className ="card-img-top" src = {photo} alt= "Artist's image"/>
                  <div className = "card-body">
                  <a href={`/artist/${id}`}>
                    <h4 className = "card-title">{name}</h4>
                    </a>
                  <h5>Nationality: {nationality}</h5>
                  </div>
                </div>
              );
      });
      return (
              <Layout title = "Home">
                <div>
                  {allArtistsStatsArr}
                </div>
              </Layout>
      );
  }
}

module.exports = Home;
