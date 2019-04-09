var React = require("react");
var Layout = require("./layout");

class Artist extends React.Component {
  render() {
    console.log("Printing out this.props: "+this.props);
      console.log("Printing out this.props.artist: "+this.props.artist);

        let id = parseInt(this.props.artist[0].id);
        let name = this.props.artist[0].name;
        let photo = this.props.artist[0].photo_url;
        let nationality = this.props.artist[0].nationality;
          return(
            // <li>{id} {num} {name}</li>
            <div>
            <a href='/artists/'>Return to view all artist</a>
              <div className="card" styleName ={"width: 18rem;"}>
              <img className ="card-img-top" src = {photo} alt= "Artist's image"/>
                <div className = "card-body">
                  <a href={`/artist/${id}`}>
                    <h4 className = "card-title">{name}</h4>
                  </a>
              <h5>Nationality: {nationality}</h5>
                </div>
              </div>
            </div>
          );
      };
  };

module.exports = Artist;
