var React = require("react");
var Layout = require("./layout");
var FavList = require("./fav-list");

class Favourites extends React.Component {
  render() {

    let favList = this.props.favData;
    return (
        <Layout>
          <h1>Welcome!</h1>
          <FavList favList={favList}></FavList>
       </Layout>
    );
  }
}

module.exports = Favourites;