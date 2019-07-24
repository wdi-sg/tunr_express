var React = require("react");
var Default = require("./layout/default");

class Choose_Songs extends React.Component {
  render() {

    let songs = this.props.songs.map(x=>{
        return <span><input type="checkbox" name="song"value={x.id}/>{x.title}<br/></span>
    })
    let url="/playlist/"+this.props.playlistId;
    return (
      <Default title={this.props.title}>
      <h2>Add songs</h2>

        <form method="POST" action={url}>
            {songs}
            <input type="submit" value="Add Songs"/>
        </form>

      </Default>
    );
  }
}

module.exports = Choose_Songs;
