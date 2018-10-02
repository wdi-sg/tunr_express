import React from "react";
import PropTypes from "prop-types";
import Css from "./css.jsx";

class Artists extends React.Component {
  render() {
    let artistArr = this.props.artist;
    return (
        <div>
            <p>Artist Name : {artistArr[0].name}</p>
            <p>Artist Nationality : {artistArr[0].nationality}</p>
            <p>Artist Image: <img src={artistArr[0].photo_url}></img></p>
        </div>

    )


  }
}

export default Artists;
