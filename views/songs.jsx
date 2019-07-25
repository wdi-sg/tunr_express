var React = require("react");
const Layout = require('./layout.jsx');

class Onesong extends React.Component {
  render() {
    console.log('creating an artist data li?');
    return (
        <li>
            Title: {this.props.songsData.title}<br />
            Album: {this.props.songsData.album}<br />
            Audio preview: <audio src={`${this.props.songsData.preview_link}`} controls /><br />
            Artwork: <img src={`${this.props.songsData.artwork}`} height="200" width="200" />
        </li>
    );
  }
}

class Songs extends React.Component {
    render() {
        console.log("inside List creation?");
        console.log(this.props.artistName);
            let itemElements = this.props.songs.map((song) => {
                return <Onesong songsData={song}> </Onesong>
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

module.exports = Songs;