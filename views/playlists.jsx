var React = require("react");
var Default = require("./layout/default");

class Playlists extends React.Component {
  render() {

    let playlists = this.props.playlists.map(x=>{
        let url = '/playlist/'+x.id;
        return <li><a href={url}>{x.name}</a></li>
    })

    return (
      <Default title={this.props.title} cookieLogin={this.props.cookieLogin}>
      <h2>Playlists</h2>
        <ul>
            {playlists}
        </ul>
        <form action="/playlist/new">
            <input type="submit" value="Add"/>
        </form>
      </Default>
    );
  }
}

module.exports = Playlists;
