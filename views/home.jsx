var React = require("react");
var Template = require("./layout/template");

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
      <Template title={this.props.title}>
        {artists}
      </Template>
    );
  }
}

module.exports = Home;
