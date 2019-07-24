var React = require("react");
var Default = require("./layout/default");

class Songlist extends React.Component {
  render() {

    let songs = this.props.songs.map(item=>{

        let url = "/artist/"+this.props.id+"/songs/"+item.id;
        return <li><a href={url}>{item.title}</a></li>
    })
        let addSongUrl = "/artist/"+this.props.id+"/songs/new";

    return (
      <Default title={this.props.title}>
      <form  action={addSongUrl}>
                    <input type="submit" value="Add New Song"/>
                </form>
        <ul>
            {songs}
        </ul>
      </Default>
    );
  }
}

module.exports = Songlist;
