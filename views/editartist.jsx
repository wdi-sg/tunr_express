import React from "react";
import PropTypes from "prop-types";
import Header from "./css.jsx";

class EditArtist extends React.Component {
  render() {
    let artistArr = this.props.artist;
    const actionUrl = `/artists/${artistArr[0].id}?_method=PUT`
    return (
      <form method="POST" action={actionUrl}>
        <Header />
        <div className="form-group col-md-6 row">
          <label for="listItemEntry">Edit the Artist Info</label>
        </div>
        <div className="col-md-6 row d-inline-block pt-0 mb-1">
          <div className="col-md-9 d-inline-block">
            <input
              type="text"
              className="form-control"
              id="listItemEntry"
              name="artistName"
              value={artistArr[0].name}
              placeholder="Input the Artist Name"
            />
          </div>
          <div className="col-md-9 d-inline-block">
            <input
              type="text"
              className="form-control"
              id="listItemEntry"
              name="artistImageUrl"
              value={artistArr[0].photo_url}
              placeholder="Input the Image URL for the Artist"
            />
          </div>
          <div className="col-md-9 d-inline-block">
            <input
              type="text"
              className="form-control"
              id="listItemEntry"
              name="artistNationality"
              value={artistArr[0].nationality}
              placeholder="Input the Artist Nationality"
            />
          </div>
          <div className="col-md-4 d-inline-block float-right">
            <button type="submit" className="btn btn-primary row" name="submit">
              Add
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default EditArtist;
