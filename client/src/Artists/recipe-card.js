import React, { Component } from "react";
import { Link } from "react-router-dom";

class RecipeCard extends Component {
  render() {
    let item = this.props.value;
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <Link
            to={{ pathname: `/recipes/${item.id}`, state: { foo: "bar" } }}
            className="btn btn-primary"
          >
            See full recipe
          </Link>
        </div>
      </div>
    );
  }
}
export default RecipeCard;
