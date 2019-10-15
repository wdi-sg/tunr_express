var React = require("react");

class Home extends React.Component {
  render() {
  
    return (
      <html>
        <head>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
            integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
            crossOrigin="anonymous"
          ></link>
        </head>
        <body>

          

          <div className="card text-center">
          <div className="card-body">
          <img src={this.props.result.photo_url} alt="" className="img-thumbnail text-center" width="300" height="300" />
            <h3 className="card-title">{this.props.result.name}</h3>
           
           <div className="text-center well d-flex justify-content-around justify-content-center mt-5 " style={{width: "300px", margin:"0 auto"}}>
           <a className="btn btn-primary btn-lg text-light "
            href={this.props.result.id + "/songs"}>
            Songs
          </a> 
          <a href={this.props.result.id + "/edit"} className="btn btn-info btn-lg ">Edit</a>
           </div>
            
          </div>
        </div>
          
        </body>
      </html>
    );
  }
}

module.exports = Home;
