var React = require("react");
var Default = require("./layout/default");

class Home extends React.Component {
  render() {

    let artists = this.props.artists.map(item=>{

        let url = "/artist/"+item.id;
        return <div className="artist-div">

            <a href={url}><img className="artist-pic" src={item.photo_url}/></a>
            <p>Name: {item.name}</p>
            <p>Nationality: {item.nationality}</p>
        </div>
    })


    return (
      <Default title={this.props.title}>
        {artists}
      </Default>
    );
  }
}

module.exports = Home;
