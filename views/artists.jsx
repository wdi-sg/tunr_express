import React from "react";
import PropTypes from "prop-types";
import Header from "./css.jsx";

class Artists extends React.Component {
  render() {
    let artistsArr = this.props.artists;
    const artistsList = artistsArr.map(artist => {
      return (
          <body>
        <div className="container">
            <a href={"/artists/" + artist.id}>
          {artist.name}
      </a>
          <div className="card">
          <img src={artist.photo_url} className="img-thumbnail"></img>
          </div>
      </div>
      </body>
      );
    });
    return(
        <html>
            <Header />
            <div>
                {artistsList}
            </div>;

        </html>

         )
  }
}

export default Artists;
