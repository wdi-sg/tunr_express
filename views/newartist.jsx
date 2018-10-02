import React from "react";
import PropTypes from "prop-types";
import Header from "./css.jsx";

class NewArtist extends React.Component {
  render() {
    return (
      <html>
        <form method="POST" action="/artists/">
          <Header />
          <div className="form-group col-md-6 row">
            <label for="listItemEntry">Enter the new Artist Info</label>
          </div>
          <div className="col-md-6 row d-inline-block pt-0 mb-1">
            <div className="col-md-9 d-inline-block">
              <input
                type="text"
                className="form-control"
                id="listItemEntry"
                name="artistName"
                placeholder="Input the Artist Name"
              />
            </div>
            <div className="col-md-9 d-inline-block">
              <input
                type="text"
                className="form-control"
                id="listItemEntry"
                name="artistImageUrl"
                placeholder="Input the Image URL for the Artist"
              />
            </div>
            <div className="col-md-9 d-inline-block">
              <input
                type="text"
                className="form-control"
                id="listItemEntry"
                name="artistNationality"
                placeholder="Input the Artist Nationality"
              />
            </div>
            <div className="col-md-4 d-inline-block float-right">
              <button
                type="submit"
                className="btn btn-primary row"
                name="submit"
              >
                Add
              </button>
            </div>
          </div>
        </form>
      </html>
    );
  }
}

export default NewArtist;
