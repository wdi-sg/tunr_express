const React = require("react");
const Layout = require("./layout");

class Favorites extends React.Component {
  render() {
    const favorites = this.props.favorites;
    const favoriteElement = favorites.map(favorite => {
      return (
        <h6>
          <a href={favorite.preview_link}>{favorite.title}</a>
        </h6>
      );
    });
    return (
      <Layout username={this.props.username}>
        <div className="container d-flex align-items-center flex-column">
          <h1 className="display-2">Favorites</h1>
          <div>{favoriteElement}</div>
        </div>
      </Layout>
    );
  }
}

module.exports = Favorites;
