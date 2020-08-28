var React = require("react");

export default class Songshome extends React.Component {
  render() {
        let {songs} = this.props;
        let songList = songs.map(item=>{
            return <li> <a href={`/songs/${item.id}`}>{item.title}</a> <br />
                        </li>
        })
    return (
      <html>
        <head />
        <body>
          <h1>Welcome to Tunr Express!</h1>
          <h3>Songs Currently on Platform:</h3>
          <ol>{songList}</ol>
        </body>
      </html>
    );
  }
}

