var React = require("react");

class Oneartist extends React.Component {
  render() {
    console.log('creating an artist data li?');
    return (
        <li>
            Artist Id: {this.props.artistsData.id}<br />
            Name: {this.props.artistsData.name}<br />
            Nationality: {this.props.artistsData.nationality}<br />
            Photo: <img src={`${this.props.artistsData.photo_url}`} height="200" width="200" />
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
      <html>
        <head />
        <body>
          <h1>Welcome!</h1>
          <p>Hello world!</p>
          <ul>
            {itemElements}
          </ul>

        </body>
      </html>
    );
  }
}

module.exports = Home;