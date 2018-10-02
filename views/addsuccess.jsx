import React from "react";
import PropTypes from "prop-types";
import Header from "./css.jsx";

class AddSuccess extends React.Component {
  render() {
    console.log(this.props.artist);
    return (
      <html>
        <Header />
        <div>
            Congratulations! Your entry for {this.props.artist.artistName} was
            successful.
          <a href="/artists">Go Back To Artists Index Listing</a>
        </div>
      </html>
    );
  }
}

export default AddSuccess;
