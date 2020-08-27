var React = require("react");

export default class Home extends React.Component {
  render() {
        let {artists} = this.props;
        let artistList = artists.map(item=>{
            return <li> <a href={`/artists/${item.id}`}>{item.name}</a> <br />
                        </li>
        })
    return (
      <html>
        <head />
        <body>
          <h1>Welcome to Tunr Express!</h1>
          <h3>Artists Currently on Platform:</h3>
          <ol>{artistList}</ol>
        </body>
      </html>
    );
  }
}

