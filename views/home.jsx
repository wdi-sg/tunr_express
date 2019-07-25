var React = require("react");
const Layout = require('./layout.jsx');

class Oneartist extends React.Component {
  render() {
    console.log('creating an artist data li?');
    return (
        <li>
            Artist Id: {this.props.artistsData.id}<br />
            Name: {this.props.artistsData.name}<br />
            Nationality: {this.props.artistsData.nationality}<br />
            Photo: <a href={`/artists/${this.props.artistsData.id}`}><img src={`${this.props.artistsData.photo_url}`} height="200" width="200" /></a>
        </li>
    );
  }
}

class Home extends React.Component {
    render() {
        console.log("inside List creation?");
        console.log(this.props.artistsData);
            let itemElements = this.props.artistsData.map((artist) => {
                return <Oneartist artistsData={artist}> </Oneartist>
            });

    return (
<Layout>
          <h1>Welcome!</h1>
          <p>Hello world!</p>
          <ul>
            {itemElements}
          </ul>
</Layout>
    );
  }
}

module.exports = Home;