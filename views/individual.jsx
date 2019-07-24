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
                            <a className="button" href={urlHome}><h3>!!ARTISTS!!</h3></a>
                        </div>
                        <div className="col-4">
                            <div className="name">
                                <p>{this.props.result.name}</p>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="profile">
                                <h3>!!Profile!!</h3>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                            <img src={this.props.result.photo_url}/>
                            <div className="containermid">
                                <br />
                                <h4>Artist Nationality: {this.props.result.nationality}</h4>
                                <a className="song"href={urlSongs}>Songs</a>
                            </div>
                            <div className="containerbtm row">
                                <div className="col-4">
                                    <a className="button"href={urlEdit}>Edit</a>
                                </div>
                                <div className="col-4">
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