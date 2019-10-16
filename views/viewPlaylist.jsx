var React = require("react");

class Show extends React.Component {
  render() {
    let element = this.props.key1;
    let id = element.id;
    let name = element.name;
    return (<li>
      {name}
    </li>);
  }
}

class Playlist extends React.Component {
  render() {
    let arr = this.props.arr;
    let artist = arr.map(element => {
      return <Show key1={element}/>
    })
    return (<html>
      <head/>
      <body>
        <p>List of playlist:</p>
        <ul >{artist}</ul>
        <form method="GET" action="/playlist/new">
          <p>
            To add playlist:
            <br/>
            <input type="submit" value="Add"/>
          </p>
        </form>

        <form method="GET" action="/">
          <input type="submit" value="Back"/>
        </form>
      </body>
    </html>);
  }
}

module.exports = Playlist;
