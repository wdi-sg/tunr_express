var React = require("react");

class Home extends React.Component {
  render() {
    let artists = this.props.artists.map( (artists) => {

        let editLink = "/artists/" + artists.id + "/edit";
        return (
            <div>
                <h3> {artists.id} {artists.name} {artists.nationality} </h3>
            </div>);

    });
    return (

            <div>
              <h1>Welcome!</h1>

              <h2> Artist HomePage</h2>
              <ul>
                {artists}
              </ul>
            </div>

    );
  }
}

module.exports = Home;
