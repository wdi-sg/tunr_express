var React = require("react");
var Template = require("./layout/template");

class Songs extends React.Component {
  render() {
    let item = this.props.songs;
    let artistsSongs = this.props.songs.map(item=>{

        let url = item.id+"/songs/";
        return <div className="songs-div">

            <a href={url}><img className="songs-pic" src={item.artwork}/></a>
            <p>title: {item.title}</p>
            <p>album: {item.album}</p>
            <p>preview_link: {item.preview_link}</p>
        </div>
    })


    return (
      <Template title={this.props.title}>
        {artistsSongs}
      </Template>
    );
  }
}

module.exports = Songs;