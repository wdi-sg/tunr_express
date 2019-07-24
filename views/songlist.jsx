var React = require("react");
var Default = require("./layout/default");

class Songlist extends React.Component {
  render() {

    let songs = this.props.songs.map(item=>{


        return <li>{item.title}</li>
    })


    return (
      <Default title={this.props.title}>
        <ul>
            {songs}
        </ul>
      </Default>
    );
  }
}

module.exports = Songlist;
