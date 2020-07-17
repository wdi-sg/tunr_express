var React = require("react");
var Default = require("./layout/default");

class Favorites_Addsongs extends React.Component {
  render() {

    let songs = this.props.songs.map(x=>{
        return <span><input type="checkbox" name="song"value={x.id}/>{x.title}<br/></span>
    })
    let url="/favorites";
    return (
      <Default title={this.props.title} cookieLogin={this.props.cookieLogin}>
      <h2>Add songs</h2>

        <form method="POST" action={url}>
            {songs}
            <input type="submit" value="Add Songs"/>
        </form>

      </Default>
    );
  }
}

module.exports = Favorites_Addsongs;
