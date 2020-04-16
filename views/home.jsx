var React = require("react");
var Layout = require('./layout');
class Home extends React.Component {
  render() {
    console.log("THIS IS MY HOME PAGE");
    // console.log(this.props);
    var artistArr = this.props.artist;

    var cards = artistArr.map((item)=>{
        return(
        <div class="card" style={{width: "18rem;"}}>
          <img class="card-img-top" src={item.photo_url} alt="Card image cap"/>
          <div class="card-body">
            <h5 class="card-title">{item.name}</h5>
            <p class="card-text">{item.nationality}</p>
            <a href="#" class="btn btn-primary">See Songs</a>
          </div>
        </div>
        )
    });


    return (
        <Layout username={this.props.username}>
          <h1>Welcome!</h1>
          <div class = "container-fluid">
           <div class = "row">
          {cards}
            </div>
          </div>
        </Layout>
    );
  }
}

module.exports = Home;