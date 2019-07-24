var React = require("react");

class Individual extends React.Component {
  render() {
            var urlHome ='/homepage';
            var urlEdit ='/homepage/'+this.props.result.id+'/edit';
            var urlDelete ='/homepage/'+this.props.result.id+'/delete';
            var urlSongs = '/homepage/'+this.props.result.id+'/songs'
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
                            <iframe src="https://giphy.com/embed/QrooGoDTEGK52" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
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
                                <div className="col-4">
                                    <a className="button"href={urlEdit}>Edit</a>
                                </div>
                                <div className="col-4">
                                    <a className="button"href={urlSongs}>Songs</a>
                                </div>
                                <div className="col-4">
                                    <a className="button" href={urlDelete}>Delete</a>
                                </div>
                            </div>
                    </div>
                </body>
              </html>
            );
          }
        }

module.exports = Individual;