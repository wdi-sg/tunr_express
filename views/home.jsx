var React = require("react");
var DefaultLayout = require('./layouts/default');
class Home extends React.Component {
  render() {
    let artists = this.props.artists;
    const listArtist = artists.map((artist)=>{
        let link  = "/artists/"+artist.id;
       return (<div className="card m-5" style={{width: "20rem"}}>
  <div className="card-body d-flex flex-column justify-content-between">
    <h4 className="card-title"><a href={link}>{artist.name}</a></h4>
  </div></div>);
    })
    return (
        <DefaultLayout>
      <div className="container h-100">
    <div className="row h-100 justify-content-center align-items-center">
        <div className="col-10 col-md-8 col-lg-6 text-center">
        <h1>Artists</h1>
        </div>
        </div>
 <div className="row">
          {listArtist}
                  </div>
        </div>
        </DefaultLayout>
    );
  }
}

module.exports = Home;