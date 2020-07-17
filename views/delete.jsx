var React = require("react");

class Delete extends React.Component {
  render() {
            var url = '/homepage/'+this.props.result.id+'?_method=DELETE';
            var urlProfile = '/homepage/'+this.props.result.id;
            var urlHome ='/homepage';
            return (
                <html>
                    <head>
                        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
                        <link href="https://fonts.googleapis.com/css?family=Fira+Sans+Extra+Condensed|Permanent+Marker&display=swap" rel="stylesheet"/>
                        <link rel="stylesheet" type="text/css" href="/style4.css"/>
                    </head>
                        <body>
                            <div className="containertop row">
                                <div className="col-4">
                                    <a className="button" href={urlHome}>!!ARTISTS!!</a>
                                </div>
                                <div className="title col-4">
                                    <h1>Delete Entry</h1>
                                </div>
                                <div className="col-4">
                                    <a className="button" href={urlProfile}>!!Profile!!</a>
                                </div>
                            </div>
                            <br />
                            <div className="container">
                                <img src={this.props.result.photo_url}/>
                                <p>Name: {this.props.result.name}</p>
                                <p>Nationality: {this.props.result.nationality}</p>
                                <br />
                                <p>Are you sure you want to delete?</p>
                                <form method="POST" action={url}>
                                    <button type="submit">DELETE</button>
                                </form>
                            </div>
                        </body>
              </html>
            );
          }
        }

module.exports = Delete;