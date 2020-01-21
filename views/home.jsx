var React = require("react");

var Layout = require('./layout');

class Home extends React.Component {
  render() {
    let artistsList = this.props.artists.map((artists,index)=>{
        let linkView = "/artists/"+index;
        let linkEdit = "/artists/"+index+"/edit";
        let linkPhoto = artists.photo_url;
        return (
        <div className="col col-lg-3 col-md-6 col-sm-12 mb-4">
            <div className="card" style={{width: "18rem"}}>
                <img src={linkPhoto} className="img-fluid" alt="photo"/>
                <div className="card-body">
                <h5 className="card-title">{artists.name}</h5>
                <p className="card-text">Nationality: {artists.nationality}</p>
                <a href={linkView} className="btn btn-primary">View</a>
                </div>
            </div>
        </div>
        )
    });
    return (
<Layout>
        <h1>Artists</h1>
            <div className="row">
                {artistsList}
            </div>
</Layout>
    );
  }
}

module.exports = Home;