var React = require("react");

class Individual extends React.Component {
  render() {
            var urlHome ='/homepage';
            var urlEdit ='/homepage/'+this.props.result.id+'/edit';
            var urlDelete ='/homepage/'+this.props.result.id+'/delete';
            return (
              <html>
                <head>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
                    <link href="https://fonts.googleapis.com/css?family=Fira+Sans+Extra+Condensed|Permanent+Marker&display=swap" rel="stylesheet"/>
                    <link rel="stylesheet" type="text/css" href="/style2.css"/>
                </head>
                <body>
                    <div className="containertop row">
                        <div className="col-4">
                            <a href={urlHome}><h1>!!ARTISTS!!</h1></a>
                        </div>
                        <div className="col-4">
                            <iframe src="https://giphy.com/embed/QrooGoDTEGK52" width="480" height="161" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
                        </div>
                        <div className="col-4">
                            <h1>!!Profile!!</h1>
                        </div>
                    </div>
                    <div className="container">
                        <img src={this.props.result.photo_url}/>
                        <div className="containermid">
                            <h4>Artist name: {this.props.result.name}</h4>
                            <br />
                            <h4>Artist nationality: {this.props.result.nationality}</h4>
                        </div>
                        <div className="containerbtm row">
                            <div class="col-6">
                                <a href={urlEdit}><h3>Edit</h3></a>
                            </div>
                            <div className="col-6">
                                <a href={urlDelete}>
                                    <h3>Delete</h3>
                                </a>
                            </div>
                        </div>
                    </div>
                </body>
              </html>
            );
          }
        }

module.exports = Individual;