import React from "react";
import PropTypes from "prop-types";
import Css from "./css.jsx";

class Artists extends React.Component {
  render() {
    let artistsArr = this.props.artists;
    const artistsList = artistsArr.map(artist => {
      return (
          <body>
        <div>
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
            <Css />
            <div>
                {artistsList}
            </div>;

        </html>

         )
  }
}

export default Artists;
