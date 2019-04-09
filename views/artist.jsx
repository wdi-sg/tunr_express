var React = require("react");

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
              <h3>Artist ID: </h3>
              <p>{id}</p>
              <h4>Artist's Name: </h4>
              <p>{name}</p>
              <h4>Photo: </h4>
              <img src = {photo}/>
              <h4>Artist's Nationality: </h4>
              <p>{nationality}</p>
            </div>
          );
      };
  };

module.exports = Artist;
